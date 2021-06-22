import { StatusBar } from 'expo-status-bar';
import React ,{useEffect,useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebaseConfig from './firebaseconfig'
import * as firebase from 'firebase'
import LoginScreen from './Login/LoginScreen'
import OtpEnter from './Login/OtpEnter'
import HomeScreen from './Home/HomeScreen'
import JobPost from './screens/JobPost'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createDrawerNavigator} from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native';
import MainTabScreen from './MainTabScreen';
import { createStackNavigator } from '@react-navigation/stack';
import DetailScreen from './DetailScreen'
import AsyncStorage from '@react-native-async-storage/async-storage';
import LogOut from './screens/LogOut'
import LogShow from './screens/LogShow'
import PostedJobs from './screens/PostedJobs'


if(!firebase.default.apps.length){
  firebase.default.initializeApp(firebaseConfig)
}

const Drawer=createDrawerNavigator()
const Stack=createStackNavigator()

const App = (props) => {
  const [isloggedin,setIsLoggedIn]=useState(null)


  const getToken=async()=>{
  

    const token =await AsyncStorage.getItem('token') 
    if(token){
      
      setIsLoggedIn(true)

    }else{
      setIsLoggedIn(false)
    }

  }
  useEffect(()=>{
    getToken()
  },[])

  return ( 
    <NavigationContainer>
      <Stack.Navigator headerMode='none'>
        
        {
          isloggedin ?( <> 
          <Stack.Screen name='Rozgar4U' component={MainTabScreen} options={{
          headerShown:false,  
        }}></Stack.Screen>
        <Stack.Screen name='Detail' component={DetailScreen}></Stack.Screen>
        {/* <Stack.Screen name='Login' component={LoginScreen}></Stack.Screen> */}
        <Stack.Screen name='Pjobs' component={PostedJobs}></Stack.Screen>
        <Stack.Screen name='Otp' component={OtpEnter}></Stack.Screen>

        

           </>
           )
           : (
            <>
            
            
            <Stack.Screen name='Login' component={LoginScreen}></Stack.Screen>
            <Stack.Screen name='Otp' component={OtpEnter}></Stack.Screen>
            <Stack.Screen name='Rozgar4U' component={MainTabScreen} options={{
          headerShown:false,  
        }}></Stack.Screen>

            </>
          )
        }

        <Stack.Screen name='logshow' component={LogShow}></Stack.Screen>

      </Stack.Navigator>
      
    </NavigationContainer>

   );
}
 
export default App;





