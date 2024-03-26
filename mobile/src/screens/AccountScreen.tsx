import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableWithoutFeedback, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
const { width, height } = Dimensions.get('window');
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import TrendingNFTs from '../components/NFTmine';
import { getBalance } from '../api/get_balance';
import { getAllTransactions } from '../api/get_History';
import { Transaction } from '../constants';
import { WalletConnectModal, useWalletConnectModal } from '@walletconnect/modal-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/appNavigation';
import { theme } from '../themes/colors';
import { useWallet } from '../context/walletContext';
import { Entypo } from '@expo/vector-icons';

// Define the type for screen navigation prop




type Props = NativeStackScreenProps<RootStackParamList>;
type ScreenNavigationProp = Props['navigation'];
const colors = ['#FF5733', '#33FF8D', '#3395FF', '#FF33C9', '#FFFF33']; 

export function IconComponent({ index }: { index: number }) {
  let icon = null;

  switch (index % 5) {
    case 0:
      icon = <Feather name="arrow-up-right" size={24} color="#6420AA" />;
      break;
    case 1:
      icon = <FontAwesome6 name="money-bill-transfer" size={24} color="#EE4266" />;
      break;
    case 2:
      icon = <MaterialIcons name="ac-unit" size={24} color="#15F5BA" />;
      break;
    case 3:
      icon = <MaterialIcons name="ac-unit" size={24} color="#F72798" />;
      break;
    case 4:
      icon = <MaterialCommunityIcons name="call-received" size={24} color="#F86F03" />;
      break;
    case 5:
      icon = <Feather name="arrow-down-left" size={24} color="white" />;
      break;
    default:
      break;
  }

  return icon;
}


