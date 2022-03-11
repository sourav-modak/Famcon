import React, {useState, useEffect} from 'react';
import { View, Dimensions, KeyboardAvoidingView, Pressable,Text,TextInput, StyleSheet } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth';
import SignupScreen from './SignupScreen'
import MapDB from './MapDB';
import LocDB from './LocDB';
import Tabs from '../navigation/tabs';

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

const LoginScreen=() => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();
    useEffect(()=>{
      const logout=onAuthStateChanged(auth, (user)=>{
        if (user){
          navigation.navigate("Tabs")
        }
      })
    })
    const handleLogin = ()=>{
      signInWithEmailAndPassword(auth, email, password)
        .then(userCredentials =>{
          const user = userCredentials.user;
        })
        .catch(error => alert(error.message))
    }
    return (
      <KeyboardAvoidingView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
        
        
          <Text style={styles.heading1}>Log In</Text>
        
        
            <TextInput
              style={styles.input}
              onChangeText={text=>setEmail(text)}
              value={email}
              placeholder="Email"
              keyboardType="email-address"
            />
      
            <TextInput
              style={styles.input}
              onChangeText={text=>setPassword(text)}
              value={password}
              placeholder="Password"
              keyboardType="default"
              secureTextEntry
            />
            
            <Pressable
              style={[styles.button]}
              onPress={handleLogin}
              android_ripple={{color: 'white', borderless: false}}
            >
              <Text style={styles.buttonText}>Log In</Text>
            </Pressable>
            <Text>Or</Text>
            <Pressable
              onPress={() => navigation.navigate('Signup')}
              style={styles.button2}
            >
              <Text style={styles.button2text}>SignUp</Text>
            </Pressable>
        
      </KeyboardAvoidingView>
    );
  }
  
  

export default LoginScreen;

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
      backgroundColor: 'grey',
    },
    heading1:{
      justifyContent:'flex-end',
      alignContent:'flex-end',
      color:'teal',
      fontFamily: 'sans-serif-medium',
      fontSize:25,
      fontWeight:'bold',
  },
  cont1:{
    
    alignItems:'center',
    justifyContent:'flex-end',
   
    width:Dimensions.get('window').width,
  },
  cont2:{
    
    alignItems:'center',
    justifyContent:'flex-start',
    
    width:Dimensions.get('window').width,
  },
  cont3:{
    flex: 1,
    alignItems:'center',
    justifyContent:'flex-start',
    
    width:Dimensions.get('window').width,
  },
  input: {
    height: 50,
    width: Dimensions.get('window').width-100,
    margin: 5,
    borderBottomWidth: 1,
    padding: 5,
    paddingLeft:15,
    backgroundColor: "white"
  },
    button: {
      borderRadius: 10,
      padding: 10,
      elevation: 2,
      backgroundColor: "teal",
      margin: 10,
      width:80,
      height:40,
    },
    button2:{
      borderRadius: 10,
      margin: 10,
      width:80,
      height: 40,
      justifyContent:'center',
      borderColor: 'teal',
      borderWidth:1,
      backgroundColor:"white"
  },
  button2text:{
    textAlign:'center',
    justifyContent:'flex-end',
    alignContent:'flex-end',
    color:'teal',
    fontFamily: 'sans-serif-medium',
    fontSize:17,
    fontWeight:'bold',
},
buttonText: {
  textAlign:'center', color:'white', fontWeight:'bold',fontSize:15
},
  });
  