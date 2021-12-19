import React,{useState,useEffect} from 'react';
import { View,Text } from 'react-native';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Loading from './src/screens/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStack from './src/navigation/AppStack';
const Stack = createStackNavigator();


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
      {/* {user?<AppStack/>: */}
      <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name='Login' component={Login} options={{headerShown:false}} />
      <Stack.Screen name='SignUp' component={SignUp} options={{headerShown:false}}/>
      <Stack.Screen name='Loading' component={Loading} options={{headerShown:false}}/>
    </Stack.Navigator>
    {/* } */}
    </NavigationContainer>
  );
};


export default App;
