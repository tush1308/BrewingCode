import React, { useEffect, useState } from "react";
import {View,Text,StyleSheet, Alert,Image} from 'react-native';
import { FlatList, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { URL } from "../utils/api";
export default function Detail({navigation,route}){
    
    const {info}=route.params;
    const id=info.id;
    const uid=info.uid;
    // console.log(uid);
    const token=info.token;
    // console.log(token);
    const [data,setData]=useState([]);
    const [loading,setLoading]=useState(true);
    const [buy,setBuy]=useState(false);
    const [quantity,setQuantity]=useState(0);

    const getDetails=async(id,token)=>{
        try{
            const result=await fetch(URL+"main/item_detail/"+id+"/",{
                method:'GET',
                headers: {'Authorization': token},
            });
            const json= await result.json();
            // console.log(json);
            setData(json);
        }catch(error){
            console.log(error);
            // Alert.alert(error);
        }finally{
            // console.log(data);
            setLoading(false);
        }
    }
    const postReq=async()=>{
        try{
            const response=await fetch(URL+"main/ordered_item/",{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token},
            body:JSON.stringify({
                "quantity":quantity,
                "cart_item":Number(id),
                "created_by":Number(uid),
            })
            
        });
        const json=await response.json();
        console.log(json);
        }catch(error){
            console.log(error);
        }
    }
    useEffect(() => {
        getDetails(id,token);
      }, []);
    return(
        <View style={styles.container}>
            <View style={styles.list}>
                <View style={{backgroundColor:"yellow",width:wp('90%'),flexDirection:'row',marginVertical:10,paddingVertical:10,justifyContent:'center'}}>
                    <Image style={styles.image} source={{uri:data.item_image}}/>
                </View>
                <View style={styles.details}>
                    <Text style={{fontSize:30}}>{data.item_name}  </Text>
                    <Text style={{fontSize:25}}>{data.item_brand}</Text>
                </View>
                <View style={styles.details}>
                    <Text style={{fontSize:20}}>Rs. {data.item_price}</Text>
                </View>
                <View style={{flexDirection:'row',backgroundColor:'yellow',alignItems:'center'}}>
                    <Text>Enter the quantity: </Text>
                    <TextInput style={styles.textInput}
                        onChangeText={(text)=>{setQuantity(text);
                        console.log(text);}}
                    />
                    <TouchableOpacity onPress={()=>{postReq()}}>
                        <Text style={{fontSize:20}}>Buy</Text>
                </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

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
        height:wp('50%'),
        width:wp('80%'),
        resizeMode:'stretch'
    },
    details:{
        backgroundColor:'orange',
        width:wp('90%'),
        justifyContent:'space-between',
        paddingLeft:5,
        flexDirection:'row',
        alignItems:'center',
        padding:10,
    },
    textInput:{
        width:50,
        // height:20,
        top:5.5,
        backgroundColor:'#FFFFFF',
        fontSize:15,
        paddingTop:8.7,
        marginBottom:14,
        marginRight:10,
        color:'black',
    },
  });