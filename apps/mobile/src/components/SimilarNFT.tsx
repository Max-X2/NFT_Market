import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableWithoutFeedback, Dimensions, Image,StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/appNavigation';

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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  nftContainer:{
    backgroundColor:'black',
    borderRadius: 20,
    marginBottom: 20,
   borderColor:'gray',
   borderWidth:1,
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

export default function SimilarNFT() {
  const navigation = useNavigation<ScreenNavigationProp>()
  const NFTCard = ({ data }: { data: number }) => {
    const imageSource = imagePaths[data]
    return (
      <TouchableWithoutFeedback >
        <TouchableWithoutFeedback>
              <View style={styles.nftContainer} >
                <Image style={styles.nftImage} source={imagePaths[(data+1)]} />
                <View  style={{paddingBottom:10,paddingHorizontal:10}} >
                  <Text style={{color:'white',fontSize:18,textAlign:'center'}}>PEC Friends #2414</Text>
                  <Text style={{color:'white',textAlign:'center'}}>0.095 MATIC</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={{ marginBottom: 8 }}>
      <Text style={{ margin: 5,  fontSize: 25, color: 'white',paddingHorizontal:20,paddingVertical:30 ,fontWeight:'bold'}}>Similar NFTs</Text>
      <Carousel
        data={[1,2,3,4,5,6,7,8]}
        inactiveSlideOpacity={0.6}
        renderItem={({ item }) => <NFTCard data={item}/>}
        firstItem={3}
        sliderWidth={width}
        itemWidth={width * 0.5}
        slideStyle={{ display: 'flex', alignItems: 'center' }}
      />
    </View>
  );
}
