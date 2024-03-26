import React, { useState } from 'react';
import { View,Text, SafeAreaView, ScrollView, Image, TouchableWithoutFeedback, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/appNavigation';
import { collectionData } from '../data/TrendingData';

// Define the type for screen navigation prop
type Props = NativeStackScreenProps<RootStackParamList,'Details'>;
type ScreenNavigationProp = Props['navigation'];


const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  nftContainer:{
    backgroundColor:'black',
    borderRadius: 20,
    marginBottom: 20,
    shadowColor:'#fff',
    elevation:5,
    display:'flex',
    gap:10
  },
  nftImage: {
    width: width * 0.44,
    height: height * 0.25,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
  },
});

const CollectionDetailsScreen = () => {
  const imagePaths=[   
    "https://img.freepik.com/free-photo/fashion-boy-with-yellow-jacket-blue-pants_71767-96.jpg?w=1060&t=st=1710778953~exp=1710779553~hmac=e729d72cd8605766d8a6ed7c7373cc4bc8580ec465a4cdc06dd34a75d73623a2",
  ]
  const navigation = useNavigation<ScreenNavigationProp>();
  const [query, setQuery] = useState<string>('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {collectionData.map((nft, index) => (
            <TouchableWithoutFeedback key={index} onPress={() => navigation.navigate('Details',{NftId:nft.id})}>
              <View style={styles.nftContainer} >
                <Image style={styles.nftImage} source={{ uri: nft.imageUri }} />
                <View  style={{paddingBottom:10,paddingHorizontal:10}} >
                  <Text style={{color:'white',fontSize:18,textAlign:'center'}}>{nft.title}414</Text>
                  <Text style={{color:'white',textAlign:'center'}}>{nft.price}</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CollectionDetailsScreen;
