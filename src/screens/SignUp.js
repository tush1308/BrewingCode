import React, { useState } from 'react';
import { Text, StyleSheet, View, ImageBackground, TouchableOpacity } from 'react-native';
// import { SocialIcon } from 'react-native-elements';
import Input from '../components/input';
import PassInput from '../components/passInput';
import { buttonColor,
    buttonTextColor,
    bgColor, } from '../config/color';
import { TextInput } from 'react-native-gesture-handler';

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname,setFname]=useState("");
  const [lname,setLname]=useState("");
  
  return (
    <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.message}>Create your account</Text>
          <View style={{ alignItems: 'center' }}>
            <View style={{flexDirection:'row'}}>
                <View style={styles.input}>
                    <TextInput style={styles.textInput}
                        placeholder='Fist Name'
                        name='fname'
                        id='fname'
                        value={fname}
                        onChangeText={(text)=>{setFname(text)}}
                        placeholderTextColor='#393E46'
                    />
                </View>
                <View>
                    <Text>      </Text>
                </View>
                <View style={styles.input}>
                    <TextInput style={styles.textInput}
                        placeholder='Last Name'
                        name='lname'
                        id='lname'
                        value={lname}
                        onChangeText={(text)=>{setLname(text)}}
                        placeholderTextColor='#393E46'
                    />
                </View>
                
            </View>
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

          <View style={{marginLeft:5}}>
            <TouchableOpacity style={styles.button} onPress={()=>{}}> 
              <Text style={{color:buttonTextColor}}>SignUp</Text>
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
  form: {
    flex: 1,
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    // alignItems:'center'
    backgroundColor:bgColor,
  },
  textInput:{
    width:145,
    // height:20,
    top:5.5,
    backgroundColor:'#FFFFFF',
    fontSize:15,
    paddingTop:8.7,
    marginBottom:14,
    color:'black',
},
   input:{
    height:60,
    width:150,
    marginTop:8,
    backgroundColor:'#FFFFFF',
    paddingRight:16,
    paddingLeft:14,
    borderRadius:4,
    alignItems:'center',
    // marginBottom:16,
    paddingbottom:14,
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