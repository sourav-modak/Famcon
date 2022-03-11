import React, {useState, useEffect} from 'react';
import { View, Alert, SafeAreaView, KeyboardAvoidingView, Button, Pressable,Text,TextInput, StyleSheet } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged} from 'firebase/auth';
import { getFirestore, updateDoc, doc, getDoc } from 'firebase/firestore';
import { Audio } from 'expo-av';
import MapScreen from '../screens/MapScreen';
import UserDetailsScreen from './UserDetailsScreen'


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



// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     const uid = user.uid;
//     console.log(uid + " Logged In");
//   } else {
//     console.log("Logged Out");
//   }
// });



const Stack = createNativeStackNavigator();
const firestore = getFirestore();



const UserScreen = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleLogout=()=>{
    auth.signOut()
        .then(()=>{
          navigation.replace("Login")
        })
        .catch(error=>alert(error.message))
  }
  


  // const ringtone=()=>{
  //   const [sound, setSound] = React.useState();
  //   async function playSound() {
  //     console.log('Loading Sound');
  //     const { sound } = await Audio.Sound.createAsync(
  //        require('../assets/Hello.mp3')
  //     );
  //     setSound(sound);
  
  //     console.log('Playing Sound');
  //     await sound.playAsync(); }
  
  //   React.useEffect(() => {
  //     return sound
  //       ? () => {
  //           console.log('Unloading Sound');
  //           sound.unloadAsync(); }
  //       : undefined;
  //   }, [sound]);
  //   console.log('ring');
  //   playSound();
  // }

  // const sendAlert =  () => {
  //   Alert.alert('Hey There!', 'Are you okay?', 
  //   [{text:'Yes', onPress:() => setTimeout(sendAlert, 10)},
  //   {text:'Nope', onPress:()=>{ringtone}}]);
  // } 


// Update Location in DB
  const LocationUpdate = async () => {  
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

    console.log('hi');
    const user = auth.currentUser;
    const path = "AppUsers/"+user.email;
    const docRef = doc(firestore,path)
    console.log("Location");
    const locationInfo = {
      latitude:coordinates[0].latitude,
      longitude:coordinates[0].longitude,
    };
    updateDoc(docRef, locationInfo);
    console.log("Updated");
  }

  


  return (
    <SafeAreaView style={styles.centeredView}>
      
      <Pressable
        style={[styles.button]}
        onPress={() => navigation.navigate('MapScreen')}>
        <Text style={styles.buttonText}>Map</Text>
      </Pressable>
      
      {/* <Pressable
        style={[styles.button]}
        onPress={()=>{setTimeout(sendAlert, 3000)}}>
        <Text style={styles.buttonText}>Send Alerts</Text>
      </Pressable> */}

      <Pressable
        style={[styles.button]}
        onPress={LocationUpdate}>
        <Text style={styles.buttonText}>Store Location</Text>
      </Pressable>

      <Pressable
        style={[styles.button]}
        onPress={()=>navigation.navigate('UserDetailsScreen')}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </Pressable>

      <Pressable
        style={[styles.button]}
        onPress={handleLogout}>
        <Text style={styles.buttonText}>Log Out</Text>
      </Pressable>
      
    </SafeAreaView>
  );
}

export default UserScreen;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'white',
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2, 
        backgroundColor: "teal",
        margin: 10,
        height:50,
        width:150,
        textAlignVertical:'center'
    },
    buttonText:{
      textAlign: 'center', color:'white', fontWeight:"bold", fontSize:20,   
    }
})