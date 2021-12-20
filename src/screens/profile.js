import React,{useState,useEffect} from "react";
import {View,Text,StyleSheet} from 'react-native';
import { TextInput } from "react-native-gesture-handler";
import { bgColor,buttonColor } from "../config/color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {BASE_URL} from '../utils/api'
export default function Profile(){
    const [loading,setLoading]=useState(true);
    const [text, onChangeText] = React.useState("Useless Text");

    const getId = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
          const uid = await AsyncStorage.getItem('userid');
          console.log(uid);
          getProfile(uid,token);
        } catch(e) {
          console.log(e);
        }
      }


    const getProfile=async(id,token)=>{
        try{
            const result=await fetch(BASE_URL+'/users/'+id+'/',{
                method:'GET',
                headers: {'Authorization': 'token '+token},
            });
            const json= await result.json();
            console.log(json);
            setData(json);
        }catch(error){
            console.log(error);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        getId();
      }, []);
    return(
        <View style={styles.container}>
            <View style={styles.form}>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
            />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    form: {
      flex: 1,
      padding: 10,
      borderColor: 'black',
      borderWidth: 1,
    //   justifyContent: 'center',
      alignItems:'center',
      backgroundColor:'yellow',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    button: {
      marginTop:36,
      height:46,
      alignItems: "center",
      backgroundColor: buttonColor,
      paddingVertical:12,
      borderRadius:8,
      width:326,
    },
  });