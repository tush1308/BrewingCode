import React,{useEffect} from 'react';
import {View,Text,ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Logout(){
    const logout=async()=>{
        await AsyncStorage.removeItem('token');
        console.log('Logged out');
    }
    useEffect(() => {
        logout();
      }, []);
    return(
        <ActivityIndicator/>
    )
}