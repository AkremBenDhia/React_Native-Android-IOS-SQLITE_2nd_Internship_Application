import React, { useState } from 'react';
import {View,StyleSheet,Text,ScrollView, ImageBackground,Dimensions,Image,AsyncStorage,Alert,FlatList,Linking,
         TextInput, TouchableOpacity} from 'react-native';

import { Avatar, Badge, Button, Card } from '@rneui/base';
import  { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import * as SQLite from 'expo-sqlite';

import { style } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import { call } from 'react-native-reanimated';


const db = SQLite.openDatabase('TunguideApp.db');
export default function ProfileScreen({navigation}){
    //User Data coming from the login screen
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [email,setEmail] = useState('');
    const [userId,setUserId] = useState();
    const [data,setData]= useState();
    //
    const [deleteIconName,setDeleteIconName] = useState('trash-outline');
    const [deleteIconColor,deleteIconCoor]= useState('red');
    

   
    const read = async (key) => {
        try {
          const value = await AsyncStorage.getItem(key);
          if (value !== null) {
            // We have data!!
            return value;
          }else{
            alert('Importing data error');
          }
        } catch (error) {
            alert('Importing data error');
        }
      };
    const readStorage = ()=>{
        read('user').then(result=>{
            const jsonObject = JSON.parse(result);
            var theUsername= jsonObject.newUsername.toString();
            var thePassword= jsonObject.newPassword.toString();

            var theEmail= jsonObject.newEmail.toString();
            var theUserId= jsonObject.newId.toString();
            var id = parseInt(theUserId);
            setUsername(theUsername);
            setPassword(thePassword);
            setEmail(theEmail);
            setUserId(id);
           
    

        })
    }
    readStorage();
db.transaction((tx)=>{
    tx.executeSql(
        "SELECT idDestPrefere,nameDest,ratingDest,adresseDest,telephoneDest,libelleDest,idCat from destinationPrefere dp , destination d WHERE dp.destinationid = d.destinationId and dp.userId="+userId+"  ",[],((tx,results)=>{
                var len= results.rows.length;
                
              let resulltat=[]
               for(let i=0;i<len;i++){
                    let item=results.rows.item(i);
               resulltat.push({
                destId: item.idDestPrefere,
                name: item.nameDest,
                rating: item.ratingDest,
                categories: item.idCat,
                adresse: item.adresseDest,
                libelle: item.libelleDest,
                Téléphone : item.telephoneDest,
               })

               }
               setData(resulltat)
                
        })
        
    )



})

    
const deleteFav=(title,message,id)=>{
   
    Alert.alert(
        title,
        message,
        [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "delete", onPress : ()=>{
                db.transaction((tx)=>{
                    tx.executeSql("delete from destinationPrefere where idDestPrefere="+id+"")
                },alert("Successfully deleted!"))
            }}
          ]
      );
}


const call=(number)=>{
    
   
    const url='tel:'+number;
    Linking.openURL(url)

}
    




    return(
       <View style={styles.container}>
       
       <FlatList 
                    style={{marginTop:'2%'}}
                
                    showsVerticalScrollIndicator={false}
                    data={data}
                    renderItem={ ({item})=>(
                       
                        
                        <TouchableOpacity
                            
                    
                            style={{marginTop:'5%'}}>
                            
                            
                        <View style={styles.list}>
                                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                    <Text style={styles.name}>{item.name}</Text>
                                    
                                    <TouchableOpacity onPress={()=>{deleteFav("Delete item",username+" sure you want to delete this destination from favorite?",item.destId)}}>
                                        <Ionicons name={deleteIconName} size={35} color="red" />
                                    </TouchableOpacity>
                                    
                                </View>

                            <Text style={{marginTop:4,fontStyle:'italic'}}>{item.libelle}</Text>


                            <TouchableOpacity style={{marginTop:20}}>
                                <View style={{flexDirection:'row',borderRadius:20,backgroundColor:'#DCDCDC'}}>
                                    
                                    <Ionicons name="location-outline" size={25} color="black" />
                                
                                    <Text style={{fontSize:15,color:'black'}}>{item.adresse}</Text>
                               
                                </View>
                            </TouchableOpacity>


                            
                            <TouchableOpacity onPress={()=>{call(item.Téléphone)}}>
                                <View style={{flexDirection:'row',justifyContent:'center',marginTop:12,justifyContent:'flex-end'}}>
                                    
                                    <Ionicons name="call-outline" size={25} color="#1464F4" />
                                
                                    <Text style={{fontSize:20,color:'#696969',marginLeft:4}}>{item.Téléphone}</Text>
                               
                                </View>
                            </TouchableOpacity>

                                    




                        </View>

            
                            
                

                            
                           
                        </TouchableOpacity>
                       
                       
                        
                
            
                    )} 
           
                    
                />
       </View>
     
    )
}
const styles = StyleSheet.create({
    container : {
        flex : 1,
        padding : '7%'
    },
    userInfosSection : {
        paddingTop :'5%'
        
    },
    scroll : {
        flex :1,
       
    },
    list : {
        borderWidth:3,
        borderTopColor:'gray',
        borderLeftColor:'gray',
        borderRightColor:'gray',
        borderBottomColor:'gray',
        borderRadius:30,
        paddingHorizontal:20,
        paddingVertical:20,
        marginTop:15,
       
       
    
    },
    name : {
       
        fontWeight:'bold',
        fontSize : 25,
        color:'black'
        
    }
 


  
        
    

})