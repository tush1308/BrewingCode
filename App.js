import React from 'react';
import { View,Text } from 'react-native';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home';
import Detail from './src/screens/details';
const Stack = createStackNavigator();

const App=()=> {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={Login} options={{headerShown:false}} />
        <Stack.Screen name='SignUp' component={SignUp} options={{headerShown:false}}/>
        <Stack.Screen name='Home' component={Home} options={{headerShown:false}}/>
        <Stack.Screen name='Detail' component={Detail} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
