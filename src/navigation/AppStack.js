import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from "../screens/Home";
import Detail from "../screens/details";
import Logout from "../screens/logout";

const Stack= createStackNavigator();

export default function AppStack(){
    return(
        // <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Home' component={Home} options={{headerShown:false}}/>
                <Stack.Screen name='Detail' component={Detail} options={{headerShown:false}}/>
                <Stack.Screen name='Logout' component={Logout} options={{headerShown:false}}/>
            </Stack.Navigator>
        // </NavigationContainer>
    )
}