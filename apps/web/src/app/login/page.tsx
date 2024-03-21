import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MetaMaskProvider, useSDK } from '@metamask/sdk-react'
import { MetaConnect } from '@/components/Login'

const LoginPage = () => {
  const { sdk, connected, connecting, account } = useSDK()
  const connect = async () => {
    try {
      await sdk?.connect()
    } catch (err) {
      console.warn(`No accounts found`, err)
    }
  }
  return (
    <div className="h-screen w-full flex items-center justify-center flex-col">
      <div className="logo flex items-center justify-center ">
        <Avatar style={{ height: '75px', width: '75px', marginRight: '15px' }}>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="logo-heading">
          <h1 className="text-[75px] text-[whitesmoke]">SocioMarket</h1>
        </div>
      </div>
      <div className="connect">
        <MetaMaskProvider
          debug={false}
          sdkOptions={{
            dappMetadata: {
              name: 'SocioMarket',
              url: window.location.href,
            },
            // Other options
          }}
        >
          <MetaConnect />
        </MetaMaskProvider>
      </div>
    </div>
  )
}

export default LoginPage
