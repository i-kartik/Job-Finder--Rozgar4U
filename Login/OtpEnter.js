import React, { Component,useState } from 'react';
import {Text,View,TouchableOpacity,TextInput,Image} from 'react-native'
import * as firebase from 'firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
const OtpEnter = (props) => {

    const [code,setCode]=useState('')
    const verid=props.route.params.vid

    


    const confirmCode = async(value) => {


        const credential = firebase.auth.PhoneAuthProvider.credential(
            verid,
            code
          
        );
        firebase
          .auth()
          .signInWithCredential(credential) 
          .then(async(result) => {
            props.navigation.navigate('Rozgar4U')
            const user=firebase.default.auth().currentUser
            const token=user.uid;
            console.log(token)
           try {

             await AsyncStorage.setItem('token',token)
             
           } catch (error) {
             console.log(error)
             
           }
              })          
      }

    return (<View style={{backgroundColor:'white'}}>
      <Image source={require('../assets/otp.png')} style={{height:320,width:375,marginTop:45}}></Image>
        <View style={{alignContent:'center',alignItems:'center',marginBottom:50}}>
        <Text style={{marginTop:3,fontSize:25,fontWeight:'bold'}}>What's Your Verification Code?</Text>
        
        </View>
        <TextInput
        onChangeText={setCode}
        style={{borderBottomColor:'#8d021f',borderBottomWidth:5,marginHorizontal:10,fontSize:35,fontWeight:'bold'}}
      placeholder="Verification Code"
      keyboardType="phone-pad"
      autoCompleteType="tel"
    />
    <TouchableOpacity onPress={confirmCode} style={{backgroundColor:'#8d021f', marginTop:50,borderRadius:15,height:50,marginHorizontal:10}}>
      <Text style={{textAlign:'center',marginVertical:12,color:'white',fontSize:20}}>Verify Code</Text>
    </TouchableOpacity>
    </View>  );
}
 
export default OtpEnter;