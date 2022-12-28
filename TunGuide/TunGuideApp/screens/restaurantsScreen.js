import React, { useEffect, useState } from 'react';
import {View,StyleSheet,Text,ScrollView, ImageBackground,Dimensions,Image,SafeAreaView,Button,Alert,AsyncStorage,Linking,
         TextInput, TouchableOpacity, Animated} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Avatar, Badge, Card } from '@rneui/base';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import  { Ionicons } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite';
import Communications from 'react-native-communications';
import { add } from 'react-native-reanimated';



const db = SQLite.openDatabase('TunguideApp.db');
export default function restaurantScreen({route,navigation}){   
    
    db.transaction((tx)=>{
        tx.executeSql(
            "SELECT * FROM destinationPrefere where userId="+userId+" and destinationId="+destinationId+" ",[],((tx,results)=>{
                    var len= results.rows.length;
                   var long= Number(len);
                    if(len>0){
                        setHeartName('favorite')
                        setHeartColor('blue')
                    }
            })
        )
      })

    const[destination,setDestination]=useState(null);
    const [currentLocation, setCurrentLocation] = React.useState(null);
    let adresse="ADRESSE >";
    let phoneNum=destination?.Téléphone;
    
    const url='tel:'+phoneNum;
    useEffect(()=>{
         let {item,currentLocation}=route.params;
         setDestination(item);
         setCurrentLocation(currentLocation)
    })
    const destinationId=destination?.id;
     //Data from the login screen
     const [username,setUsername] = useState('');
     const [password,setPassword] = useState('');
     const [email,setEmail] = useState('');
     const [userId,setUserId] = useState();
     const [heartColor,setHeartColor] = useState('black');
     const [heartName,setHeartName] = useState('favorite-outline');

     
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

    const pics = [
        {
            id : 0,
              icon: destination?.photo, 
            
          },
        {
          id : 1,
            icon: destination?.photo1, 
          
        },
        {
            id : 2,
              icon: destination?.photo2, 
            
          },
          {
            id : 3,
              icon: destination?.photo3, 
            
          },

    ]
    readStorage();

    const insertionErrorAlert=(title,message)=>{
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
                        tx.executeSql("delete from destinationPrefere where userId="+userId+" and destinationId="+destinationId+"")
                    },alert("Successfully deleted!"))
                }}
              ]
          );
    }
    const insertionAlert=(title,message)=>{
        Alert.alert(
            title,
            message,
            [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                { text: "My destinations",  onPress : () => {navigation.navigate("Favorite")} }
              ]
          );
    }
    
    
    const addFav=()=>{
        setHeartName('favorite')
        setHeartColor('blue')
        db.transaction((tx)=>{
            tx.executeSql(
                "SELECT * FROM destinationPrefere where userId="+userId+" and destinationId="+destinationId+" ",[],((tx,results)=>{
                        var len= results.rows.length;
                       var long= Number(len);
                        if(len>0){
                            
                            insertionErrorAlert("Adding Error","This destination already added, want to delete? press delete !");
                        }else{
                            db.transaction(tx => {
                                tx.executeSql(
                                     "insert into destinationPrefere(userId,destinationId) values ("+userId+","+destinationId+" )"
                                )
                                insertionAlert("Successfully added !","This destination is added to your favourite destinations")
                              })
                            
                        }
                })
            )
          })
        
    }
    

    function renderHeader(){
        return (
            <View  style={{flexDirection :'row',height: 50}}>
                <TouchableOpacity style={{width: 35,justifyContent : 'center'}} onPress={()=>{navigation.navigate('appHome')}}>
                <Ionicons name="md-chevron-back-sharp" size={50}  />
                </TouchableOpacity>
                
                <View style={{flex: 1,alignItems:'center',justifyContent :'center'}}>
                    <View style={{width:'70%',height :'100%',backgroundColor :'#E6E6E6',alignItems:'center',justifyContent:'center',borderRadius:30}}>
                        <Text style={{fontSize:20,fontWeight:'bold'}}>{destination?.name}</Text>
                    </View>
                </View>
                <TouchableOpacity style={{width:50,justifyContent:'center'}} onPress={()=>{addFav()}}>
                <MaterialIcons name={heartName} size={35} color={heartColor} />

                </TouchableOpacity>
            </View>
        )   
    }

    function renderInfos(){
        return(
        <View>

        
        
            <FlatList 
                style={{marginTop:'8%'}}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={pics}
                renderItem={ ({item})=>(

                  <View>

                    <Image rounded source={item.icon} resizeMode='cover'  style={{width: Dimensions.get('window').width,height : Dimensions.get('window').height /2.5,borderRadius:10,marginRight:5}} />
                            <View
                            style={{shadowColor:'gray',shadowOpacity:100,shadowRadius:50,position:'absolute',bottom:0,height:50,width:100,backgroundColor:'white',borderTopRightRadius:20,alignItems:'center',justifyContent:'center'}}>
                                
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                        <AntDesign name="star" size={24} color="#1464F4" />
                        <Text style={{fontSize:24,marginLeft:4,color:'#1464F4'}}>{destination?.rating}</Text>

                        </View>
                          
                            </View>
                  </View>
            
        
            )} 
       
                
            />
           
                <View style={{marginTop:"2%",alignItems:'center',paddingHorizontal:'5%'}}>
                    <TouchableOpacity onPress={()=>{Linking.openURL(url)}}>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                            <Entypo name="old-phone" size={30} color="black" />
                            <Text style={{fontSize:30, fontWeight:'bold',marginLeft:'2%'}}>{destination?.Téléphone}</Text>

                        </View>
                    </TouchableOpacity>
                 
                    
                        <Text style={{marginTop:'2%',fontStyle:'italic',fontSize:20}} >{destination?.libelle}</Text>
                    
                 
                     </View>
                     <TouchableOpacity onPress={()=>{navigation.navigate('location', {
                        destination : destination,
                        currentLocation: currentLocation
                        
                     })}}>
                            <View style={{      marginTop : '10%',
                                marginBottom:'10%',

      
                                     alignItems:'center',
                                    borderColor:'#1464F4',
                                     borderRadius :40,
                                 padding : 8,
                                        width: '90%',
                                         alignSelf :'center',
                                         backgroundColor : '#1464F4',
                                                 }} >
                                <Text style={{color:'white',fontSize:18,fontWeight:'bold'}} >{adresse}</Text>
                            </View>
                        </TouchableOpacity>

                
            
        </View>
                    
        )
            
        
    }

    return(
        <SafeAreaView style={styles.container}>
            {renderHeader()}
           <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}}>
           {renderInfos()}
           </ScrollView>
            
          
          
         
        </SafeAreaView>
    )

}
const styles=StyleSheet.create({

    container : {
        flex : 1,
        backgroundColor : 'lightGray',
       paddingHorizontal :'2%',
       paddingTop :'7%'
      
        
    }
})