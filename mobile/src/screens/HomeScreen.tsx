import React from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaView, StyleSheet, Text, View, FlatList, Touchable, TouchableOpacity } from 'react-native'
import HomeHeader from '../components/HomeHeader'
import NFTCard from '../components/NFTCard'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/appNavigation';
import {theme} from '../themes/colors'
import {dummyData} from '../data/TrendingData'

// Define the type for screen navigation prop
type Props = NativeStackScreenProps<RootStackParamList>;
type ScreenNavigationProp = Props['navigation'];

export default function HomeScreen() {
const navigation=useNavigation<ScreenNavigationProp>();
  return (
    <SafeAreaView style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" />
      <View style={{ zIndex: 0 }} >
        <FlatList data={dummyData}  renderItem={({ item }) => <NFTCard data={item} />} showsVerticalScrollIndicator={false} ListHeaderComponent={<HomeHeader />} />
      </View>
      <TouchableOpacity
      onPress={()=>navigation.navigate('Tweet')}
       style={{zIndex:7,position:'absolute',bottom:20,right:18,}}>
            <View style={{padding:20,backgroundColor:'#FF3EA5',borderRadius:50}}>
            <Ionicons name="create-outline" size={24} color="white" />
            </View>
      </TouchableOpacity>
    
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    gap: -50,
  },
  bidContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '70%',
    justifyContent: 'space-between',
    padding: 2,
    borderRadius: 50,
    marginBottom: 15,
    elevation: 10,
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 25,
    paddingHorizontal: 30,
  },
  image: {
    width: 350, // Adjust the width as needed
    height: 350, // Adjust the height as needed
    marginVertical: 10,
    borderRadius: 50,
  },
})
