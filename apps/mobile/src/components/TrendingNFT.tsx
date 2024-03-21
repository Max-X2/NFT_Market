import React from 'react';
import { View, Text, TouchableWithoutFeedback, Dimensions, Image, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/appNavigation';
import {dummyData} from '../data/TrendingData';
import { NFTData } from '../data/TrendingData';

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
};

const TrendingNFT: React.FC = ({}) => {
  const navigation = useNavigation<ScreenNavigationProp>();

  const NFTCard = ({ data }: { data: NFTData }) => {
    

    const handleCardPress = () => {
      // Handle card press if needed
    };

    return (
      <TouchableWithoutFeedback onPress={handleCardPress}>
        <View style={styles.cardContainer}>
          <Image resizeMode="cover" style={styles.image} source={data.img} />
          <View style={styles.infoContainer}>
            <Text style={styles.text}>{data.price}</Text>
       
            <Image style={styles.icon} source={require('../../assets/icons/polygon-matic-icon.webp')} />
          </View>
          <View style={styles.bottomContainer}>
            <View>
              <Text style={styles.text}>{data.title}</Text>
              <Text style={styles.text}>By Peace-land Officer</Text>
            </View>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('CollectionDetails')}>
              <View style={styles.buttonContainer}>
                <Text style={styles.buttonText}>View Collections</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Discover NFT Collections</Text>
      <Carousel
        data={dummyData}
        inactiveSlideOpacity={0.6}
        renderItem={({ item }) => <NFTCard data={item} />}
        firstItem={3}
        sliderWidth={width}
        itemWidth={width * 0.78}
        slideStyle={{ display: 'flex', alignItems: 'center' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  title: {
    marginVertical: 20,
    fontSize: 25,
    color: 'white',
    paddingHorizontal: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardContainer: {
    borderRadius: 30,
  },
  image: {
    width: 330,
    height: height * 0.4,
    borderRadius: 30,
  },
  infoContainer: {
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 5,
    top: 25,
    left: 25,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 270,
  },
  text: {
    color: 'white',
  },
  icon: {
    height: 40,
    width: 40,
  },
  bottomContainer: {
    elevation: 1,
    borderRadius: 20,
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'black',
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 5,
    bottom: 25,
    alignItems: 'center',
    justifyContent: 'center',
    left:6,
    width: 320,
    },
    buttonContainer: {
      backgroundColor: '#FF3EA5',
      paddingHorizontal: 14,
      paddingVertical: 7,
      borderRadius: 10,
    },
    buttonText: {
      color: 'white',
      fontSize: 15,
    },
});


export default TrendingNFT;
