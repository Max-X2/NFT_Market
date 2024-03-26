// Import necessary modules
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { WalletConnectModal, useWalletConnectModal } from '@walletconnect/modal-react-native';
import { useWallet } from '../context/walletContext';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/appNavigation';
import {theme} from '../themes/colors'
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;
type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  route: LoginScreenRouteProp;
  navigation: LoginScreenNavigationProp;
};

// Define the project ID and provider metadata
const projectId = 'e6c39302f8fe9ec4c9f0746b34721e27';
const providerMetadata = {
  name: 'Socio Market',
  description: 'No Description',
  url: 'https://your-project-website.com/',
  icons: ['https://your-project-logo.com/'],
  redirect: {
    native: 'YOUR_APP_SCHEME://',
    universal: 'YOUR_APP_UNIVERSAL_LINK.com',
  },
};

// Define the LoginScreen component
const LoginScreen: React.FC<Props> = ({ route }) =>{
  const { walletAddress, setWalletAddress } = useWallet();
  const { open, isConnected, address,provider } = useWalletConnectModal();
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { isLoggedIn } = route.params;
  // Function to handle button press
  const handleButtonPress = () => {
    if (isConnected) {
      // If already connected, do nothing
      return;
    }
    open(); // Open the WalletConnect modal
  };

  // useEffect to set wallet address
  useEffect(() => {
    setWalletAddress(address || '');
  }, [address]);

  const handleDisconnect = () => {
    if (isConnected) {
      provider?.disconnect(); 
      setWalletAddress(''); // Reset wallet address
    }
  };

  useEffect(() => {

    if (walletAddress) {
      navigation.dispatch(
        CommonActions.navigate({
          name: 'Home', // Name of the screen to navigate to
        })
      );
    }
  }, [walletAddress]);



  // useEffect(() => {
  //   if (walletAddress) {
  //     handleDisconnect();
  //   }
  // }, [isLoggedIn]);

  if (isConnected) {
    navigation.navigate('Authenticated');
  }

  // Render the component
  return (
    <View style={styles.container}>
      <Text>{walletAddress}</Text>
      <Pressable onPress={handleButtonPress} style={styles.connect}>
        <Image style={styles.icon} source={require('../../assets/icons/MetaMask_Fox.png')} />
        <Text style={styles.connectText}>Connect Wallet</Text>
      </Pressable>
      <WalletConnectModal
        explorerRecommendedWalletIds={[
          'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
          'eip155:80001'
        ]}
        projectId={projectId}
        providerMetadata={providerMetadata}
      />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: 50,
    width: 50,
  },
  connect: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 50,
    marginTop: 20,
    paddingHorizontal:30,
  },
  connectText: {
    fontSize: 20,
    paddingHorizontal: 10,
    color:theme.colors.primary,
    fontWeight:'bold',
  },
});


export default LoginScreen;
