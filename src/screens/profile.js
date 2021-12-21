import React,{useState,useEffect} from "react";
import {View,Text,StyleSheet} from 'react-native';
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { bgColor,buttonColor } from "../config/color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {BASE_URL} from '../utils/api'
export default function Profile(){
    const [loading,setLoading]=useState(true);
    const [fname, setFname] = React.useState(" ");
    const [lname, setLname] = React.useState(" ");
    const [loc, setLoc] = React.useState(" ");
    const [data,setData]=useState([]);
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
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={{color:'white'}}>First Name</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(text)=>setName(text)}
                  defaultValue={data.first_name}
                />
              </View>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={{color:'white'}}>Last Name</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(text)=>setLname(text)}
                  defaultValue={data.last_name}
                />
              </View>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={{color:'white'}}>Business Location:</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(text)=>setLoc(text)}
                  defaultValue={data.business_location}
                />
              </View>
              <TouchableOpacity style={{alignSelf:'center',marginTop:25,borderRadius:5,backgroundColor:'#034c52',padding:10}}>
                <Text style={{fontSize:22,color:'white'}}>Update</Text>
              </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#5F85DB',
      
    },
    form: {
      flex: 1,
      padding: 50,
      borderColor: 'black',
      borderWidth: 1,
      // justifyContent: 'center',
      // alignItems:'center',
      marginHorizontal:10,
      
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        color:'white',
        borderColor:'white',
        backgroundColor:'#26282B',
        // minWidth:'40'
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