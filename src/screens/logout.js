import React,{useEffect,useState} from 'react';
import {View,Text,ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AuthStack from '../navigation/AuthStack';

export default function Logout(){
    const [loading,setLoading]=useState(true);
    const logout=async()=>{
        try{
            const tok=await AsyncStorage.removeItem('token');
            console.log(tok);
            setLoading(false);
        }catch(e){
            console.log(e);
        }
    }
    return(
        <>
            {loading?<TouchableOpacity onPress={()=>{logout()}}>
                <Text style={{fontSize:30}}>Logout</Text>
            </TouchableOpacity>:<AuthStack/>}
        </>
    );
}