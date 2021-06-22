import React, { Component,useState,useEffect } from 'react';
import {View,Text,BackHandler,ScrollView,TouchableOpacity,Alert} from 'react-native'
import * as firebase from 'firebase'
const PostedJobs = (props) => {

    const delval=()=>{
        const usid=firebase.default.auth().currentUser.uid
        firebase.default.firestore().collection('JobPost').doc('data').collection('datap').doc(usid).delete().then((rs)=>{
            fetchData()
            props.navigation.navigate('Pjobs')
            
        }).catch((err)=>{
            alert(err)
        })
    }
    const alerts=()=>{
        Alert.alert(
            'Are you sure want to delete?',
            '',
            [
                {
                    text:'Yes',
                    onPress: ()=>delval()

                },
                {
                    text:'No',
                style:'cancel',
                onPress: ()=>{
                    props.navigation.navigate('Pjobs')
                }           
             }
            ]
        )
    }

    const [dat,setDat]=useState(null)
    const [fdata,setfdata]=useState([])

    

    const backhand=()=>{
        props.navigation.navigate('Profile')
    }
    const fetchData=()=>{
        const usid=firebase.default.auth().currentUser.uid
        firebase.default.firestore().collection('JobPost').doc('data').collection('datap').doc(usid).get().then((doc)=>{
            if(doc.exists){
                setfdata(arr=>[...arr,doc.data()])
                
                setDat(true)
            }
            else{
                setDat(false)
            }
            
        })
    }
    BackHandler.addEventListener('hardwareBackPress',function(){
        backhand()
    })


    useEffect(()=>{
        fetchData()
    },[])
    return (<View style={{flex:1}}>
        <Text style={{marginTop:45,fontSize:25,fontWeight:'bold',textAlign:'center',textDecorationLine:'underline'}}>Your Posted Jobs</Text>
        {
            dat ? (
                <>
                 {
                        fdata.map((rs)=>{
                            return(
                                <ScrollView style={{flex:1}}>
                                <View style={{shadowColor:'black',shadowOffset:{width:0,height:2},shadowRadius:8,shadowOpacity:0.50,elevation:10,borderRadius:10,backgroundColor:'white',marginBottom:13,paddingBottom:15,marginHorizontal:8,marginTop:10,flexDirection:'row',alignItems:'center',height:65}}>
                                    <Text style={{marginHorizontal:10,fontSize:20,fontWeight:'bold'}}>Job Type: {rs.type}</Text>
                                    <TouchableOpacity onPress={()=>alerts()}>
                                    <Text style={{fontSize:20,fontWeight:'bold',color:'#8d021f',textAlign:'right',marginLeft:55}}>X Delete</Text>
                                    </TouchableOpacity>

                                </View>
                                </ScrollView>
                            )
                        })

                    }

                </>
            ): (
                <>
                <View>
                    <Text>No jobs has been posted by you.</Text>
                </View>
                </>
            )
        }
                    
    </View>  );
}
 
export default PostedJobs;