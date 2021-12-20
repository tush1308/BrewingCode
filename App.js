import React,{useState,useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStack from './src/navigation/AppStack';
import AuthStack from './src/navigation/AuthStack';

const App=()=> {
  const [loading,setLoading]=useState(true);
  const [user,setUser]=useState(false);
  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token')
      console.log(value);
      if(value!=null){
        setUser(true);
      }
    } catch(e) {
      console.log(e);
    }finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    getToken();
  }, []);

  return (
    <NavigationContainer>
      {user?<AppStack/>:<AuthStack/>}
    </NavigationContainer>
  );
};


export default App;
