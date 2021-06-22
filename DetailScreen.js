import React, { Component } from 'react';
import { View, Text,BackHandler,Image,StyleSheet,TouchableOpacity,Platform, Linking } from 'react-native'
import * as firebase from 'firebase'
import { useState } from 'react/cjs/react.development';
import openMap from 'react-native-open-maps'

const DetailScreen = (props) => {
    const [data, setData] = useState([])

    const openmap=()=>{
        // // openMap(data.location.coords.latitude,data.location.coords.longitude)
        // openMap({latitude:37.4219895,longitude:-122.0840125})

    //    alert(data.location.coords.latitude)
    Linking.openURL('google.navigation:q='+data.location.coords.latitude+","+data.location.coords.longitude)
// Linking.openURL('maps.google.com/?q='+data.location.coords.latitude+','+data.location.coords.longitude)
        // Linking.openURL(googleMapOpenUrl({latitude:data.location.coords.latitude,longitude:data.location.coords.longitude}))


    }

    const dialcall=()=>{
        let phno=''
        if(Platform.OS=='android'){
            
            phno='tel:'+ data.mobile

        }
        // else{
        //     phno='telprompt:${data.mobile}'
        // }
        Linking.openURL(phno)
    }

    const fetchData = () => {
        firebase.default.firestore().collection('JobPost').doc('data').collection('datap').doc(props.route.params.did).get().then((doc) => {
            setData(doc.data())
        })
    }
    useState(() => {
        fetchData()
    }, [])

    const backhand=()=>{
        props.navigation.navigate('Home')
    }
    BackHandler.addEventListener('hardwareBackPress',function(){
backhand()
    })

    return (
    <View style={{backgroundColor:'white',height:1000}}>
        <Image source={require('./assets/detail.png')} style={{width:380,height:190,marginTop:45,marginHorizontal:10}}></Image>
        {/* <Text>{props.route.params.did}</Text> */}
        <View>
        <Text style={{fontWeight:'bold',fontSize:26,textDecorationLine:'underline',textAlign:'center',marginTop:10,marginBottom:25}}>Details</Text>
        <Text style={styles.textstyle}>Name: {data.name}</Text>
        <Text style={styles.textstyle}>Mobile No.: {data.mobile}</Text>
        <Text style={styles.textstyle}>City: {data.city}</Text>
        <Text style={styles.textstyle}>Age: {data.age}</Text>
        <Text style={styles.textstyle}>Job Preference: {data.type}</Text>
        <Text style={styles.textstyle}>Description: </Text>
        <View style={{borderRadius:1,borderWidth:1,marginHorizontal:10,height:80}}>
            <Text style={styles.textstyle}> {data.description}</Text>
        </View>
        <View style={{flexDirection:'row'}}>
        <TouchableOpacity onPress={()=>dialcall()} style={{backgroundColor:'#8d021f',
        borderRadius:15,
        marginBottom:75,
        height:50,
        marginHorizontal:10,
        marginTop:50,
        width:175
        }}>
        <Text style={{fontWeight:'bold',
        fontSize:20,
        marginHorizontal:10,
        marginTop:6,
        flex:1,
        textAlign:'center',color:'white',}}>Call Now </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>openmap()} style={{backgroundColor:'#8d021f',
        borderRadius:15,
        marginBottom:75,
        height:50,
        marginHorizontal:10,
        marginTop:50,
        width:175
        }}>
        <Text style={{fontWeight:'bold',
        fontSize:17,
        marginHorizontal:10,
        marginTop:6,
        flex:1,
        textAlign:'center',color:'white'}}>Navigate To Location </Text>
    </TouchableOpacity>
    </View>


        </View>
    </View>
    );
}

const styles=StyleSheet.create({
    textstyle:{
        fontSize:20,
        fontWeight:'bold',
        marginBottom:10,
        marginHorizontal:15

    }
})

export default DetailScreen;