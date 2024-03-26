import { View, Text } from 'react-native'
import React from 'react'
import AppNavigation from './src/navigation/appNavigation'
import { WalletProvider } from './src/context/walletContext'
import { usePreventScreenCapture } from 'expo-screen-capture';


export default function App() {
  usePreventScreenCapture();
  return (
    <WalletProvider>
         <AppNavigation/>
    </WalletProvider>

  )
}
