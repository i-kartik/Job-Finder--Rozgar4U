import React, { Component,useState,useRef } from 'react';
import { useEffect } from 'react';
import {Text,View,BackHandler,FlatList,TouchableOpacity,TextInput,StyleSheet,ImageBackground,Image} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import * as firebase from 'firebase'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions'

const HomeScreen = (props) => {




    const [header,setHeader]=useState([])
    const [searchdata,setSearchData]=useState([])
    const [refreshing,setRefreshing]=useState(false)
    const docs=()=>{
        firebase.default.firestore().collection('JobPost').doc('data').collection('datap').onSnapshot((rs)=>{
            rs.docChanges().forEach((change)=>{
                if(change.type==='removed'){
                    
                }
            })
        })
    }
    var Filter=(text)=>{
     if(text=="")
     {
         console.log(header.length)
         setSearchData(header);
     }
     else{
         var arr=header.filter((ele)=>{
             
              if(ele.data.city==text||ele.data.age==text || ele.data.type==text)
              {
                  return true;
              }
              return false;
            })
        setSearchData(arr)
        // console.log(arr.length)
     }
    }
    
    const fetchData=async()=>{
        // firebase.default.firestore().collection('JobPost').doc('data').collection('datap').get().then((result)=>{
        //     result.forEach((iirr)=>{{
        //         var element = {}
        //         element.id=iirr.id;
        //         element.data = iirr.data();
        //         setHeader(arr=>[...arr,element])
        //         setSearchData(arr=>[...arr,element])

        //     }})
        // })
   



        firebase.default.firestore().collection('JobPost').doc('data').collection('datap').onSnapshot((result)=>{
            result.forEach((iirr)=>{{
                var element = {}
                element.id=iirr.id;
                element.data = iirr.data();
                setHeader(arr=>[...arr,element])
                setSearchData(arr=>[...arr,element])

                docs()

        



            }})
        })


     
    }
    useEffect(()=>{
        fetchData()

    },[])

    
        BackHandler.addEventListener('hardwareBackPress',function(){
            return true
        })    

        
    return ( 
        
        
        <ScrollView style={{backgroundColor:'white',flex:1}}>
            <Image source={require('../assets/rozg.png')} style={{marginHorizontal:95}}></Image>
            <View>
            <View style={{backgroundColor:'white',marginBottom:0.5,marginHorizontal:8,borderRadius:10,height:40}}>
                <View>
            <TextInput style={{paddingLeft:5,paddingRight:5,paddingTop:1,fontSize:20,borderBottomWidth:1,paddingBottom:10}} placeholder='Search by Job Type,City,Age'  onChangeText={(text)=>{
                Filter(text);
            }}>
            </TextInput>
            </View>
            </View>
                
                 {searchdata.map((res)=>{
                     return(
                         
                        <View   style={{shadowColor:'black',shadowOffset:{width:0,height:2},shadowRadius:8,shadowOpacity:0.50,elevation:10,borderRadius:10,backgroundColor:'white',marginBottom:13,paddingBottom:15,marginHorizontal:8,marginTop:10,flexDirection:'row',alignItems:'center'}}>
                            <Image source={require('../assets/ppp.png')} style={{height:60,width:60,backgroundColor:'white',marginHorizontal:10}}></Image>
                           <TouchableOpacity onPress={()=>{
                               props.navigation.navigate('Detail',{did:res.id})
                           }}>
                               <View style={{marginHorizontal:5,marginVertical:5,paddingTop:15}}>

                            <Text style={styles.textStyle}>Job Type: {res.data.type}</Text>
                            <Text style={styles.textStyle}>City: {res.data.city}</Text>
                            <Text style={styles.textStyle}>Contact No.{res.data.mobile}</Text>
                            </View>

                            </TouchableOpacity>

                            </View>

                     )
                 })}                
            </View>
        </ScrollView>
      );
}

const styles=StyleSheet.create({
    textStyle:{
        fontSize:16,
        fontWeight:'bold',
        textAlign:'justify',
        marginHorizontal:50
        
    }
})
 
export default HomeScreen;