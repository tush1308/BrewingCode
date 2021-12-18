import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const PassInput = (props) => {
    const [visible, setVisible] = useState(false);

    return (
        <View style={styles.passinput}>
            <TextInput style={styles.textInput}
                placeholder={props.placeholder}
                name={props.name}
                id={props.id}
                value={props.value}
                onChangeText={props.onChangeText}
                secureTextEntry={!visible}
                placeholderTextColor={props.placeholderTextColor}
            />
            <TouchableOpacity activeOpacity={0.5} onPress={() => {
                setVisible(!visible);
            }}>
                {/* <MaterialIcons name={visible ? "visibility" : "visibility-off"} size={25} color= "#393E46"/> */}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {
        width: 272,
        // height:20,
        top: 5.5,
        backgroundColor: '#FFFFFF',
        fontSize: 15,
        paddingTop: 8.7,
        marginBottom: 14,
        color: 'black'
    },
    passinput: {
        height: 60,
        width: 326,
        backgroundColor: '#FFFFFF',
        paddingRight: 16,
        paddingLeft: 14,
        borderRadius: 4,
        alignItems: 'center',
        flexDirection: 'row',
        paddingbottom: 14,
        marginTop:16,
    }
})

export default PassInput;