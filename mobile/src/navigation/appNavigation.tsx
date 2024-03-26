import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import DetailsScreen from '../screens/DetailsScreen';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import AccountScreen from '../screens/AccountScreen';
import LoginScreen from '../screens/LoginScreen';
import ExploreScreen from '../screens/ExploreScreen';
import PostNFTScreen from '../screens/PostNFTScreen';
import CollectionDetailsScreen from '../screens/CollectionDetailsScreen';
import PostTweetScreen from '../screens/PostTweetScreen';
import { Entypo } from '@expo/vector-icons';
import AvatarScreen from '../screens/AvatarScreen';


export type RootStackParamList = {
  Authenticated: undefined;
  Login: { isLoggedIn: boolean }; 
  Main: undefined;
  Explore: undefined;
  CollectionDetails: undefined;
  Details: {NftId:string};
  Home: undefined;
  Tweet: undefined;
  ExploreMain: undefined;
  Account: undefined;
  Create: undefined;
  Avatar: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator<RootStackParamList>();

const MainNavigation = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarShowLabel: false,
      tabBarStyle: { backgroundColor: 'black' },
      tabBarActiveTintColor: '#FF3EA5',
      tabBarInactiveTintColor: 'gray',
    }}
  >
    <Tab.Screen
      name="Main"
      component={HomeStack}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Explore"
      component={CollectionStack}
      options={{
        headerTitle: 'Explore',
        headerShown: false,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: 'black',
          borderBottomWidth: 0,
        },
        headerTintColor: 'white',
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="travel-explore" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Create"
      component={PostNFTScreen}
      options={{
        headerTitle: 'List your NFT',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: 'black',
          borderBottomWidth: 0,
        },
        headerTintColor: 'white', // Set header text color
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="add-circle" size={size} color={color} />
        ),
      }}
    />
     <Tab.Screen
      name="Avatar"
      component={AvatarScreen}
      options={{
        headerTitle: 'My Account',
        headerShown:false,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: 'black',
          borderBottomWidth: 0,
        },
        headerTintColor: 'white', // Set header text color
        tabBarIcon: ({ color, size }) => (
          <Entypo name="man" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Account"
      component={AccountScreen}
      options={{
        headerTitle: 'My Account',
        headerShown:false,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: 'black',
          borderBottomWidth: 0,
        },
        headerTintColor: 'white', // Set header text color
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="account-balance-wallet" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

const HomeStack = () => (
  <Stack.Navigator>
  <Stack.Screen
    name="Home"
    component={HomeScreen}
    options={{headerShown:false }}
  />
  <Stack.Screen
    name="Details"
    component={DetailsScreen}
    options={{headerTitleAlign:'center' }}
  />
  <Stack.Screen
    name="Tweet"
    component={PostTweetScreen}
    
    options={
      {headerTitleAlign:'center',
    headerShown:false }}
  />
</Stack.Navigator>
);

const CollectionStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="ExploreMain"
      component={ExploreScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="CollectionDetails"
      component={CollectionDetailsScreen}
      options={{
        headerStyle: {
          backgroundColor: 'black',
        },
        headerTintColor: 'white', // Set header text color
      }}
    />
    <Stack.Screen
      name="Details"
      component={DetailsScreen}
      options={{
        headerShown: false,
        headerStyle: {
          backgroundColor: 'black',
        },
        headerTintColor: 'white',
      }}
    />
  </Stack.Navigator>
);

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        initialParams={{ isLoggedIn: true }}
        options={{
          headerShown: false,
          headerTitleAlign: 'center',
        }}
      />
        <Stack.Screen
          name="Authenticated"
          component={MainNavigation}
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: 'black',
             
            },
            headerTintColor: 'white',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
