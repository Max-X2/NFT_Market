const { ethers } = require("ethers");
const fs = require('fs');
// Import the compiled contract artifact (ABI)
const contractABIPath = 'contracts_NFT_MarketPlace_sol_NFTMarketplace.abi';
const contractABI = JSON.parse(fs.readFileSync(contractABIPath));

// Define the Ethereum network provider (e.g., Infura)
const provider = new ethers.JsonRpcProvider("https://rpc-mumbai.polygon.technology");

// Define the Ethereum wallet instance (you need a wallet with sufficient funds to interact with the contract)
const wallet = new ethers.Wallet("59c6f9a1536d17005f8450837525b362e9afd96022516f4b89229bd08a3fd2a6", provider); // Replace "YOUR_PRIVATE_KEY" with your private key

// Define the contract address and ABI from the compiled artifact
const contractAddress = "0xF44a0B2df1a40B0576fCC638BFaEbB6b5Bb74015"; // Replace "YOUR_CONTRACT_ADDRESS" with the deployed contract address
const abi = contractABI;

// Create a contract instance
const contract = new ethers.Contract(contractAddress, abi, wallet);

// Function to mint an NFT
async function mintNFT(tokenId) {
  try {
    // Call the depositNFT function of the contract to mint the NFT
    const tx = await contract.depositNFT(tokenId);
    // Wait for the transaction to be mined
    await tx.wait();
    console.log("NFT minted successfully:", tokenId);
  } catch (error) {
    console.error("Error minting NFT:", error);
  }
}

// Function to list an NFT for sale
async function listNFTForSale(tokenId, price) {
  try {
    // Call the listTokenForSale function of the contract to list the NFT for sale
    const tx = await contract.listTokenForSale(tokenId, price);

    // Wait for the transaction to be mined
    await tx.wait();
    console.log("NFT listed for sale successfully:", tokenId, "Price:", price);
  } catch (error) {
    console.error("Error listing NFT for sale:", error);
  }
}

// Call the mintNFT function to mint an NFT with the specified token ID
mintNFT("YOUR_NFT_TOKEN_ID");

// Call the listNFTForSale function to list an NFT for sale with the specified token ID and price
listNFTForSale("YOUR_NFT_TOKEN_ID", "PRICE_IN_WEI"); // Replace "PRICE_IN_WEI" with the price in Wei
