import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LocDB from '../screens/LocDB';
import MapDB from '../screens/MapDB';
import UserDetailsScreen from '../screens/UserDetailsScreen'
import {View, Text, Image, Button, StyleSheet, SafeAreaView} from 'react-native';
import { withSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();
const Tabs = () => {
    return(
        <Tab.Navigator         
        screenOptions={{
            headerShown:false, 
            tabBarShowLabel: false,
            tabBarStyle:styles.bottomTab,
        }}>
        <Tab.Screen name={"User"} component={LocDB} options={{
            tabBarIcon: ({focused}) => (
                <View>
                    <Image
                        style={styles.logo}
                        source={require('../assets/home.png')}
                    />
                </View>
            )
        }}/>
        <Tab.Screen name={"Family"} component={MapDB}  options={{
            tabBarIcon: ({focused}) => (
                <View>
                    <Image
                        style={styles.logo}
                        source={require('../assets/map.png')}
                    />
                </View>
            )
        }}/>
        {/* <Tab.Screen name={"Profile"} component={UserDetailsScreen}  options={{
            tabBarIcon: ({focused}) => (
                <View>
                    <Image
                        style={styles.logo}
                        source={require('../assets/profile.png')}
                    />
                </View>
            )
        }}/> */}
        </Tab.Navigator>
        
        
    ); 
}
export default Tabs;


const styles = StyleSheet.create({
    bottomTab: {
        position: 'absolute' ,
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 0,
        borderRadius: 0,
        height: 50,
        backgroundColor:'white',
        // shadowColor:'black', 
        // shadowOffset: {
        //     width: 10,
        //     height: 10,
        // },
        // shadowOpacity: 0.2,
        // shadowRadius: 5,
        // elevation:5,
    },
    text: {
        color: 'teal',
        fontSize:15,
    },
    logo:{
        
        alignItems:'center',
        justifyContent:'center',
        height:20,
        width:20,
    },
})

