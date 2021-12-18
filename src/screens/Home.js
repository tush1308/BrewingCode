import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {View,Text,StyleSheet, Alert,Image} from 'react-native';
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { buttonColor,
    buttonTextColor,
    bgColor, } from '../config/color';
const url="https://rats-hackathon.herokuapp.com/main/item/";

export default function Home({navigation}){
  const [data,setData]=useState([]);
  const [loading,setLoading]=useState(true);
  const getData=async()=>{
        try{
            const result=await fetch(url,{
                method:'GET',
                headers: {'Authorization': 'token 5f43980f971f33b5f8be85dadfa8ffbb10c2dc09'},
            });
            const json= await result.json();
            console.log(json);
            setData(json);
        }catch(error){
            console.log(error);
            // Alert.alert(error);
        }finally{
            console.log(data);
            setLoading(false);
        }

    }
    useEffect(() => {
        getData();
      }, []);
    return(
        <View style={styles.container}>
            <View style={styles.list}>
                <TouchableOpacity onPress={()=>{getData()}}>
                    <Text>Fetch Items</Text>
                </TouchableOpacity>
                {loading?<Text>Wait</Text>:
                    <FlatList
                      data={data}
                      keyExtractor={({ id }, index) => id}
                      numColumns={1}
                      renderItem={({item,index})=>
                        <TouchableOpacity onPress={()=>{navigation.navigate('Detail',item.item_id)}}>
                            <View style={{backgroundColor:"yellow",width:wp('90%'),flexDirection:'row',marginVertical:10,paddingVertical:10}}>
                            <View style={{marginHorizontal:15,backgroundColor:'pink',justifyContent:'center'}}>
                                <Image style={styles.image}
                                    source={{uri:item.item_image}}
                                />
                            </View>
                            <View style={styles.details}>
                                <Text style={{}}>{item.item_name}</Text>
                                <Text style={{fontSize:20}}>{item.item_brand}</Text>
                                <Text>{item.available_quantity}</Text>
                            </View>
                            <View style={{backgroundColor:'gold',width:wp('30%'),justifyContent:'center',paddingLeft:5,marginHorizontal:5}}>
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
    image:{
        height:90,
        width:90,
        resizeMode:'stretch'
    },
    details:{
        backgroundColor:'orange',
        width:wp('25%'),
        justifyContent:'center',
        paddingLeft:5,
    }
  });