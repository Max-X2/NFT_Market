
import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider(`https://rpc-mumbai.polygon.technology`);
;

export const getBalance = async (address: string) => {
  try {
    const balance = await provider.getBalance(address);
    const formattedBalance = ethers.formatEther(balance);
    return formattedBalance
  } catch (error) {
    console.error('Error fetching balance:', error);
  }
};


