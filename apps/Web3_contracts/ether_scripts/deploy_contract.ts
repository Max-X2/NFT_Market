// const { ethers } = require("ethers");
// const fs = require('fs');

// const provider = new ethers.JsonRpcProvider("https://rpc-mumbai.polygon.technology");
// const contractBytecodePath = 'contracts_NFT_MarketPlace_sol_NFTMarketplace.bin';
// const contractBytecode = '0x' + fs.readFileSync(contractBytecodePath).toString();

// // Read contract ABI from file
// const contractABIPath = 'contracts_NFT_MarketPlace_sol_NFTMarketplace.abi';
// const contractABI = JSON.parse(fs.readFileSync(contractABIPath));


// const privateKey = "59c6f9a1536d17005f8450837525b362e9afd96022516f4b89229bd08a3fd2a6";
// const wallet = new ethers.Wallet(privateKey, provider);

// const deployContract = async () => {

//   const factory = new ethers.ContractFactory(contractABI, contractBytecode, wallet);
//   const contract = await factory.deploy(wallet.address);
//   contract.deployed;
//   console.log("Contract deployed to address:", contract.target);
// };

// deployContract().catch(console.error);
