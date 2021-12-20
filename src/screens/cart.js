import React,{useState,useEffect} from "react";
import {View,Text, ActivityIndicator,Button, Alert} from 'react-native';
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
// import { useState } from "react/cjs/react.development";
import { URL } from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNRestart from 'react-native-restart';
export default function Cart(){

    const [loading,setLoading]=useState(true);
    const [data,setData]=useState([]);
    const [id,setId]=useState(0);
    const [token,setToken]=useState('');
    const [pincode,setPincode]=useState('');
    const [items,setItems]=useState([]);
    let filtered=[];
    // let pinCodeList=[];
    const [filter,setFilter]=useState([]);
    const [price,setPrice]=useState(0);
    const [userbill,setUserbill]=useState(0);
    const getId = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
          const uid = await AsyncStorage.getItem('userid');
          const pincode=await AsyncStorage.getItem('pincode');
          setId(uid);
          setToken(token);
          getCart(token);
          setPincode(pincode);
          console.log(token);
        console.log(uid);
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
        // console.log(json);
        const ijson=await items.json();
        // console.log(ijson);
        setItems(ijson);
        setData(json);
        let j=0;
        let bill=0;
        for(let i=0;i<json.length;i++){
            if(json[i].created_by===Number(id)){
                filtered[j]=json[i];
                bill=bill+Number(json[i].total_price);
                j=j+1;
            }
        }
        setUserbill(bill);
        let k=0;
        let amount=0;
        for (let l=0;l<json.length;l++){
            if(pincode===json[l].pincode){
                amount=amount+Number(json[l].total_price);
            }
        }
        setPrice(amount);
        console.log(amount);
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
          else{
              return null;
          }
        }
      }
    
    const deleteCart=async(id)=>{
        try{
            const delitems=await fetch(URL+"main/ordered_item_detail/"+id,{
                method:'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'token '+token},
                
            });
            console.log(delitems);
        }catch(e){
            console.log(e);
        }
    }

    useEffect(() => {
        getId();
      }, []);
      
return(
    <View>
        <Button title="See Price" onPress={()=>{Alert.alert("Pin "+price.toString()+"User "+userbill.toString())}}/>
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
                <TouchableOpacity onPress={()=>{deleteCart(item.id)}}>
                    <Text>Remove from cart</Text>
                </TouchableOpacity>
            </View>
            }
        />
        }
    </View>
)};