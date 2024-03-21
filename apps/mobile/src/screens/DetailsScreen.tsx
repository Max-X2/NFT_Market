import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/appNavigation';
import { getIndiData,IndiData } from '../data/TrendingData';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import SimilarNFT from '../components/SimilarNFT';
import { ToastAndroid } from 'react-native';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;
type ScreenNavigationProp = Props['navigation'];


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  absolute: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 70,
    zIndex: 6,
  },
  backButton: {
    backgroundColor: '#FF3EA5',
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  heartButton: {
    backgroundColor: 'transparent',
  },
  image: {
    width: width,
    height: height * 0.2, 
  },
  textContainer: {
    paddingHorizontal: 20,
    textAlign:'center',
  },
  nftContainer: {
    marginTop: -height * 0.12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FF3EA5',
  },
  description: {
    color: 'lightgray',
    marginTop: 10,
  },
});

const MovieScreen: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const { NftId } = route.params;
  const [data, setData] = useState<IndiData | undefined>(getIndiData(NftId));
  const [loading,setLoading]=useState(false);


  function showToast() {
    ToastAndroid.show('NFT Listed Successfully!', ToastAndroid.LONG);
  }


  const handleSubmit = () => {
    setLoading(true); 
    setTimeout(() => {
     
      showToast(); 
      setLoading(false); 
    }, 3000);
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }} style={styles.container}>
      <View>
        <View style={styles.absolute}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Entypo name="chevron-left" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.heartButton}>
          <FontAwesome name="heart" size={30} color="#FF3EA5" />
          </TouchableOpacity>
        </View>
        <Image resizeMode="cover" blurRadius={10} style={styles.image} source={{ uri: "https://www.desktophut.com/images/thumb_1671215343_335558.jpg" }} />
        <View style={styles.nftContainer}>
          <Image style={{ height: 160, width: 160, borderRadius: 100, margin: 20 }} source={{ uri: `${data?.image}` }} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{data?.title}</Text>
            <Text style={{ color: 'lightgray', textAlign: 'center' }}>By {data?.owner}</Text>
            <View style={{ flexDirection: 'row', shadowColor: '#fff', elevation: 5, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16,paddingVertical:6, marginVertical: 10, backgroundColor: 'black', borderRadius: 50 ,gap:20}}>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontWeight: 'bold', color: '#FF3EA5' }}>587.4 ETH</Text>
        <Text style={{ color: 'lightgray', marginTop: 5 }}>total volume</Text>
      </View>
      <Text style={{ color: 'gray', fontSize: 40,textAlign:'center' }}>|</Text>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontWeight: 'bold', color: '#FF3EA5' }}>0.022 ETH</Text>
        <Text style={{ color: 'lightgray', marginTop: 5 }}>floor Price</Text>
      </View>
      <Text style={{ color: 'gray', fontSize: 40 }}>|</Text>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontWeight: 'bold', color: '#FF3EA5' }}>0.0134 ETH</Text>
        <Text style={{ color: 'lightgray', marginTop: 5 }}>best offer</Text>
      </View>
    </View>
            <TouchableOpacity onPress={handleSubmit} style={{ marginVertical: 15 ,paddingHorizontal: 10, paddingVertical: 10,alignItems:'center', backgroundColor: '#FF3EA5', borderRadius: 50 }}>
              {!loading?
              <Text style={{ color: 'white',  fontSize: 20}}>Mint NFT</Text>:<ActivityIndicator size={30}  color="white" />}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <SimilarNFT/>
    </ScrollView>
  );
};

export default MovieScreen;
