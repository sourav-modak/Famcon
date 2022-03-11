import { StatusBar } from "expo-status-bar";
import React from "react";
import {View, Text, Button, SafeAreaView, FlatList, StyleSheet, Flatlist} from 'react-native';

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Mom',
       
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Dad',

    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Sister',
    },
    ];

    const Item = ({ title }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
    );
           
const FamilyScreen = (navigation) => {
    const renderItem = ({ item }) => (
        <Item title={item.title} />
      );
    return(
        // <View style={styles.container}>
        //     <Text>Family Screen</Text>

        //     </View>
        // 
        <SafeAreaView style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
        );
    }    

export default FamilyScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 30,
      },
      item: {
        backgroundColor: '#00a7a7',
        padding: 20,
        marginVertical: 16,
        marginHorizontal: 16,
      },
      title: {
        fontSize: 20,
      },
    });