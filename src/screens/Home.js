import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {View,Text,StyleSheet, Alert,Image,Button, ActivityIndicator} from 'react-native';
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { buttonColor,buttonTextColor,bgColor, } from '../config/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
const url="https://rats-hackathon.herokuapp.com/main/item/";
import { URL } from "../utils/api";
export default function Home({navigation}){
  const [data,setData]=useState([]);
  const [loading,setLoading]=useState(true);
  const [token,setToken]= useState("");
  const [tloading,setTloading]=useState(true);  //for fetching item type details
  const [types,setTypes]=useState([]);
  const [userId,setUserId]=useState("");
  const [pincode,setPincode]=useState("");
  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      const uid = await AsyncStorage.getItem('userid');
      const pincode = await AsyncStorage.getItem('pincode');
      setUserId(uid);
      setToken(value);
      setPincode(pincode);
      getData(value);
      console.log(uid)
      getTypes(value);
    // console.log(value);
    } catch(e) {
      console.log(e);
    }
  }

  const getData=async(token)=>{
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
            // Alert.alert(error);
        }finally{
            
            // console.log("Done");
            // console.log(data);
            setLoading(false);
        }

    }
    
    const getTypes=async(token)=>{
        try{
            const types=await fetch(URL+"main/item_type/",{
                method:'GET',
                headers: {'Authorization': 'token '+token},
            });
            const type=await types.json();
            console.log(type);
            setTypes(type);
        }catch(e){
            console.log("Error"+e);
        }finally{
            setTloading(false);
        }
    }

    useEffect(() => {
        getToken();
      }, []);
    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>{navigation.navigate('Logout')}}>
                <Text>Logout</Text>
            </TouchableOpacity>
            <View style={styles.section2}>
                {tloading?<ActivityIndicator/>:
                <FlatList
                    data={types}
                    keyExtractor={({ id }, index) => id}
                    horizontal={true}
                    renderItem={({item,index})=>
                    <TouchableOpacity onPress={()=>{
                        
                        }}>
                    <View style={{margin:10}}>
                        <Text style={{fontSize:20}}>{item.item_category}</Text>
                    </View>
                    </TouchableOpacity>
                    }
                />
                }
            </View>
            <View style={styles.list}>
                {loading?<ActivityIndicator/>:
                    <FlatList
                      data={data}
                      keyExtractor={({ id }, index) => id}
                      numColumns={1}
                      renderItem={({item,index})=>
                        <TouchableOpacity onPress={()=>{
                            navigation.navigate('Detail',{info:{
                                id:item.item_id,
                                token:"token "+token,
                                uid:userId,
                                pincode:pincode,
                            }})
                            }}>
                        <View style={styles.card}>
                            <View style={styles.imageView}>
                                <Image style={styles.image}
                                    source={{uri:item.item_image}}
                                />
                            </View>
                            <View style={styles.details}>
                                <Text style={{fontSize:16}}>{item.item_name}</Text>
                                <Text style={{fontSize:14}}>{item.item_brand}</Text>
                            </View>
                            <View style={styles.price}>
                                <Text>Quantity: {item.available_quantity}</Text>
                                <Text>Price:{item.item_price}</Text>
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
        // flex:0.2,
        alignItems:'center'
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
        height:wp('25%'),
        width:wp('25%'),
        resizeMode:'stretch',
        borderRadius:15,
    },
    details:{
        backgroundColor:'orange',
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