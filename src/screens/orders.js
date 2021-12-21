import React,{useState,useEffect} from "react";
import {View,Text, ActivityIndicator} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL } from "../utils/api";
import { FlatList } from "react-native-gesture-handler";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Orders(){
    const textcol='white';
    // const [data,setData]=useState([]);
    const [filtered,setFiltered]=useState([]);
    const [loading,setLoading]=useState(true);
    const getOrders=async()=>{
        try{
            const token=await AsyncStorage.getItem('token');
            const id=await AsyncStorage.getItem('userid');
            const order=await fetch(URL+"main/order/",{
                method:'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'token '+token},
                
            });
            const json=await order.json();
            // setData(json);
            let filterdata=[];
            let j=0;
            for(let i=0;i<json.length;i++){
                if(json[i].user==Number(id)){
                    filterdata[j]=json[i];
                    j++;
                }
            }
            setFiltered(filterdata);
            console.log(filterdata);
        }catch(e){
            console.log(e);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        getOrders();
      }, []);

    return(
    <View>
        <View style={{margin:10,flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{fontSize:22}}>Order Id</Text>
        <Text style={{fontSize:22}}>Bill Amount</Text>
        </View>
        {loading?<ActivityIndicator/>:
        <FlatList
        data={filtered}
        keyExtractor={({ id }, index) => id}
        // numColumns={3}
        renderItem={({item,index})=>
        <View style={{marginVertical:10,backgroundColor:'#5F85DB'}}>
            <View style={{margin:10,flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{fontSize:22,color:textcol}}>{item.order_id}</Text>
                <Text style={{fontSize:22,color:textcol}}>{item.total_bill}</Text>
            </View>
            <Text style={{fontSize:22,marginHorizontal:10,width:wp('90%'),color:textcol}}>{item.address}</Text>
        </View>
        }
    />
        }
    </View>
    )
};