import React from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/appNavigation';
import { theme } from '../themes/colors';
import { useState } from 'react';
import  { NFTData } from '../data/TrendingData';

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


type Props = NativeStackScreenProps<RootStackParamList>;
type ScreenNavigationProp = Props['navigation'];

var { width, height } = Dimensions.get('window');
type NFTCardProps = {
  data: NFTData; 
};

const NFTCard: React.FC<NFTCardProps> = ({ data }) => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const [votes, setVotes] = useState(data.voteCount);
  const [like, setLike] = useState(false);
  const [color,setColor]=useState('white')
  const handleUpvote = () => {
    setLike(!like); 
    setVotes(like ? votes - 1 : votes + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Image style={styles.image} source={data.img} />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{data.title}</Text>
          <View style={styles.voteContainer}>
            <TouchableOpacity onPress={handleUpvote}>
              <Feather name="arrow-up" size={20} color="#FF3EA5" />
            </TouchableOpacity>
            <Text style={styles.voteCount}>{votes}</Text>
            <Text style={styles.separator}>|</Text>
            <TouchableOpacity onPress={handleUpvote}>
              <Feather name="arrow-down" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{data.description}</Text>
        </View>
        <View style={styles.footerContainer}>
          <View style={styles.walletInfo}>
            <Image style={styles.walletIcon} source={require('../../assets/icons/MetaMask_Fox.png')} />
            <View>
              <Text style={styles.walletAddress}>{data.walletAddress}</Text>
              <Text style={styles.network}>{data.network}</Text>
            </View>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Floor Price</Text>
            <View style={styles.priceValueContainer}>
              <Text style={styles.priceValue}>{data.price}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 20,
  },
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 15,
    shadowColor: theme.colors.primary,
    backgroundColor: '#0F0F0F',
    width: width * 0.9,
    borderRadius: 20,
  },
  image: {
    width: width * 0.9,
    height: height * 0.25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  infoContainer: {
    width: width * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#0F0F0F',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  voteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  voteCount: {
    fontSize: 15,
    color: 'white',
  },
  separator: {
    fontSize: 20,
    color: 'gray',
  },
  descriptionContainer: {
    width: width * 0.9,
    paddingHorizontal: 15,
    backgroundColor: '#0F0F0F',
  },
  description: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.9,
    paddingHorizontal: 10,
    paddingTop: 5,
    backgroundColor: '#0F0F0F',
    borderRadius: 20,
    padding: 10,
  },
  walletInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20
  },
  walletIcon: {
    width: 40,
    height: 40,
  },
  walletAddress: {
    color: 'white',
  },
  network: {
    fontSize: 10,
    color: 'white',
  },
  priceContainer: {
    alignItems: 'center',
  },
  priceLabel: {
    color: 'white',
  },
  priceValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceValue: {
    color: 'white',
  },
});

export default NFTCard;

