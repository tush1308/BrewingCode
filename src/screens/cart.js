import React,{useState,useEffect} from "react";
import {View,Text, ActivityIndicator,Button, Alert,Image,StyleSheet} from 'react-native';
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
// import { useState } from "react/cjs/react.development";
import { URL } from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
export default function Cart(){

    const [loading,setLoading]=useState(true);
    const [data,setData]=useState([]);
    const [id,setId]=useState(0);
    const [token,setToken]=useState('');
    const [pincode,setPincode]=useState('');
    const [items,setItems]=useState([]);
    const [cart,setCart]=useState(0); //number of cart_order
    const [cartlist,setCartlist]=useState([]);   //array of cart_id to post for order
    let filtered=[];
    let Array=[];
    // let pinCodeList=[];
    const [filter,setFilter]=useState([]);
    const [price,setPrice]=useState(0);
    const [userbill,setUserbill]=useState(0);
    const [prediscount,setPrediscount]=useState(0);
    const getId = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
          const uid = await AsyncStorage.getItem('userid');
          const pincode=await AsyncStorage.getItem('pincode');
          setId(uid);
          setToken(token);
          getCart(token);
          setPincode(pincode);
        //   console.log(token);
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
                Array[j]=json[i].id;
                j=j+1;
            }
        }
        setPrediscount(bill);
        setCart(j);
        setCartlist(Array);
        let k=0;
        let amount=0;
        for (let l=0;l<json.length;l++){
            if(pincode===json[l].pincode){
                amount=amount+Number(json[l].total_price);
            }
        }
        
        if(amount<50000){                          //discount based on total order price of a pincode
            setUserbill(bill*0.96)     
        }
        else if(amount>50000){         
            setUserbill(bill*0.94);
        }
        else{
            setUserbill(bill*0.90)
        }
        setPrice(amount);
        // console.log(amount);
        // console.log(filtered);
        setFilter(filtered)
        }catch(error){
            console.log(error);
        }finally{
            setLoading(false);
        }
    }

    

    const Item_search=(id)=>{
        let Found='';
        console.log(id.id);
        for (let i=0;i<items.length;i++){
          if(items[i].item_id==id.id){
            Found=items[i].item_name;
            console.log(Found);
            return(
                <View style={{flexDirection:'row'}}>
              <Text>{items[i].item_name} {items[i].item_brand}</Text>
              <Image style={styles.image} source={{uri:items[i].item_image}}/>
              </View>
            );
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

    const deleteAllCart=async()=>{
            try{
                for (let i=0;i<cart;i++){
                const delitems=await fetch(URL+"main/ordered_item_detail/"+cartlist[i],{
                    method:'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'token '+token},
                    
                });
                console.log(delitems);
            }
            }catch(e){
                console.log(e);
            }
        }
    const order=async()=>{
        try{
            const response=await fetch(URL+"main/order/",{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'token '+token},
                    body: JSON.stringify({
                        'total_bill':userbill.toString(),
                        'payment_method':'CASH ON DELIVERY',
                        'address':'address',
                        'city':'city',
                        'user':Number(id),
                        'items_added_in_cart':cartlist
                      }),
            });
            const json=await response.json();
            console.log(json);
        }catch(e){
            console.log(e);
        }finally{
            deleteAllCart();
        }
    }
    useEffect(() => {
        getId();
      }, []);
      
return(
    <View>
        
        {loading?<ActivityIndicator/>:
        <View>
            <Text>Original Amount: {prediscount}</Text>
        <Text>Discounted Amount: {userbill}</Text>
        <TouchableOpacity style={{alignSelf:'center',marginTop:25,borderRadius:5,borderWidth:2,padding:10}}
        onPress={()=>{order()}}
        >
            <Text>Buy</Text>
        </TouchableOpacity>
            <FlatList
            data={filter}
            keyExtractor={({ id }, index) => id}
            // numColumns={3}
            renderItem={({item,index})=>
            <View style={{margin:10}}>
                <Text style={{fontSize:22}}>item id: {item.cart_item} Quantity: {item.quantity} Cart Amount:{item.total_price}</Text>
                <Item_search id={item.cart_item}/>
                <TouchableOpacity onPress={()=>{deleteCart(item.id)}}>
                    <Text style={{backgroundColor:'yellow',maxWidth:wp('40%')}}>Remove from cart</Text>
                </TouchableOpacity>
            </View>
            }
        />
        </View>
        }
        
    </View>
)};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    section2:{
        flex:1,
    },
    list: {
      flex: 1,
      padding: 10,
      borderColor: 'black',
      borderWidth: 1,
    //   justifyContent: 'center',
      alignItems:'center',
      backgroundColor:"white",
    },
    image:{
        height:wp('20%'),
        width:wp('20%'),
        resizeMode:'stretch'
    },
 
  });