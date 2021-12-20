import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Cart from './cart';
import Home from './Home';
import Orders from './orders';

const Tab = createBottomTabNavigator();

export default function HomePage() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} options={{headerShown:false}}/>
      <Tab.Screen name="Cart" component={Cart}/>
      <Tab.Screen name="Orders" component={Orders}/>
    </Tab.Navigator>
  );
}