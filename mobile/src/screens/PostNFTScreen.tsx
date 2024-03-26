import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';
import { ToastAndroid } from 'react-native';


const { width, height } = Dimensions.get('window');
import {ActivityIndicator, StyleSheet} from 'react-native';

export default function PostTweetScreen() {
  const navigation = useNavigation();
  const [tweet, setTweet] = useState('');
  const [loading,setLoading]=useState(false);
  const [image, setImage] = useState<string | null>(null);

  function showToast() {
    ToastAndroid.show('NFT Listed Successfully!', ToastAndroid.LONG);
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    setLoading(true); 
    setTimeout(() => {
     
      showToast(); 
      console.log('Tweet:', tweet, 'Image:', image);
      setTweet('');
      setImage('');
      setLoading(false); 
    }, 2000);
  };

  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: 'black', paddingHorizontal: 20, alignItems: 'center' }}>
      <View style={{ backgroundColor: 'black', borderRadius: 5, marginBottom: 20, borderWidth: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20, width: '100%' }}>
        <Image style={{ height: 50, width: 50 }} source={require('../../assets/persons/person01.png')} />
        <TextInput
          style={{ backgroundColor: 'black', fontSize: 20, paddingHorizontal: 40, paddingVertical: 20, borderRadius: 5, marginVertical: 5, color: '#FF3EA5' }}
          placeholder='Tweet Something'
          multiline
          placeholderTextColor='gray'
          onChangeText={text => setTweet(text)}
          value={tweet}
        />
        <TouchableOpacity
          style={{
            backgroundColor: '#FF3EA5',
            padding: 10,
            borderRadius: 50,
            marginBottom: 10,
          }}
          onPress={pickImage}>
          <Feather name="image" size={25} color="white" />
        </TouchableOpacity>
      </View>
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: '100%', height: 200, resizeMode: 'cover', marginBottom: 20 }}
        />
      )}
       <TouchableOpacity onPress={handleSubmit} style={{width: 200, paddingVertical: 15, borderRadius: 40,backgroundColor: '#FF3EA5',alignItems:'center'}}>

       {!loading ? <Text style={{fontSize:22,color:'white' }}>Submit</Text>: <ActivityIndicator size={30}  color="white" />}
      </TouchableOpacity>
      
    </SafeAreaView>
  );
}
