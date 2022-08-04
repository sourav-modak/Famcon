import React, {useState, useEffect} from 'react';
import { View, Image, Alert,Dimensions, SafeAreaView, KeyboardAvoidingView, Button, Pressable,Text,TextInput, StyleSheet } from 'react-native';
import {useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged} from 'firebase/auth';
import { getFirestore, updateDoc, doc, getDoc } from 'firebase/firestore';
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
import UserDetailsScreen from './UserDetailsScreen';


const firestore = getFirestore();
const firebaseConfig = {
    apiKey: "AIzaSyDNlxLPTKn5Hfr3i1tA_JrrrWPR-4B2Ra4",
    authDomain: "securityapp-e2fe2.firebaseapp.com",
    projectId: "securityapp-e2fe2",
    storageBucket: "securityapp-e2fe2.appspot.com",
    messagingSenderId: "400127432154",
    appId: "1:400127432154:web:d679099f2463de547adce3"
  };
initializeApp(firebaseConfig);
const auth = getAuth();


const LocDB = () =>{
    const navigation = useNavigation();
    const user = auth.currentUser;
    const path = "AppUsers/"+user.email;
    const docRef = doc(firestore,path);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [time, setTime] = useState('');
    const [alertTime, setAlertTime] = useState('');
    const d = new Date();
    const [userName, setUserName] = useState("")
    const [famname, setFamname] = useState("")


    useEffect(()=>{
        const NameFetch= async()=>
        {    
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setUserName ( docSnap.data().name);
                setFamname ( docSnap.data().famname);             
            } else {
            console.log(path);
            }
        }
        NameFetch()
    })

    const timer = () =>{
        setTime(d.getTime());
    }

    const handleLogout=()=>{
        auth.signOut()
            .then(()=>{
              navigation.replace("Login")
            })
            .catch(error=>alert(error.message))
      }

    // Update User Details   Try diff functions, use hooks to store the lat and long
    const storeLocation = async () => {        
        if (Platform.OS === 'android' && !Constants.isDevice) {
            setErrorMsg(
            'Location API Error!'
            );
            return;
        }
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        let latitude 
        let longitude
        if (errorMsg) {
            latitude = errorMsg;
        } else if (location) {
            latitude = parseFloat(JSON.stringify(location.coords.latitude));
            longitude = parseFloat(JSON.stringify(location.coords.longitude));
        }       

        const coordinates = [{latitude:latitude, longitude: longitude}];
        const user = auth.currentUser;
        const path = "AppUsers/"+user.email;
        const docRef = doc(firestore,path)
                console.log("Location");
        const locationInfo = {
            email: user.email,
            latitude:coordinates[0].latitude,
            longitude:coordinates[0].longitude,
        };
        updateDoc(docRef, locationInfo);
                console.log("Updated");
        showMessage({
            message: "Location Updated!",
            type: "success",
            icon:"success",
            animationDuration:500,
            style:{
                height:80, 
                alignItems:'center',
                marginTop:30,
                
            }
            });
    }

    const createTwoButtonAlert = () => {
        timer()
        if(time-alertTime >= 5000)
        {
            console.log("Time Over!");
        }
        Alert.alert(
            "Are you Okay?",
            "Just checking",
            [
                {
                    text: "No",
                    onPress: storeLocation,
                    style: "cancel"
                },
                { 
                    text: "Yes I Am", 
                    onPress: ()=> {
                        setAlertTime(d.getTime()), 
                        setTime(d.getTime()), 
                        setTimeout(createTwoButtonAlert, 2000)}
                },
                {
                    text: "End Alerts",
                    style: "cancel"
                },
            ]
            );
    }
        

