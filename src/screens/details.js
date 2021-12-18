import React, { useEffect, useState } from "react";
import {View,Text,StyleSheet, Alert,Image} from 'react-native';
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { URL } from "../utils/api";
export default function Detail({navigation,route}){
    const id=route.params;
    console.log(id+""+URL);
    const [data,setData]=useState([]);
    const [loading,setLoading]=useState(true);
    const getDetails=async(id)=>{
        try{
            const result=await fetch(URL+"main/item_detail/1/",{
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
        getDetails();
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
        paddingHorizontal:10,
    }
  });