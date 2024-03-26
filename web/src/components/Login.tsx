import { useSDK } from '@metamask/sdk-react'
import React, { useState } from 'react'

export const MetaConnect: React.FC = () => {
  'use client'
  const [account, setAccount] = useState<string | undefined>()
  const { sdk, connected, chainId } = useSDK()

  const connect = async () => {
    console.log('connecting...')
    try {
      if (sdk) {
        const accounts = await sdk.connect()
        console.log(accounts)

        if (Array.isArray(accounts) && accounts.length > 0) {
          setAccount(accounts[0])
          localStorage.setItem('user', accounts[0])
          window.location.href = '/home'
        } else {
          setAccount(undefined)
          window.location.href = '/login'
        }
      }
    } catch (err) {
      console.warn('failed to connect..', err)
    }
  }

  return (
    <div className="App">
      {!connected ? (
        <button
          className="flex items-center gap-2 bg-[#5b205f] text-white px-6 py-3 rounded-xl"
          onClick={connect}
        >
          <img
            src={'/metamask-icon.webp'}
            alt="user"
            className="w-[20px] object-contain"
          />
          Connect Wallet
        </button>
      ) : (
        <div className="text-white">
          <p>Connected chain: {chainId}</p>
          {account && <p>Connected account: {account}</p>}
        </div>
      )}
    </div>
  )
}
