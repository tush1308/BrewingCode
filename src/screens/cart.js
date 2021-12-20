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
    const [items,setItems]=useState([]);
    let filtered=[];
    const [filter,setFilter]=useState([]);

    const getId = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
          const uid = await AsyncStorage.getItem('userid');
          setId(uid);
          setToken(token);
          getCart(token);
        //   console.log(token);
        // console.log(value);
        } catch(e) {
          console.log(e);
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
        const items=await fetch(URL+"main/item",{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'token '+token},
            
        });
        const json=await response.json();
        const ijson=await items.json();
        console.log(ijson);
        setItems(ijson);
        setData(json);
        let j=0;
        for(let i=0;i<json.length;i++){
            if(json[i].created_by===Number(id)){
                filtered[j]=json[i];
                // console.log(json[i])
                j=j+1;
            }
        }
        console.log(filtered);
        setFilter(filtered)
        }catch(error){
            console.log(error);
        }finally{
            setLoading(false);
        }
    }

    const Item_search=(props)=>{
        let Found='';
        for (let i=0;i<items.length;i++){
          if(items[i].item_id==props.id){
            Found=items[i].item_name;
            // console.log(Found);
            return(
              <Text>{items[i].item_name} {items[i].item_brand}</Text>
            );
          }
        }
      }

    useEffect(() => {
        getId();
      }, []);
      
return(
    <View>
        {loading?<ActivityIndicator/>:
            <FlatList
            data={filter}
            keyExtractor={({ id }, index) => id}
            // numColumns={3}
            renderItem={({item,index})=>
            <View style={{margin:10}}>
                <Text style={{fontSize:22}}>item id: {item.cart_item} Quantity: {item.quantity} TotalP:{item.total_price}</Text>
                <Text style={{fontSize:22}}>Created by {item.created_by}</Text>
                <Item_search id={item.cart_item}/>
            </View>
            }
        />
        }
    </View>
)};