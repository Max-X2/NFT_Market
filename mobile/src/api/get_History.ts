import { ethers } from 'ethers';
import { POLYGON_SCAN_KEY } from './constants';
import { Transaction } from '../constants';




export async function getAllTransactions(address: string) {
  try {
    const PROVIER_URL = `https://api-testnet.polygonscan.com/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${POLYGON_SCAN_KEY}`;
    const response = await fetch(PROVIER_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
  }
}
