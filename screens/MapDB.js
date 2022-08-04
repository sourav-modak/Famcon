import React, { useState, useEffect } from 'react';
import MapView, { Callout, Marker } from 'react-native-maps';
import { StyleSheet, Pressable, Text, View, Dimensions, Image, SafeAreaView,  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged} from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';




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
const firestore = getFirestore();

const MapDB = ()=> {

    const user = auth.currentUser;
    const path = "AppUsers/"+user.email;
    const docRef = doc(firestore,path);
    const navigation = useNavigation();
    const [famemail, setFamemail] = useState("dummy@gmail.com")
    const [famname, setFamname] = useState("dummyName")
    const [lat, setLat] = useState(11)
    const [long, setLong] = useState(22)
    const [latdel, setLatdel] = useState(0.9)
    const [longdel, setLongdel] = useState(0.9)
    
    
    useEffect(()=>{
      //fetch fam email
      const EmailFetch= async()=>
      {    
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setFamemail(docSnap.data().famemail) 
          } else {
            console.log("No such email!");
          }
          
      }
      EmailFetch();
      console.log('Email Fetch func: '+famemail);
  }, [])  
  
    
    //fetch coords
    
    const FamilyLocationFetch= async()=>
    {    
      const path2 = "AppUsers/"+famemail;
      const docRef2 = doc(firestore,path2);
      console.log('Loc Fetch func: '+famemail);
      const docSnap = await getDoc(docRef2);
        if (docSnap.exists()) {
          setLat ( parseFloat(docSnap.data().latitude));
          setLong ( parseFloat(docSnap.data().longitude)); 
          setFamname (docSnap.data().name.split(" ")[0]);
        } else {
          console.log("No such coords!");
        }
    }

    const MyLocationFetch= async()=>
    {    
      const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setLat ( parseFloat(docSnap.data().latitude));
          setLong ( parseFloat(docSnap.data().longitude)); 
          setFamname(docSnap.data().name.split(" ")[0])
        } else {
          console.log("No such coords!");
        }
    }

    return (   
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Map</Text>
        </View>
        <MapView 
            style={styles.map} 
            initialRegion={{
              latitude: lat,
              longitude:  long,
              latitudeDelta: latdel,
              longitudeDelta: longdel,
            }} 
            onMapReady={MyLocationFetch}
            provider='google'
            region={{
              latitude:  lat,
              longitude:  long,
              latitudeDelta: latdel,
              longitudeDelta: longdel,
            }}
            loadingEnabled={true}
            loadingBackgroundColor={"#495371"}
        >    
             <Marker 
                key='marker1' 
                coordinate={{latitude:  lat, longitude: long}}
                identifier={'mk1'}
              >
                <Callout><Text style={{color:'teal', fontWeight:'bold'}}>{famname}</Text></Callout>
             </Marker>

        </MapView>
        <View style={styles.textContainer}>
          <Text style={{color:'white', fontWeight:'bold', fontSize:20, padding:1}}>{famname}'s Location</Text>
        </View>
        <View style={styles.bts}>
          <View style={styles.buttonContainer}>
            <Pressable
                style={[styles.button]}
                onPress={MyLocationFetch}
                android_ripple={{color: 'white', borderless: false}}>
                <Text style={styles.buttonText}>Your Location</Text>
            </Pressable>
            <Pressable
                style={[styles.button]}
                onPress={FamilyLocationFetch}
                android_ripple={{color: 'white', borderless: false}}>
                <Text style={styles.buttonText}>Family Location</Text>
            </Pressable>
          </View>
          <View style={styles.buttonContainer2}>
            <Pressable
                style={[styles.button2]}
                onPress={() => {
                  if(latdel>0.2){
                    setLatdel(latdel-0.1);
                    setLongdel(longdel-0.1);
                  } 
                }}>
                <Text style={styles.buttonText}>+</Text>
            </Pressable>
            <Pressable
                style={[styles.button2]}
                onPress={() => {
                  setLatdel(latdel+0.1);
                  setLongdel(longdel+0.1);
                }}>
                <Text style={styles.buttonText}>-</Text>
            </Pressable>
          </View>
        </View> 
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#495371',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom:50,
  },
  headerText:{
   fontSize:30, textAlign: 'center', color:'white', fontWeight:"bold",
  },
  header:{
    flex:1.2, alignItems: 'center', justifyContent: 'flex-end', marginBottom:10,
  },
  map: {
    flex: 11,
    width: Dimensions.get('window').width,
    position:'relative',
  },
  textContainer:{
    fontSize:30, marginTop:0,justifyContent:'center', alignContent:'center',
  },
  bts:{
    flex:1, fontSize:30, marginTop:0, flexDirection:'row', justifyContent:'center', alignContent:'center',
  },
  buttonContainer:{
    flex:2.3, fontSize:30, marginTop:0, flexDirection:'row', justifyContent:'center', alignContent:'center',
  },
  buttonContainer2:{
    flex:1, marginTop:0, flexDirection:'row', justifyContent:'center', alignContent:'center',
  },
  button: {
    flex:1,
    padding: 10,
    elevation: 2, 
    backgroundColor: "teal",
    margin: 10,
    height:40,
    width:150,
  },
  button2: {
    flex:1,
    borderRadius: 20,
    padding: 10,
    elevation: 5, 
    backgroundColor: "teal",
    margin: 10,
    
  },
  buttonText:{
    textAlign: 'center', color:'white', fontWeight:"bold",
  }
});

export default MapDB;
