import React, { useState } from 'react';
import {View,StyleSheet,Text,ScrollView, ImageBackground,Dimensions,Image,AsyncStorage,Alert,
         TextInput, TouchableOpacity} from 'react-native';

import { Avatar, Badge, Button, Card } from '@rneui/base';
import  { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase('TunguideApp.db');
export default function ProfileScreen({navigation}){
    //Data from the login screen
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [email,setEmail] = useState('');
    const [userId,setUserId] = useState();
    //New Data from user Edition
    const [newUsername,setNewUsername] = useState('');
    const [newPassword,setNewPassword] = useState('');
    const [newEmail,setNewEmail] = useState('');
    const [password2,setPassword2]=useState('');
    //Desingn input

    const [usernameIconColor,setUsernameIconColor] = useState('#1464F4');
    const [passwordColor,setPasswordIconColor] = useState('#1464F4');
    const [emailIconColor,setEmailIconColor] = useState('#1464F4');
    const [password2IconColor,setPassword2IconColor] = useState('#1464F4');
   
    //hints
    
    const [usernameHint,setUsernameHint]=useState('Enter your username');
    const [passwordHint,setPasswordHint]=useState('Enter your password');
    const [emailHint,setEmailHint] = useState('Enter your email');
    const [password2Hint,setPassword2Hint]=useState('Enter your password again');
    //hint colors
    const [emailHintColor,setEmailHintColor]=useState('#808080');
    const [password2HintColor,setPassword2HintColor]=useState('#808080');
    
    const [usernameHintColor,setUsernameHintColor]=useState('#808080');
    const [passwordHintColor,setPasswordHintColor]=useState('#808080');
    //password lock
    const [passwordLock,setPasswordLock] = useState(true);

    const updateUtilisateur=()=>{
        db.transaction((tx)=>{
            tx.executeSql(
                "UPDATE utilisateur SET username=?, password=?,email=? WHERE userId=?",[newUsername,newPassword,newEmail,userId],()=>{
                    Alert.alert('sucsess',"inserted")},error=>{console.log(error)}
             )
          })
            
                
        }
        const deleteUtilisateur=(title,message)=>{
   
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
                            tx.executeSql("delete from utilisateur where userId="+userId)
                        },alert("Successfully deleted!"))
                    }}
                  ]
              );
        }
    
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


    //Edit profile

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
                { text: "ok", onPress: () => updateUtilisateur()}
              ]
          );
    }
    
    const showPassword = () => {
        if(passwordLock===true)
            setPasswordLock(false);
        else
        setPasswordLock(true);
    }
    const loginHandler=()=>{
        if( (newUsername.length==0) ){
            setUsernameIconColor('red');
            setUsernameHint('Required username !');
            setUsernameHintColor('red');
        }
        if((newPassword.length==0)){
            setPasswordIconColor('red');
            setPasswordHint('Error : Required password !');
            setPasswordHintColor('red');
        }
        if((password2.length==0)){
            setPassword2IconColor('red');
            setPassword2Hint('Error : Required password 2 !');
            setPassword2HintColor('red');
        }
        if(password2!=newPassword){
            setPassword2Hint('Error : Passwords should be the same !');
            setPassword2HintColor('red');
            setPassword2IconColor('red');
        }
        if((newEmail.length==0)){
            setEmailHintColor('red');
            setEmailHint('Error : Required email !');
            setEmailIconColor('red');
        }else if(newEmail.indexOf('@')==-1){
            setEmailHintColor('red');
            setEmailHint('Error : email should contain @...!');
            setEmailIconColor('red');
        }
        
        
        if( (newUsername.length !=0) && (newPassword.length!=0) && (password2==newPassword) && (newEmail.length!=0)){

          insertionErrorAlert('Attention ! '+username,'By clicking ok your informations will be changed in our system !');
          updateUtilisateur
           
                    
             
       
        }
        
    }



 

    return(
        <View style={styles.container}>
        <ScrollView>
            <View style={styles.userInfosSection}>
                <View style={{flexDirection:'row'}}>
                    <Avatar 
                        rounded
                        size={80}
                        source={require('../assets/ava.jpg')}
                     />
                     <View style={{marginTop:15,marginLeft:20}}>
                        <Text style={{fontWeight:'bold',fontSize:20}}>{username}</Text>
                        <Text style={{marginTop:5}}>{email}</Text>
                    
                     </View>
                </View>
            </View>
            <View>

            </View>



            
      
           
                
                
           
                
                   
                    
                        
                        <TouchableOpacity>
                            <View style={styles.form}>
                                <TouchableOpacity>
                                    <Ionicons 
                                    
                                    name='person-circle-outline'  
                                    size={25} style ={{marginRight:10}}
                                    color = {usernameIconColor}
                                   

                                     />  
                                </TouchableOpacity>
                            
                                 <TextInput 
                                 style={{fontSize:18}}
                                
                                    
                                 placeholder={'Username : '+username}
                                 placeholderTextColor={usernameHintColor}
                                 onChangeText={(usernameValue)=>setNewUsername(usernameValue)}
                                
                                 />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <View style={styles.form2}>
                                <TouchableOpacity >
                                    <AntDesign 
                                    name='closecircle'
                                    size={23} style ={{marginRight:10}}
                                    onPress={(usernameVal)=>showPassword(usernameVal)}
                                    color = {passwordColor}
                                 />
                                </TouchableOpacity>
                          
                                <TextInput 
                                style={{fontSize:18}}
                                placeholder={'Old Password : '+password}
                                secureTextEntry={passwordLock}
                                onChangeText={(passwordValue)=>setNewPassword(passwordValue)}
                                placeholderTextColor={passwordHintColor}
                                
                                  />
                                 
                             </View>
                        </TouchableOpacity>         
                        <TouchableOpacity>
                             <View style={styles.form2}>
                                <TouchableOpacity >
                                    <AntDesign 
                                    name='closecircle'
                                    size={23} style ={{marginRight:10}}
                                    onPress={(usernameVal)=>showPassword(usernameVal)}
                                    color = {password2IconColor}
                                 />
                                </TouchableOpacity>
                          
                                <TextInput 
                                style={{fontSize:18}}
                                placeholder={'Password : '+password}
                                secureTextEntry={passwordLock}
                                onChangeText={(password2Value)=>setPassword2(password2Value)}
                                placeholderTextColor={password2HintColor}
                                
                                  />
                                 
                             </View>
                        </TouchableOpacity>     
                        <TouchableOpacity>
                        
                             <View style={styles.form2}>
                                <TouchableOpacity >
                                    <MaterialIcons 
                                    name='email'
                                    size={25} style ={{marginRight:10}}
                                    color = {emailIconColor}
                                 />
                                </TouchableOpacity>
                          
                                <TextInput 
                                style={{fontSize:18}}
                                placeholder={'Email : '+email}
                                onChangeText={(emailValue)=>setNewEmail(emailValue)}
                                placeholderTextColor={emailHintColor}
                                
                                  />
                                 
                             </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>loginHandler()}>
                            <View style={styles.loginButton} >
                                <Text style={{color:'white',fontSize:18,fontWeight:'bold'}}>Edit</Text>
                            </View>
                        </TouchableOpacity>
                       
                        

                        
                        
                        </ScrollView>
                        
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
 


    form : {
        marginTop : '15%',
      
        flexDirection :'row',
        alignItems :'center',
        color : '#4682B4',
        
        paddingVertical : 10,
        justifyContent :'flex-start',
        borderBottomWidth : 1,
        borderBottomColor : 'black'
      
    
    },
    
    form2 : {
        marginTop : 20,
      
        flexDirection :'row',
        alignItems :'center',
        color : '#4682B4',
        
        paddingVertical : 10,
        justifyContent :'flex-start',
        borderBottomWidth : 1,
       borderBottomColor : 'black'
    
    }, 
    loginButton : {
        marginTop : 50,
      
        alignItems:'center',
        borderColor:'#1464F4',
        borderRadius :40,
        padding : 8,
        width: '90%',
        alignSelf :'center',
       backgroundColor : '#1464F4',
       

    },

        
    

})