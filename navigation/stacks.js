import React, {useState, useEffect} from 'react';
import { View, KeyboardAvoidingView, Pressable,Text,TextInput, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './tabs';
import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen'
import SetupScreen from '../screens/SetupScreen'
import MapScreen from '../screens/MapScreen'
import UserDetailsScreen from '../screens/UserDetailsScreen'
import MapDB from '../screens/MapDB'
import LocDB from '../screens/LocDB'

const Stack = createNativeStackNavigator();

const Stacks = () => {
    return(
        <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown:false,}}>
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Login" component={LoginScreen} /> 
            {/* <Stack.Screen name="LocDB" component={LocDB} /> 
            <Stack.Screen name="MapDB" component={MapDB} /> */}
            <Stack.Screen name="Tabs" component={Tabs} />
            <Stack.Screen name="UserDetailsScreen" component={UserDetailsScreen} />
            
        </Stack.Navigator>
    )

    
}

export default Stacks;