import React, { Component,useState, useEffect} from 'react';
import {View,Text,TextInput,Button,Image,TouchableOpacity,StyleSheet,ScrollView} from 'react-native'
import * as firebase from 'firebase'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'



const Profile = (props) => {

    const [name,setname]=useState('')
    const [age,setAge]=useState('')
    const [city,setCity]=useState('')
    const [mobile,setMobile]=useState('')
    const [pref,setPref]=useState('')

    const [multiImage,setMultiImage]=useState([])

    const [imageurl,setImageUrl]=useState()
    const [imageName,setImageName]=useState([])



    const [info,setInfo]=useState([])
    const[prof,setprof]=useState(null)



    const h1= async()=>{
        const usid=firebase.default.auth().currentUser.uid
        var name;
       await firebase.default.firestore().collection('Profile').doc('Prof').collection('Pro').doc(usid).get().then((doc)=>{
            // var img=doc.data().image
            name=doc.data().image[0]
            // setImageName(arr=>[img])               
        })
    await  firebase.default.storage().ref('Profile/'+'Prof/'+usid+'/'+name).getDownloadURL().then((url)=>{
            setImageUrl(url)
        }).catch((err)=>{
            alert(err)
        })

    }

    

    

    const getdata=async ()=>{
        const usid=firebase.default.auth().currentUser.uid

        firebase.default.firestore().collection('Profile').doc('Prof').collection('Pro').doc(usid).get().then((rs)=>{
            if(rs.exists){

                firebase.default.firestore().collection('Profile').doc('Prof').collection('Pro').doc(usid).onSnapshot((ss)=>{
                    setInfo(arr=>[...arr,ss.data()])  
                                })
                                setprof(true)


            }
            else{
                setprof(false)
            }
            }
            )   
      
}


  



const verifyPermissions=async ()=>{
    const result= await Permissions.askAsync(Permissions.CAMERA)
    if(result.status!='granted'){
        Alert.alert('Permission not granted,please grant the permission')
        return false
    }
    return true
}

const takeImageHandler=async ()=>{
    const hasPermission=await verifyPermissions()
    if(!hasPermission){
        return;
    }
    const images=await ImagePicker.launchCameraAsync({
        mediaTypes:ImagePicker.MediaTypeOptions.Images,
        allowsEditing:true,
        aspect:[4,3],
        quality:0.5,
        // allowsMultipleSelection:true
    })
    console.log(images.uri)
    console.log("<---")
    setMultiImage(arr=>[...arr,images.uri])
  
}




const dataSubmit=()=>{
    const usid=firebase.default.auth().currentUser.uid
    firebase.default.firestore().collection('Profile').doc('Prof').collection('Pro').doc(usid).set({
        name:name,
        age:age,
        city:city,
        mobile:mobile,
        pref,
        image:multiImage
    })

    

    multiImage.map(
        async(uri)=>{   
        let response=await fetch(uri);
        let blob= await response.blob();
            
        var ref=firebase.default.storage().ref('Profile/'+'Prof/').child(usid).child(uri)
        
        return ref.put(blob)
        })




    props.navigation.navigate('Home')
    getdata()

}

useEffect(()=>{
    getdata()
    h1()
    
},[])
    return (
 
        <ScrollView>
            {
                prof ? ( <>

                <View style={{backgroundColor:'white'}}>
                    
                    <Image source={{uri:imageurl}} style={{height:150,width:150,marginTop:45,borderRadius:450,paddingTop:10,marginLeft:120,marginBottom:5}}></Image>
                    <Text style={{marginTop:1,fontSize:28,fontWeight:'bold',textDecorationLine:'underline',textAlign:'center'}}>Your Profile</Text> 
                    {info.map((res)=>{
                        return(
                            <View style={{marginTop:10}}>
                             <Text style={style.textback}>Name: {res.name}</Text>
                             <Text style={style.textback}>Age: {res.age}</Text>
                             <Text style={style.textback}>City: {res.city}</Text>
                             <Text style={style.textback}>Mobile No.: {res.mobile}</Text>
                             <Text style={style.textback}>Job Preference: {res.pref}</Text>

                             <TouchableOpacity style={{backgroundColor:'#8d021f',
        borderRadius:15,
        marginBottom:25,
        height:50,
        marginHorizontal:10,
        marginTop:50,}} onPress={()=>props.navigation.navigate('Pjobs')}>
                                 <Text style={{fontWeight:'bold',
        fontSize:18,
        marginHorizontal:10,
        marginTop:10,
        textAlign:'center',color:'white',}}>My Posted Jobs</Text>
                             </TouchableOpacity>






                            </View>
                        )
                    })}
                </View>
                </>
                ) : (
                    <>
                    <View style={{backgroundColor:'white'}}>
                        <Image source={require('../assets/enprof.png')} style={{height:170,width:395,marginTop:45,marginBottom:5}}></Image>
                        <Text style={{fontSize:28,textAlign:'center',marginTop:1,fontWeight:'bold',textDecorationLine:'underline'}}>Create Your Profile</Text> 
                        <Text style={style.textstyle} >Name</Text>
                        <TextInput style={style.input} onChangeText={(text)=>setname(text)}></TextInput>
                        <Text style={style.textstyle} >Age</Text>
                        <TextInput style={style.input} onChangeText={(text)=>setAge(text)}></TextInput>
                        <Text style={style.textstyle} >Mobile No.</Text>
                        <TextInput style={style.input} onChangeText={(text)=>setMobile(text)}></TextInput>
                        <Text style={style.textstyle} >City</Text>
                        <TextInput style={style.input} onChangeText={(text)=>setCity(text)}></TextInput>
                        <Text style={style.textstyle} >Job Preference Type</Text>
                        <TextInput style={style.input} onChangeText={(text)=>setPref(text)}></TextInput>
                        <Text style={{textAlign:'center',color:'#8d021f',marginTop:15}}>Click To Below To Add Your Profile Picture</Text>
                        <TouchableOpacity style={style.preview} onPress={takeImageHandler}>
                            {
                            multiImage.map((data)=>{
                            return(
             <Image style={{height:200,width:300}} source={{uri:data}}></Image>)
            //  console.log(data)
        })}

                        </TouchableOpacity>


                        <TouchableOpacity onPress={()=>dataSubmit()} style={{backgroundColor:'#8d021f',
        borderRadius:15,
        marginBottom:25,
        height:50,
        marginHorizontal:10,
        marginTop:50,
        }}>
        <Text style={{fontWeight:'bold',
        fontSize:18,
        marginHorizontal:10,
        marginTop:10,
        textAlign:'center',color:'white',}}>Submit</Text>
    </TouchableOpacity>
                        
                    </View>
                    </>
                )
            }
        </ScrollView>
      );
}

const style=StyleSheet.create({
    textstyle:{
        fontWeight:'bold',
        fontSize:18,
        marginHorizontal:10,
        marginTop:3
    },
    input:{
        borderBottomWidth:1,
        borderBottomColor:'black',
        marginHorizontal:10,
        paddingTop:5,
        fontSize:16
    },
    preview:{
        width:'50%',
        height:200,
        marginBottom:10,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'red',
        borderWidth:1,
        flexDirection:'row',
        marginTop:10,
        marginHorizontal:100
        
    },
    textback:{
        backgroundColor:'white',
        fontWeight:'bold',
        fontSize:18,
        marginHorizontal:25,
        paddingLeft:10,
        paddingTop:10,
        shadowColor:'black',shadowOffset:{width:0,height:2},shadowRadius:8,shadowOpacity:0.50,elevation:10,borderRadius:10,backgroundColor:'white',marginBottom:13,paddingBottom:15,marginHorizontal:8,marginTop:10,flexDirection:'row',alignItems:'center'
    }
})

export default Profile;