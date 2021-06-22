import React, { Component,useEffect } from 'react';
import {View,Alert,BackHandler} from 'react-native'
import * as firebase from 'firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogOut = (props) => {

    const alerts=()=>{
        Alert.alert(
            'Are you sure want to logout?',
            '',
            [
                {
                    text:'Yes',
                    onPress: ()=>signout()

                },
                {
                    text:'No',
                style:'cancel',
                onPress: ()=>{
                    props.navigation.navigate('Home')
                }           
             }
            ]
        )
    }

    const signout= async( value )=>{
            await AsyncStorage.removeItem('token').then(()=>{
                firebase.default.auth().signOut().then(()=>{
                    props.navigation.navigate('logshow')
                })
            })
            
        

        
    }
    
    useEffect(()=>{

        alerts()
    },[])

    

   

    return (<View>
       
    </View>  );
}
 
export default LogOut;