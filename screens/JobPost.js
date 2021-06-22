import React, { Component,useEffect,useState } from 'react';
import {View,Text,TextInput,Button,BackHandler,Image,StyleSheet,TouchableOpacity} from 'react-native'
import { Picker } from 'react-native-picker-dropdown'
import * as firebase from 'firebase'
import { ScrollView } from 'react-native-gesture-handler';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions'




const JobPost = (props) => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);



    const locationhandler=async ()=>{
        let { status } = await Permissions.askAsync(Permissions.LOCATION)
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            alert('Permission to access location was denied')
            return;
          }
          let location = await Location.getCurrentPositionAsync();
          setLocation(location);
          alert('Your Current Location Has been added!')
    }
    // let text = 'Waiting..';
    // if (errorMsg) {
    //   text = errorMsg;
    // } else if (location) {
    //   text = JSON.stringify(location);
    // }

    const handleBackButton=()=>{
        props.navigation.navigate('Home')
        return true
    }

    useEffect(()=>{
        BackHandler.addEventListener('hardwareBackPress',handleBackButton)
    },[])
    const [name,setName]=useState('')
    const [city,setCity]=useState('')
    const [mobile,setMobile]=useState('')
    const [age,setAge]=useState('')
    const [work,setWork]=useState('')
    const [options,setOptions]=useState('')
    const [desc,setDesc]=useState('')
    const [address,setAddress]=useState('')

    console.log(options)


    const postData=()=>{
        const usid=firebase.default.auth().currentUser.uid
        firebase.default.firestore().collection('JobPost').doc('data').collection('datap').doc(usid).set({
            name:name,
            city:city,
            mobile:mobile,
            age:age,
            description:desc,
            type:options,
            address:address,
            location:location
        }).then(()=>{
            alert("Your Job Requirement Has been Successfully Submitted!")
            props.navigation.navigate('Home')
        })

    }

    return (
    <ScrollView style={{backgroundColor:'white'}}>
        <Image source={require('../assets/form.png')} style={{height:200,marginVertical:45,flex:1,width:375,marginHorizontal:10}}></Image>
    <View style={{backgroundColor:'white'}}>
        
        <Text style={{fontWeight:'bold',fontSize:24,textAlign:'center',textDecorationLine:'underline'}}>Post a Job</Text>

    <Text style={style.textstyle} >Name</Text>
    <TextInput style={style.input} onChangeText={(text)=>setName(text)}></TextInput>
    <Text style={style.textstyle}>City</Text>
    <TextInput style={style.input} onChangeText={(text)=>setCity(text)}></TextInput>
    <Text style={style.textstyle}>Address</Text>
    <TextInput style={style.input} onChangeText={(text)=>setAddress(text)}></TextInput>
    <Text style={style.textstyle}>Mobile No.</Text>
    <TextInput style={style.input} onChangeText={(text)=>setMobile(text)} keyboardType='number-pad'></TextInput>
    <Text style={style.textstyle}>Required Age</Text>
    <TextInput style={style.input} keyboardType='number-pad' onChangeText={(text)=>setAge(text)}></TextInput>
    <Text style={style.textstyle}>Please Select Work Type</Text>
    <Picker  mode='dialog' selectedValue={options} onValueChange={(itemValue)=>{setOptions(itemValue)}} >
    <Picker.Item label='Select---' value='ss' />
        <Picker.Item label='Office boy' value='Office Boy' />
        <Picker.Item label='maid' value='maid' />
        <Picker.Item label='Care Taker' value='Care Taker' />
        <Picker.Item label='Driver' value='Driver' />
        <Picker.Item label='Shop worker' value='Shop Worker' />
        <Picker.Item label='other' value='Other' />
    </Picker>

<Text style={style.textstyle}>Job Description</Text>
    <TextInput style={style.input} onChangeText={(text)=>{setDesc(text)}}></TextInput>
    <TouchableOpacity onPress={()=>locationhandler()}>
    <Text style={{fontSize:20,fontWeight:'bold',textAlign:'center',marginTop:10}}>Click To Add Your Location</Text>
</TouchableOpacity>
    <TouchableOpacity onPress={()=>postData()} style={{backgroundColor:'#8d021f',
        borderRadius:15,
        marginBottom:35,
        height:50,
        marginHorizontal:10,
        marginTop:10,}}>
        <Text style={{fontWeight:'bold',
        fontSize:18,
        marginHorizontal:10,
        marginTop:10,
        textAlign:'center',color:'white',}}>Submit</Text>
    </TouchableOpacity>

    

    
    </View> 
    </ScrollView> );
}

const style=StyleSheet.create({
    textstyle:{
        fontWeight:'bold',
        fontSize:18,
        marginHorizontal:10,
        marginTop:5
    },
    input:{
        borderBottomWidth:1,
        borderBottomColor:'black',
        marginHorizontal:10,
        paddingTop:10,
        fontSize:16
    }
})



export default JobPost;