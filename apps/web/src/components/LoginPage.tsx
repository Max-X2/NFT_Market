import React, { useState } from 'react'
import { useSDK } from '@metamask/sdk-react'

export const MetaConnect: React.FC = () => {
  const [account, setAccount] = useState<string | undefined>()
  const { sdk, connected, chainId } = useSDK()

  const connect = async () => {
    try {
      if (sdk) {
        const accounts = await sdk.connect()
        console.log(accounts)

        if (Array.isArray(accounts) && accounts.length > 0) {
          setAccount(accounts[0])
        } else {
          setAccount(undefined)
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
          className="flex items-center gap-2 bg-[#4acd8d] text-white px-6 py-3 rounded-xl"
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
