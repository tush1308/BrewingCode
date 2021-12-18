import React, { useState } from 'react';
import { Text, StyleSheet, View, ImageBackground, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Input from '../components/input';
import PassInput from '../components/passInput';
import { buttonColor,
    buttonTextColor,
    bgColor, } from '../config/color';
const BASE_URL="https://rats-hackathon.herokuapp.com/login-signup"

export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const SignIn=async()=>{
        console.log(BASE_URL+"/login/")
        try{
          const result=await fetch(BASE_URL+"/login/",{
            method:'POST',
            headers:{
              'Content-Type': 'application/json',
              'Accept':'application/json'
            },
            body: JSON.stringify({
              "username": email,
              "password": password,
            }),
          });
          const json= await result.json();
          console.log(json);
        }catch(error){
          console.log("Error: "+error);
        }finally{
            navigation.navigate('Home');
        }
      }

    return (
      <View style={styles.container}>
          <View style={styles.form}>
            <Text style={styles.message}>Welcome Back</Text>
            <View style={{ alignItems: 'center' }}>
              <Input
                placeholder='Username'
                name='email'
                id='email'
                value={email}
                onChangeText={(text) => { setEmail(text) }}
                placeholderTextColor='#393E46'
              />
  
              <PassInput
                placeholder='Password'
                name='password'
                id='password'
                value={password}
                onChangeText={(text) => { setPassword(text) }}
                placeholderTextColor='#393E46'
              />
            </View>
            <View 
            style={{ marginTop: 12, marginLeft: wp('2%') }}
            >
              <TouchableOpacity onPress={() => { }}>
                <Text style={{ color: '#ACACAC', textDecorationLine: 'underline' }}>Forgot your password?</Text>
              </TouchableOpacity>
            </View>
  
            <View style={{marginLeft:5}}>
              <TouchableOpacity style={styles.button}
                onPress={()=>{SignIn()}}
                >
                <Text style={{color:buttonTextColor}}>Login</Text>
              </TouchableOpacity>
            </View>
  
            <TouchableOpacity style={{marginTop:10}} onPress={()=>{navigation.navigate('SignUp')}}>
                <Text style={{color: '#ACACAC', textDecorationLine: 'underline',alignSelf:'center' }}>Don't have an account? Sign Up</Text>
              </TouchableOpacity>
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
      justifyContent: 'center',
      // alignItems:'center'
      backgroundColor:bgColor,
    },
    message: {
      color: 'white',
      fontSize: 24,
      marginBottom: 21,
      alignSelf: 'center'
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