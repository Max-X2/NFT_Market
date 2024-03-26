// const { ethers } = require("ethers");
// const fs = require('fs');
// const provider = new ethers.JsonRpcProvider("https://rpc-mumbai.polygon.technology");

// const contractABIPath = 'contracts_authentication_sol_authentication.abi';
// const contractABI = JSON.parse(fs.readFileSync(contractABIPath));
// const contractAddress = "0x1b1E48e776Dbe35b706244Ba7bC9398670334009";

// const privateKey = "59c6f9a1536d17005f8450837525b362e9afd96022516f4b89229bd08a3fd2a6";
// const wallet = new ethers.Wallet(privateKey, provider);
// const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// async function testFunction() {
//   try {
//     const userAddress = "0x72857e5a7c0096f0729041d6DDAc288813e8Dc9c";
//     const tx = await contract.loginUser(userAddress, 'lokesh');
//     await tx.wait();
//     checkUserLogin(userAddress)
//     console.log("Function result:", tx);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }


// async function checkUserLogin(walletAddress) {
//   try {
//     const result = await contract.checkUserLogin(walletAddress);
//     const [loginStatus, ipfsImageHash] = result;
//     console.log("Login Status:", loginStatus);
//     console.log("IPFS Image Hash:", ipfsImageHash);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

// testFunction();
