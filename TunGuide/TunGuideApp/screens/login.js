import React, { useEffect, useState } from 'react';
import {View,StyleSheet,Text,ScrollView, ImageBackground,Dimensions,
         TextInput, TouchableOpacity,Alert,AsyncStorage} from 'react-native';
        
import  { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import * as SQLite from 'expo-sqlite';
import { Button } from '@rneui/base';


const db = SQLite.openDatabase('TunguideApp.db');



export default function login({ navigation }){

    db.transaction((tx)=>{
        tx.executeSql(
            "CREATE TABLE if not exists destination(destinationId integer primary key autoincrement,nameDest varchar(50),ratingDest varchar(20),adresseDest varchar(50),telephoneDest varchar(20),libelleDest varchar(50),idCat integer,  FOREIGN KEY(idCat) REFERENCES categorie(idCat))"
            )
    })
    
    
    
    

  

  
    const [passwordLock,setPasswordLock] = useState(true);
    const [username,setUserName] = useState('');
    const [password,setPassWord] = useState('');
    const [usernameIconColor,setUsernameIconColor] = useState('#1464F4');
    const [passwordColor,setPasswordIconColor] = useState('#1464F4');
    const [usernameHint,setUsernameHint]=useState('Enter your username');
    const [passwordHint,setPasswordHint]=useState('Enter your password');
    const [usernameHintColor,setUsernameHintColor]=useState('black');
    const [passwordHintColor,setPasswordHintColor]=useState('black');
    const [theUser,setTheUser]=useState([
        {userUsername:'',userPassword:'',userEmail:'',key :null}
    ])

   
    
    const userInfos=()=>{
        db.transaction((tx)=>{
            tx.executeSql(
                "SELECT username,password,email,userId FROM utilisateur where username='"+username+"' and password='"+password+"' ",[],((tx,results)=>{
                        var len= results.rows.length;
                        var long= Number(len);
                        theUser[0].userUsername=results.rows.item(0).username;
                        theUser[0].userPassword= results.rows.item(0).password
                        theUser[0].userEmail= results.rows.item(0).email;
                        theUser[0].key= results.rows.item(0).userId;
                       
                        if(len>0){
                            
                         

                            

                            const saveData = async (key,value) => {
                                try {
                                  await AsyncStorage.setItem(key, JSON.stringify(value));
                          
                                } catch (error) {
                                  alert('saving data error');
                                }
                              };
                              
                            const  saveStorage=()=>{
                                saveData("user", {newUsername : theUser[0].userUsername,newPassword : theUser[0].userPassword,newEmail :theUser[0].userEmail,newId:theUser[0].key  });
                            }

                            saveStorage();
                            navigation.navigate('Dashboard',theUser[0]);
                            
                        }
                      
                })
            )
          })
    }

    const insertionErrorAlert=(title,message)=>{
        Alert.alert(
            title,
            message,
            [
              {
                text: "Cancel",
                style: "cancel"
              },
              { text: "OK" }
            ]
          );
    }
    const isValidPassword=()=>{
        db.transaction((tx)=>{
            tx.executeSql(
                "SELECT password FROM utilisateur where username='"+username+"'",[],((tx,results)=>{
                        var len= results.rows.length;
                       var long= Number(len);
                       var realPassword=results.rows.item(0).password;
                       if(realPassword!=password){
                        insertionErrorAlert("Password Error ","The password of this user is incorrect ! ")
                       }
                       
                })
            )
          })
    }

    const inscription=()=>{
        db.transaction((tx)=>{
            tx.executeSql(
                "SELECT username FROM utilisateur where username='"+username+"' and password='"+password+"' ",[],((tx,results)=>{
                        var len= results.rows.length;
                       var long= Number(len);
                        if(len>0){
                                userInfos();
                            /*navigation.navigate('Dashboard');*/
                        }
                        if(len==0){
                            insertionErrorAlert("User Error","Cant find this user")
                        }
                        else{
                            isValidPassword();
                            
                        }
                })
            )
          })}


    
    const showPassword = () => {
        if(passwordLock===true)
            setPasswordLock(false);
        else
        setPasswordLock(true);
    }
    const loginHandler=()=>{
        if( (username.length==0) ){
            setUsernameIconColor('red');
            setUsernameHint('Required username !');
            setUsernameHintColor('red');
        }
        if((password.length==0)){
            setPasswordIconColor('red');
            setPasswordHint('Required password !');
            setPasswordHintColor('red');
        }
        if( (username.length !=0) && (password.length!=0) ){
            
           inscription();
           
        }

        
    }




   
    return(
     
            <ScrollView 
            /*start Containerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr*/
                style={styles.scroll}
                >
               
               
                
                <ImageBackground 
                style={styles.imageStyle}
                source={require('../assets/backImg.png') }>
                </ImageBackground>
            
                <View style={styles.bottomView}>
                
                    <View style={{padding:40}}>
                   
                         <Text style={{color : 'black',fontSize: 34}}>TunGuideApp</Text>
                         <TouchableOpacity onPress={()=>{navigation.navigate('Inscription')}}>
                         <Text style={{color:'#808080'}} >Don't have an account? 
                             <Text style={{fontStyle: 'italic',color:'#1464F4'}}  >
                                Register now
                                </Text>
                         </Text>
                         </TouchableOpacity>
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
                                 style={{fontSize:15}}
                                 placeholder={usernameHint}
                                 placeholderTextColor={usernameHintColor}
                                 onChangeText={(usernameValue)=>setUserName(usernameValue)}
                                
                                 />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <View style={styles.form2}>
                                <TouchableOpacity >
                                    <AntDesign 
                                    name='closecircle'
                                    size={25} style ={{marginRight:10}}
                                    onPress={(usernameVal)=>showPassword(usernameVal)}
                                    color = {passwordColor}
                                 />
                            </TouchableOpacity>
                          
                            <TextInput 
                                style={{fontSize:15}}
                                 placeholder={passwordHint}
                                secureTextEntry={passwordLock}
                                onChangeText={(passwordValue)=>setPassWord(passwordValue)}
                                placeholderTextColor={passwordHintColor}
                            
                                  />
                             </View>
                             <TouchableOpacity style={styles.forgetPassword} onPress={()=>{navigation.navigate('ForgetPassword')}}>
                                <Text style={{color :'#808080'}}>Forget your password? 
                                <Text style={{fontStyle: 'italic',color:'#1464F4'}}  >
                                Backup now!
                                </Text>
                                </Text>
                            </TouchableOpacity>

                             
                         

                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>loginHandler()}>
                            <View style={styles.loginButton} >
                                <Text style={{color:'white',fontSize:18,fontWeight:'bold'}}>LOGIN</Text>
                            </View>
                        </TouchableOpacity>
                        
                        
                    </View>
               
                </View>
            
            {/* END CONTAINERRRR*/}
            </ScrollView>

      
      
    )
}
const styles = StyleSheet.create({
    scroll : {
        flex :1,
        backgroundColor :'white'
    },
    imageStyle : {
        height : Dimensions.get('window').height /2
    },
    bottomView : {
        flex :1,
        backgroundColor: 'white',
        bottom : 50,
        borderTopStartRadius : 50,
        borderTopEndRadius : 60

    },
   
    form : {
        marginTop : 50,
      
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
    forgetPassword: {
        marginTop:10
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
 
        
    

    
    
 
  
    
});
