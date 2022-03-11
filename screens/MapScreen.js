import React, { useState, useEffect } from 'react';
import MapView, { Callout, Marker } from 'react-native-maps';
import { Platform, FlatList, StyleSheet, Pressable, Text, View, Dimensions, Image, SafeAreaView,  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import Tabs from '../navigation/tabs';
import * as Location from 'expo-location';


const MapScreen = ()=> {
    const navigation = useNavigation();
    const markerImage = require('../assets/marker.jpg')

  //Location API
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [pin1, setPin1] = useState({latitude: 22.8, longitude: 88.3})
  const [pin2, setPin2] = useState({latitude: 22.6, longitude: 88.4})

  
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
        setPin2(coordinates[0])    
      }


   
    return (   
    <SafeAreaView style={styles.container}>
        
        <View style={styles.header}><Text style={styles.headerText}>Map</Text></View>
        <MapView 
            style={styles.map} 
            initialRegion={{
              latitude: pin1.latitude,
              longitude: pin1.longitude,
              latitudeDelta: 0.6,
              longitudeDelta: 0.6,
            }} 
            onMapReady={LocationUpdate}
            provider='google'
            region={{
              latitude: pin2.latitude,
              longitude: pin2.longitude,
              latitudeDelta: 0.6,
              longitudeDelta:0.6,
            }}
            loadingEnabled={true}
            loadingBackgroundColor={"#495371"}

        >    
             <Marker 
                key='Family' 
                coordinate={pin1}
                identifier={'mk1'}
              >
                <Callout><Text>Family</Text></Callout>
             </Marker>
             
             <Marker 
                key='User' 
                coordinate={pin2}
                identifier={'mk2'}
              >
                <Callout><Text>Me</Text></Callout>
             </Marker>

        </MapView>
        <View style={styles.buttonContainer}>
          <Pressable
              style={[styles.button]}
              onPress={() => navigation.navigate('Tabs')}>
              <Text style={styles.buttonText}>Back</Text>
          </Pressable>
          <Pressable
              style={[styles.button]}
              onPress={LocationUpdate}>
              <Text style={styles.buttonText}>Refresh</Text>
          </Pressable>
        </View>
    </SafeAreaView>
  );
}

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#495371',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText:{
   fontSize:30, textAlign: 'center', color:'white', fontWeight:"bold",
  },
  header:{
    flex:1, alignItems: 'center', justifyContent: 'flex-end', marginBottom:10,
  },
  map: {
    flex: 9,
    width: Dimensions.get('window').width,
    position:'relative',
  },
  buttonContainer:{
    flex:1, fontSize:30, marginTop:10, flexDirection:'row', justifyContent:'center', alignContent:'flex-start',
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2, 
    backgroundColor: "teal",
    margin: 10,
    height:40,
    width:150,
  },
  buttonText:{
    textAlign: 'center', color:'white', fontWeight:"bold",
  }
});