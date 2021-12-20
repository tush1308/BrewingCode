import React from 'react';
import {View,Text} from 'react-native';

export default function Type_list({navigation,route}){

    const {info}=route.params;
    const id=info.id;
    const token=info.token;

    const getData=async()=>{
        setLoading(true);
        try{
            const result=await fetch(url,{
                method:'GET',
                headers: {'Authorization': 'token '+token},
            });
            const json= await result.json();
            // console.log(json);
            setData(json);
        }catch(error){
            console.log(error);
        }finally{
            setLoading(false);
        }

    }

    return(
        <View>
            <Text>Hi</Text>
        </View>
    )
}