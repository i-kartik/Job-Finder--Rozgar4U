import { NavigationContainer } from '@react-navigation/native';
import React, { Component } from 'react';
import HomeScreen from './Home/HomeScreen'
import JobPost from './screens/JobPost'
import { createStackNavigator} from '@react-navigation/stack'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DetailScreen from './DetailScreen'
import Profile from './screens/Profile'
import LogOut from './screens/LogOut'
const HomeStack = createStackNavigator()


const Tab=createMaterialBottomTabNavigator()

const MainTabScreen = (props) => {
    return ( 
        <Tab.Navigator
      initialRouteName="H"
      activeColor="#fff"
      barStyle={{ backgroundColor: '#8d021f' }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="JobPost"
        component={JobPost}
        options={{
          tabBarLabel: 'Post a Job',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="send-circle-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen name='LogOut' component={LogOut} options={{
        tabBarLabel: 'LogOut',
        tabBarIcon: ({color})=>(
          <MaterialCommunityIcons name='logout' color={color} size={26}>

          </MaterialCommunityIcons>
        )
      }}></Tab.Screen>
      <Tab.Screen name='Profile' component={Profile} options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({color})=>(
          <MaterialCommunityIcons name='account' color={color} size={26}>

          </MaterialCommunityIcons>
        )
      }}></Tab.Screen>
      
    </Tab.Navigator>
        
        
        
     );
}

// const HomeStackScreen=({navigation})=>(
//     <HomeStack.Navigator  Options={{
//         headerStyle:{
//             backgroundColor:'#009387',
    
//         },
//         headerTintColor:'#fff',
//         headerTitleStyle:{
//             fontWeight:'bold'
//         },
//     }}>
//         <HomeStack.Screen name='Home' component={HomeScreen} options={{
//             title:'Home'
//         }}></HomeStack.Screen>

//     </HomeStack.Navigator>
// )

    

 
export default MainTabScreen;