return (
    <KeyboardAvoidingView style={styles.centeredView}>
    <View style={styles.headingCont1}>
        <Text style={styles.heading1}>FamCon</Text>
        <Text style={styles.heading2}>Stay connected to your family</Text>
    </View>
    <Pressable
        style={[styles.button]}
        onPress={storeLocation}
        android_ripple={{color: 'white', borderless: false}}
    >
        <Text style={styles.buttonText}>Upload Location</Text>
    </Pressable>
    <Pressable
        style={[styles.button]}
        onPress={()=>{setAlertTime(d.getTime()), setTimeout(createTwoButtonAlert, 10)}}
        android_ripple={{color: 'white', borderless: false}}
    >
        <Text style={styles.buttonText}>Send Me Alerts</Text>
    </Pressable>

    

    <View style={{flex:9, width: Dimensions.get('window').width,backgroundColor:'white',alignItems:'center', justifyContent:'center'}}>
        <Image
            style={styles.logo}
            source={require('../assets/userIcon.png')}
        />
        <View style={styles.headingCont2}>
            <Text style={styles.userName1}>Hello</Text><Text style={styles.userName2}> {userName.split(" ")[0]}!</Text>
        </View>
        <View style={styles.headingCont2}>
            <Text style={styles.userName3}>Family Member:</Text><Text style={styles.userName4}> {famname.split(" ")[0]}</Text>
        </View>
        <View style={{flexDirection:'row'}}>
            <Pressable 
                onPress={handleLogout} style={styles.button2}>
                <Text style={styles.profileButton}>Logout</Text>
            </Pressable> 
            <Pressable 
                onPress={()=>navigation.navigate('UserDetailsScreen')} style={styles.button2}>
                <Text style={styles.profileButton}>Edit</Text>
            </Pressable> 
        </View>
        
    </View>
    <FlashMessage position="top" />
    </KeyboardAvoidingView>
);
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems:'center',
      paddingTop: 50,
      backgroundColor: 'white',
      flexDirection:"column" 
    },
    famcon:{
        alignItems:'center',
        justifyContent:'center',
        height:200,
        width:200,
    },
    heading1:{
        justifyContent:'flex-end',
        alignContent:'flex-end',
        color:'teal',
        fontFamily: 'sans-serif-medium',
        fontSize:30,
        fontWeight:'bold',
    },
    heading2:{
        justifyContent:'flex-end',
        fontFamily: 'sans-serif-thin',
        fontSize:20,
    },
    userName1:{
        justifyContent:'flex-end',
        fontFamily: 'sans-serif-thin',
        fontSize:22,
        textAlignVertical:'center',
    },
    userName2:{
        justifyContent:'flex-end',
        color:'teal',
        fontFamily: 'sans-serif-medium',
        fontSize:24,
        fontWeight:'bold',
        textAlignVertical:'bottom',
    },
    userName3:{
        color:'black',
        justifyContent:'flex-end',
        fontFamily: 'sans-serif-thin',
        fontSize:17,
        textAlignVertical:'center'
       
    },
    userName4:{
        justifyContent:'flex-end',
        color:'teal',
        fontFamily: 'sans-serif-medium',
        fontSize:18,
        fontWeight:'bold',
        textAlignVertical:'bottom',
    },
    headingCont1:{
        flex: 7,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
        width:Dimensions.get('window').width,
        
    },
    headingCont2:{
        padding:10,
        justifyContent:'center',
        flexDirection:'row',
    },
    logo:{
        alignItems:'center',
        justifyContent:'center',
        height:30,
        width:30,
    },
    
    button: {
      flex:1,
      borderRadius: 10,
      padding: 10,
      elevation: 2, 
      backgroundColor: "teal",
      margin: 10,
      width:150,
      justifyContent:'center'
    },   
    button2: {
        borderRadius: 10,
        margin: 10,
        width:80,
        height: 30,
        justifyContent:'center',
        borderColor: 'teal',
        borderWidth:1,
      },  
    buttonText: {
        textAlign:'center', color:'white', fontWeight:'bold',fontSize:15
    },
    profileButton:{
        textAlign:'center',
        justifyContent:'flex-end',
        alignContent:'flex-end',
        color:'teal',
        fontFamily: 'sans-serif-medium',
        fontSize:17,
        fontWeight:'bold',
    }
  });
  
  export default LocDB;