export default function AccountScreen() {

  const navigation=useNavigation<ScreenNavigationProp>()
  const {provider,isConnected } = useWalletConnectModal();
  const [balance, setBalance] = useState('');
  const {walletAddress,setWalletAddress}=useWallet()
  const [transaction,setTransactions]=useState<Transaction[]>([]);


  const handleDisconnect = () => {
    console.log("Clicked Here");
   navigation.navigate('Login',{isLoggedIn:false})
  };

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const bal = await getBalance(walletAddress);
        setBalance(bal || '');
        const trans=await getAllTransactions(walletAddress);
      
        setTransactions(trans.result);
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };
    fetchBalance();
  }, []);


  const portfolioBalances = [
    { currency: 'Polygon-Mumbai', balance: balance.slice(0,5), value: 20541.23, change: 0.8 },
    { currency: 'Ethereum', balance: 0.4353, value: 1578.33, change: -4.36 },
    { currency: 'Goerli ETH', balance: 2.5489, value: 9253.44, change: 1.25 },
    { currency: 'Polygon', balance: 5.6721, value: 20541.23, change: 0.8 },
  ];
  


  const TransactionItem = ({ item }: { item: Transaction }) => {
    return (
      <TouchableWithoutFeedback>
        <View> 
          {item.to.length !== 0 && (
            <View style={styles.transactionContainer} key={item.blockNumber}>
              <View>
              <IconComponent index={Math.floor(Math.random() * 5)} />
              </View>
              <View style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                <Text style={styles.Balance}>{item.to.slice(0, 15)}</Text>
                <Text style={styles.TestNet}>{item.methodId}</Text>
              </View>
              <View style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                <Text style={styles.Balance}>{item.value.slice(0, 6)} Matic</Text>
                <Text style={styles.TestNet}>Polygon Testnet</Text>
              </View>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  };
  
  

  return (
    <ScrollView style={{backgroundColor:'black',paddingTop:50}}>
      <View style={{display:'flex',shadowColor:'#fff',flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:20,gap:10,elevation:50}}>
          <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',gap:10,paddingHorizontal:30,paddingVertical:5,borderWidth:1,borderColor:'gray',borderRadius:50,backgroundColor:'black'}}>
            <Image style={{height:30,width:30,}} source={require('../../assets/icons/MetaMask_Fox.png')}/>
            <Text style={{fontSize:12,color:'white'}}>{walletAddress.slice(0,8)}</Text>
            <Entypo name="dot-single" size={30} color="green" />
          </View>
          <View style={{display:'flex',flexDirection:'row',height:42,alignItems:'center',justifyContent:'center',paddingHorizontal:10,paddingVertical:5,borderWidth:1,borderColor:'gray',borderRadius:50,backgroundColor:'black'}}>
            <Text style={{fontSize:15,color:'white'}}>Mumbai</Text>
            <Entypo name="dot-single" size={30} color="green" />
          </View>
          <TouchableOpacity  onPress={handleDisconnect} >
          <AntDesign name="logout" size={24} color="white" />
          </TouchableOpacity>
      </View>
      
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceText}>Total Balance</Text>
        <View style={styles.balanceValueContainer}>
          <View style={{display:'flex',flexDirection:'row',alignItems:'baseline',justifyContent:'center',gap:10}}>
            <Image style={{height:30,width:30}} source={require('../../assets/icons/polygon-matic-icon.webp')} />
            <Text style={styles.balanceValue}>{balance.slice(0,7)}</Text>
          </View>
          <Text style={styles.balanceFraction}>.MATIC</Text>
        </View>
      </View>
     
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
      {portfolioBalances.map((item, index) => (
          <TouchableWithoutFeedback key={index}>
            <View style={[styles.itemContainer, { backgroundColor: colors[index % colors.length] }]}>
              <View style={{ display: 'flex', flexDirection: "row", alignItems: 'flex-start', justifyContent: 'space-between', width: '100%' }}>
                <FontAwesome5 name="ethereum" size={24} color='white' />
                <Text style={{ paddingHorizontal: 8, paddingVertical: 5, backgroundColor: 'white', borderRadius: 20, fontSize: 10 }}>{`${item.change}%`}</Text>
              </View>
              <Text style={{ color: 'white' }}>{item.currency}</Text>
              <View style={{ display: 'flex', gap: 2 }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', gap: 5 }}>
                  <Text style={{ color: 'white', fontSize: 30 }}>{item.balance}</Text>
                  <Text style={{ color: 'white' }}>ETH</Text>
                </View>
                <Text style={{ color: 'white' }}>{`$ ${item.value} USD`}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        ))}
    </ScrollView>
      <TrendingNFTs/>
      <Text style={{marginLeft:10,fontSize:25,padding:20,fontWeight:'bold',color:'white'}}>Recent Transactions</Text>
      <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
    <FlatList
        data={transaction}
        renderItem={({ item }) => <TransactionItem item={item} />} 
        keyExtractor={(item, index) => index.toString()}
      />
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  balanceContainer: {
    height:height*0.20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  balanceText: {
    fontSize: 20,
    color: 'gray',
  },
  balanceValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  balanceValue: {
    fontSize: 40,
    color:'white',
  },
  balanceFraction: {
    fontSize: 20,
    color: 'gray',
  },
  scrollViewContent: {
    paddingHorizontal: 15,
  },
  itemContainer: {
    marginRight: 10,
    borderRadius: 20,
    textAlign:'center',
    width: width * 0.44,
    height: height * 0.25,
    backgroundColor:'#FF3EA5',
    paddingHorizontal:15,
    display:'flex',
    alignItems:'flex-start',
    justifyContent:'space-evenly',
    color:'white',
  },
  image: {
    width: 40,
    height: 40,
    padding:20,
    borderWidth:1,
    backgroundColor:'white',
    borderRadius: 50,

  },
  text: {
    marginLeft: 1,
    textAlign: 'center',
    color: 'gray',
  },
  Balance:{
    color:'white',
    fontSize:15
  },
  TestNet:{
    color:'white',
    fontSize:10
  },
  transactionContainer:{
    margin: 5,
    borderRadius: 20,
    textAlign:'center',
    width: width * 0.90,
    height: height * 0.1,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'black',
    justifyContent:'space-between',
    color:'white',
    paddingHorizontal:20,
    borderWidth:1,
    borderColor:'gray',
    elevation:1,
  },
  container:{

      paddingHorizontal: 16,
      borderRadius: 50,
      paddingVertical: 8,
      backgroundColor: 'black',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
  
});
