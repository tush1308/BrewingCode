import React,{useState,useEffect} from 'react';
import {View,Text,ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStack from '../navigation/AppStack';

export default function Loading({navigation,route}){
    const [loading,setLoading]=useState(false);

    const {info}=route.params;
    console.log(info);
    const storeToken = async (info) => {
        try {
          const jsonValue = JSON.stringify(info);
          await AsyncStorage.setItem(info.userId.toString(), jsonValue);
          await AsyncStorage.setItem('userid',info.userId.toString());
        } catch (e) {
          console.log(e);
        }finally{
            setLoading(false);
            // console.log("Done");
        }
    }

    useEffect(() => {
        storeToken(info);
        if(loading){
            return(<ActivityIndicator/>)
        }navigation.navigate('Login');
        
      }, []);

    return(
        <>
            
        </>
    );
};