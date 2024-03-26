import { View, Text, ScrollView, TouchableWithoutFeedback, StyleSheet, Dimensions, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/appNavigation';
import { CollectinsData } from '../data/TrendingData';

const { width, height } = Dimensions.get('window');

// Define the type for screen navigation prop
type Props = NativeStackScreenProps<RootStackParamList>;
type ScreenNavigationProp = Props['navigation'];


type ImagePaths = {
  [key: number]: any;
}

const imagePaths: ImagePaths = {
  1: require('../../assets/nft_images/01_nft.png'),
  2: require('../../assets/nft_images/02_nft.png'),
  3: require('../../assets/nft_images/03_nft.png'),
  4: require('../../assets/nft_images/04_nft.png'),
  5: require('../../assets/nft_images/05_nft.png'),
  6: require('../../assets/nft_images/06_nft.png'),
  7: require('../../assets/nft_images/07_nft.png'),
  8: require('../../assets/nft_images/08_nft.png'),
  9: require('../../assets/nft_images/09_nft.png'),
  10: require('../../assets/nft_images/10_nft.png'),
};


const ImageComponent = ({ id }: { id: number }) => {
  const imageSource = imagePaths[id];
  return (
    <Image resizeMode="cover" style={{ width: 80, height: 80,borderRadius:30 }} source={imageSource} />
  );
};




export default function AllCollections() {
  const navigation=useNavigation<ScreenNavigationProp>();
  return (
    <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
      <Text style={{ color: 'white', fontSize: 25, paddingHorizontal: 20, paddingVertical: 20}}>Top Collections</Text>
      {CollectinsData.map((item, index) => (
        <View key={index} style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',gap:20}}>
             <Text style={{color:'white',fontSize:18}}>{index+1} </Text>
        <TouchableWithoutFeedback key={index} style={{paddingHorizontal:20}} onPress={()=>navigation.navigate('CollectionDetails')}>
          <View style={styles.transactionContainer}>
            <View>
              <Image resizeMode="cover" style={{ width: 80, height: 80,borderRadius:30 }} source={{uri:`${item.imageUri}`}} />
            </View> 
            <View style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
              <Text style={styles.Balance}>{item.name}</Text>
              <Text style={styles.TestNet}>Purchased on {item.platform}</Text>
            </View>
          
          </View>
        </TouchableWithoutFeedback>
        </View>
     
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingHorizontal: 15,
    alignItems:'center',
    justifyContent:'center',
  },
  Balance: {
    color: 'white',
    fontSize: 20
  },
  TestNet: {
    color: 'white',
    fontSize: 10
  },
  transactionContainer: {
    marginVertical: 10,
    borderRadius: 30,
    textAlign: 'center',
    width: width * 0.80,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    justifyContent: 'flex-start',
    padding:10,
    gap:30,
    color: 'white',
    elevation: 6,
    shadowColor:'white',
  },
});
