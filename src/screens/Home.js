import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {View,Text,StyleSheet, Alert,Image} from 'react-native';
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { buttonColor,buttonTextColor,bgColor, } from '../config/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
const url="https://rats-hackathon.herokuapp.com/main/item/";

export default function Home({navigation}){
  const [data,setData]=useState([]);
  const [loading,setLoading]=useState(true);
  const [token,setToken]= useState("");

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if(value !== null) {
        setToken('token '+value);
        // console.log(value);
        setLoading(false);
        getData('token '+value);
      }
    } catch(e) {
      console.log(e);
    }
  }

  const getData=async(token)=>{
        setLoading(true);
        try{
            const result=await fetch(url,{
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
            console.log("Done");
            setLoading(false);
        }

    }
  

    useEffect(() => {
        // getData();
        getToken();
      }, []);
    return(
        <View style={styles.container}>
            <Text style={{fontSize:30}}>{token}</Text>
            <View style={styles.list}>
                {loading?<Text>Wait</Text>:
                    <FlatList
                      data={data}
                      keyExtractor={({ id }, index) => id}
                      numColumns={1}
                      renderItem={({item,index})=>
                        <TouchableOpacity onPress={()=>{
                            navigation.navigate('Detail',{info:{
                                id:item.item_id,
                                token:token,
                            }})
                            }}>
                        <View style={styles.card}>
                            <View style={styles.imageView}>
                                <Image style={styles.image}
                                    source={{uri:item.item_image}}
                                />
                            </View>
                            <View style={styles.details}>
                                <Text style={{fontSize:18}}>{item.item_name}</Text>
                                <Text style={{fontSize:18}}>{item.item_brand}</Text>
                            </View>
                            <View style={styles.price}>
                                <Text>Quantity: {item.available_quantity}</Text>
                                <Text>Price: {item.item_price}</Text>
                            </View>
                        </View>
                        </TouchableOpacity>
                    }
                    />
                }
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
      justifyContent: 'center',
      alignItems:'center',
      backgroundColor:"white",
    },
    imageView:{
        marginHorizontal:15,
        // backgroundColor:'pink',
        justifyContent:'center',
    },
    image:{
        height:wp('27%'),
        width:wp('27%'),
        resizeMode:'stretch',
        borderRadius:15,
    },
    details:{
        // backgroundColor:'orange',
        width:wp('25%'),
        justifyContent:'center',
        paddingLeft:5,
    },
    card:{
        backgroundColor:"yellow",
        width:wp('90%'),
        flexDirection:'row',
        marginVertical:10,
        paddingVertical:10,
        borderRadius:7,
    },
    price:{
        // backgroundColor:'gold',
        width:wp('30%'),
        justifyContent:'center',
        paddingLeft:5,
        marginHorizontal:5,
    },
  });