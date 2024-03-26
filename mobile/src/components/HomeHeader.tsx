import React from 'react';
import { View, Text, Image, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/appNavigation';
import { theme } from '../themes/colors';
import { useWallet } from '../context/walletContext';

// Define the type for screen navigation prop
type Props = NativeStackScreenProps<RootStackParamList>;
type ScreenNavigationProp = Props['navigation'];

const HomeHeader = () => {
  const { walletAddress } = useWallet();
  const navigation = useNavigation<ScreenNavigationProp>();

  const handleClick = () => {
    console.log("Moving to Account");
    navigation.navigate('Account');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/icons/polygon.webp')} resizeMode="cover" style={styles.logo} />
        <Text style={styles.title}>Home</Text>
        <TouchableOpacity onPress={handleClick} style={styles.profileButton}>
          <Image source={require('../../assets/persons/person03.png')} resizeMode="contain" style={styles.profileImage} />
        </TouchableOpacity>
      </View>
      <View style={styles.separator}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  title: {
    fontSize: 20,
    color: 'white',
  },
  profileButton: {
    padding: 10,
  },
  profileImage: {
    width: 60,
    height: 60,
  },
  badgeImage: {
    position: 'absolute',
    width: 30,
    height: 30,
    top: 40,
    bottom: 0,
    right: 25,
  },
  separator: {
    marginVertical: 10,
    width: '100%',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
});

export default HomeHeader;
