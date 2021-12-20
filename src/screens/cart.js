import React,{useEffect} from "react";
import {View,Text, ActivityIndicator} from 'react-native';
import { FlatList } from "react-native-gesture-handler";
import { useState } from "react/cjs/react.development";
import { URL } from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Cart(){

    const [loading,setLoading]=useState(true);
    const [data,setData]=useState([]);
    const [id,setId]=useState(0);
    const [token,setToken]=useState('');
    const [filtered,setFiltered]=useState([]);

    const getId = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
          const uid = await AsyncStorage.getItem('userid');
          setId(uid);
          setToken(token);
          console.log(token);
        // console.log(value);
        } catch(e) {
          console.log(e);
        }finally{
            getCart(token);
        }
      }

    const getCart=async(token)=>{
        try{
            const response=await fetch(URL+"main/ordered_item/",{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'token '+token},
            
        });
        const json=await response.json();
        console.log(json);
        setData(json);
        // const filtered=json.filter(function (el)
        // {
        //   return el.created_by==Number(id);
        // }
        // );
        // console.log(filtered);
        // setFiltered(filtered);
        }catch(error){
            console.log(error);
        }finally{
            setLoading(false);
        }
    }

    // const getImg=async()=>{
    //     try{
    //         const response=await fetch(URL+"main/ordered_item/",{
    //             method:'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': 'token '+token},
                
    //         });
    //     }
    // }

    useEffect(() => {
        getId();
      }, []);
return(
    <View>
        {loading?<ActivityIndicator/>:
            <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            // numColumns={3}
            renderItem={({item,index})=>
            <View style={{margin:10}}>
                <Text style={{fontSize:22}}>item id: {item.cart_item} Quantity: {item.quantity} TotalP:{item.total_price}</Text>
                <Text style={{fontSize:22}}>Created by {item.created_by}</Text>
            </View>
            }
        />
        }
    </View>
)};