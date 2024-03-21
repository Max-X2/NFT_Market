import React from 'react';
import { View, Text, TouchableWithoutFeedback, Dimensions, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';
const { width, height } = Dimensions.get('window');
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/appNavigation';

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



const TrendingNFTs: React.FC = ({  }) => {
 

  const NFTCard = ({ data }: { data: number }) => {
    const imageSource = imagePaths[data]
    return (
      <TouchableWithoutFeedback >
        <View style={{ borderRadius: 30 }}>
          <Image resizeMode="cover" style={{ width: 200, height: height * 0.25, borderRadius: 30 }}  source={imageSource} />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={{ marginBottom: 8 }}>
      <Text style={{ margin: 5,  fontSize: 25, color: 'white',paddingHorizontal:30,paddingVertical:30 ,fontWeight:'bold'}}>My NFTs</Text>
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
};

export default TrendingNFTs;
