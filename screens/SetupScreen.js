import React, {useState, useEffect} from 'react';
import { View, KeyboardAvoidingView, Pressable,Text,TextInput, StyleSheet } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen'
import Tabs from '../navigation/tabs';
import { initializeApp } from "firebase/app";
import { collection, doc, addDoc, getFirestore, updateDoc } from "firebase/firestore"; 

const firebaseConfig = {
    apiKey: "AIzaSyDNlxLPTKn5Hfr3i1tA_JrrrWPR-4B2Ra4",
    authDomain: "securityapp-e2fe2.firebaseapp.com",
    projectId: "securityapp-e2fe2",
    storageBucket: "securityapp-e2fe2.appspot.com",
    messagingSenderId: "400127432154",
    appId: "1:400127432154:web:d679099f2463de547adce3"
};
initializeApp(firebaseConfig);

const firestore = getFirestore();

const AppUsers = doc(firestore, 'AppUsers/UserDetails');
const writeUserDetails =() => {
    const docData = {
        Address: address,
        Mobile: mobile,
        SecurityNumber: secnum,
    };
    updateDoc(AppUsers, docData, {merge: true});
}





const SetupScreen=() => {
  
    const [address, setAddress] = useState("");
    const [mobile, setMobile] = useState("");
    const [secnum, setSecnum] = useState("");

    const navigation = useNavigation();
    useEffect(()=>{
          navigation.navigate('Tabs')
        })
    
    return (
      <KeyboardAvoidingView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text >Set Up Your Account</Text>
        <TextInput
          style={styles.input}
          onChangeText={text=>setAddress(text)}
          value={address}
          placeholder="Address"
          keyboardType="text"
          
        />

        <TextInput
          style={styles.input}
          onChangeText={text=>setMobile(text)}
          value={mobile}
          placeholder="Mobile"
          keyboardType="phone-pad"
          
        />

        <TextInput
          style={styles.input}
          onChangeText={text=>setSecnum(text)}
          value={secnum}
          placeholder="Security Number"
          keyboardType="phone-pad"
          
        />
        
        {/* <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={handleSignUp}
        >
            <Text style={{textAlign:'center'}}>Submit</Text>
        </Pressable> */}
  
        <Pressable
          style={[styles.button]}
          onPress={() => navigation.navigate('Login')}
        >
            <Text>Login Page</Text>
        </Pressable>
      </KeyboardAvoidingView>
    );
  }

  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
      backgroundColor: 'white',
    },
    input: {
      height: 40,
      margin: 5,
      borderWidth: 1,
      padding: 5,
      borderRadius: 10,
    },
    button: {
      borderRadius: 10,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "teal",
      margin: 10,
    },
    
  });
  
  export default SetupScreen;
  
  
  
  