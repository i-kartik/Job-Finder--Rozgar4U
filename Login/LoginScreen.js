import React, { Component, useRef, useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,Button,Image} from 'react-native'
import * as firebase from 'firebase'
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import firebaseConfig from '../firebaseconfig'

const OtpAuth = (props) => {

   const [phoneNumber,setPhoneNumber]=useState('')
   const recaptchaVerifier = useRef(null);

   const sendVerification = async() =>{

    var phn='+91'+phoneNumber
      
       const phoneProvider=new firebase.default.auth.PhoneAuthProvider()
       
       await phoneProvider.verifyPhoneNumber(phn,recaptchaVerifier.current).then((result)=>{console.log(result),props.navigation.navigate('Otp',{vid:result})})  
   };



   


    
    return (<View style={{backgroundColor:'white'}}>
              

      <View style={{alignItems:'center',alignContent:'center', marginBottom:50}}>
        <Image source={require('../assets/login.png')} style={{width:375,height:200,marginTop:45}}></Image>
        
      <Text style={{marginTop:20,fontSize:25,fontWeight:'bold'}}>What's Your Phone Number?</Text>
      </View>
      <View style={{flexDirection:'row',alignItems:'center'}}>
        <Text style={{fontWeight:'bold',fontSize:35,marginHorizontal:10}}>+91</Text>
       
        <TextInput
        style={{borderBottomColor:'#8d021f',borderBottomWidth:5,fontSize:34,fontWeight:'bold',paddingRight:65}}
      placeholder="Phone Number"
      onChangeText={setPhoneNumber}
      keyboardType="phone-pad"
      autoCompleteType="tel"
    />
    </View>
    <TouchableOpacity onPress={sendVerification} style={{backgroundColor:'#8d021f', marginTop:50,borderRadius:15,height:50,marginHorizontal:10}}>
      <Text style={{textAlign:'center',marginVertical:12,color:'white',fontSize:20}}>Send Verification Code</Text>
    </TouchableOpacity>
    <Text style={{color:'grey', marginTop:25,marginHorizontal:8,marginBottom:250}}>By tapping "Send Verification Code" above, we will send a SMS to login.</Text>
    
    <FirebaseRecaptchaVerifierModal
      ref={recaptchaVerifier}
        firebaseConfig={firebase.default.app().options}
    />
    </View>  );
}
 
export default OtpAuth;