import { View, Text ,ScrollView} from 'react-native'
import React from 'react'
import TrendingNFT from '../components/TrendingNFT'
import AllCollections from '../components/AllCollections'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'


export default function ExploreScreen() {
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'black'}}>
      <StatusBar/>
       <ScrollView contentContainerStyle={{ paddingTop: 60 }} >
     <TrendingNFT/>
     <AllCollections/>
    </ScrollView>
    </SafeAreaView>
   
  )
}
