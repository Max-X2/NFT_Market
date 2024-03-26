import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';


var {width,height}=Dimensions.get('window')
export default function PostTweetScreen() {
  const navigation=useNavigation();
  const [tweet, setTweet] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black', paddingHorizontal: 20,paddingTop:80 }}>
      <View style={{position:'absolute',zIndex:10,top:32,left:10,display:'flex',alignItems:'center',flexDirection:'row',justifyContent:'space-between',width:width*0.9}}>
      <TouchableOpacity
        style={{
          backgroundColor: '#FF3EA5',
          padding: 10,
          borderRadius: 50,
          marginTop: 20,
        }}
        onPress={()=>navigation.goBack()}
        >
          
       <Ionicons name="chevron-back" size={20} color="white" />
          </TouchableOpacity>  
      <TouchableOpacity
        style={{
          backgroundColor: '#FF3EA5',
          padding: 10,
          borderRadius: 50,
          marginTop: 20,
        }}
        onPress={() => console.log('Tweet:', tweet, 'Image:', image)}>
        <Text style={{fontSize:15,paddingHorizontal:15,paddingVertical:2,color:'white',fontWeight:'600'}} >Post</Text>
      </TouchableOpacity>
      </View>
     
      <View style={{ backgroundColor: 'black', borderRadius: 5,marginBottom:20,borderWidth:1,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',gap:20,width:'100%'}}>
      <Image  style={{height:50,width:50}} source={require('../../assets/persons/person01.png')}/>
        <TextInput
          style={{ backgroundColor: 'black',fontSize:20,paddingHorizontal:40,paddingVertical:20, borderRadius: 5, marginVertical: 5 ,color:'#FF3EA5'}}
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
     
    
    </SafeAreaView>
  );
}
