import React, { useState } from "react";
import {View,Text,ActivityIndicator, Alert} from 'react-native';

export default function Confirm({navigation,route}){
    const [Loading,setLoading]=useState(true);
    const {info}=route.params;

    const getToken = async (id) => {
        try {
          const value = await AsyncStorage.getItem(id);
          if(value==info.token){
              setLoading(false);
          }
          else{
              Alert.alert("Create an account first!");
          }
        } catch(e) {
          console.log(e);
        }
    }
    
    useEffect(() => {
        getToken(info.userId);
      }, []);

    return(
        Loading?<ActivityIndicator/>:
        <View>
            <Text>Done</Text>
        </View>
    )
}