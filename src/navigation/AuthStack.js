import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import Loading from '../screens/Loading'

const AStack= createStackNavigator();

export default function AuthStack(){
    return(
            <AStack.Navigator initialRouteName='Login'>
                    <AStack.Screen name='Login' component={Login} options={{headerShown:false}} />
                    <AStack.Screen name='SignUp' component={SignUp} options={{headerShown:false}}/>
                    <AStack.Screen name='Loading' component={Loading} options={{headerShown:false}}/>
            </AStack.Navigator>
    )
}