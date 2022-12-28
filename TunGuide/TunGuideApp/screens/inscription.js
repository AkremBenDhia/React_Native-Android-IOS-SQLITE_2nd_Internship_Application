import React, { useState } from 'react';
import {View,StyleSheet,Text,ScrollView, ImageBackground,Dimensions,
         TextInput, TouchableOpacity,Alert} from 'react-native';
import  { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { MaterialIcons } from '@expo/vector-icons'; 
import * as SQLite from 'expo-sqlite';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { Button } from 'react-native-paper';





const db = SQLite.openDatabase('TunguideApp.db');
db.transaction((tx)=>{
    tx.executeSql(
        "create table if not exists utilisateur (userId integer primary key autoincrement,username varchar(20),password varchar(20),email varchar(20))"
        )
})


export default function inscription({ navigation }){
   
  
 
    
    const [passwordLock,setPasswordLock] = useState(true);
    const [username,setUserName] = useState('');
    const [password,setPassWord] = useState('');
    const [password2,setPassword2]=useState('');
    const [email,setEmail]=useState('');

    const [usernameIconColor,setUsernameIconColor] = useState('#1464F4');
    const [passwordColor,setPasswordIconColor] = useState('#1464F4');
    const [emailIconColor,setEmailIconColor] = useState('#1464F4');
    const [password2IconColor,setPassword2IconColor] = useState('#1464F4');

    const [usernameHint,setUsernameHint]=useState('Enter your username');
    const [passwordHint,setPasswordHint]=useState('Enter your password');
    const [emailHint,setEmailHint] = useState('Enter your email');
    const [password2Hint,setPassword2Hint]=useState('Enter your password again');
    const [emailHintColor,setEmailHintColor]=useState('#808080');
    const [password2HintColor,setPassword2HintColor]=useState('#808080');
    
    const [usernameHintColor,setUsernameHintColor]=useState('#808080');
    const [passwordHintColor,setPasswordHintColor]=useState('#808080');
    
    const register=()=>{
        db.transaction((tx)=>{
            tx.executeSql(
                "SELECT username FROM utilisateur where email='"+email+"' ",[],((tx,results)=>{
                        var len= results.rows.length;
                       var long= Number(len);
                        if(len>0){
                            insertionErrorAlert("Inscription Error","This user already exist");
                        }else{
                            db.transaction(tx => {
                                tx.executeSql(
                                     "insert into utilisateur(username,password,email) values ('"+username+"','"+password+"','"+email+"') "
                                )
                                insertionErrorAlert("Inscription Successful !","Welcome to TunGuideApp !");
                              })
                            
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
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                { text: "Inscrire", onPress: () => navigation.navigate('Login') }
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
        if( (username.length==0) ){
            setUsernameIconColor('red');
            setUsernameHint('Required username !');
            setUsernameHintColor('red');
        }
        if((password.length==0)){
            setPasswordIconColor('red');
            setPasswordHint('Error : Required password !');
            setPasswordHintColor('red');
        }
        if((password2.length==0)){
            setPassword2IconColor('red');
            setPassword2Hint('Error : Required password 2 !');
            setPassword2HintColor('red');
        }
        if(password2!=password){
            setPassword2Hint('Error : Passwords should be the same !');
            setPassword2HintColor('red');
            setPassword2IconColor('red');
        }
        if((email.length==0)){
            setEmailHintColor('red');
            setEmailHint('Error : Required email !');
            setEmailIconColor('red');
        }else if(email.indexOf('@')==-1){
            setEmailHintColor('red');
            setEmailHint('Error : email should contain @...!');
            setEmailIconColor('red');
        }
        
        
        if( (username.length !=0) && (password.length!=0) && (password2==password)){

          
            register();

           
                     
             
       
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
                   
                         <Text style={{color : 'black',fontSize: 34,marginTop:-25}}>Inscription</Text>
                         
                        
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
                                    size={23} style ={{marginRight:10}}
                                    onPress={(usernameVal)=>showPassword(usernameVal)}
                                    color = {passwordColor}
                                 />
                                </TouchableOpacity>
                          
                                <TextInput 
                                style={{fontSize:18}}
                                 placeholder={passwordHint}
                                secureTextEntry={passwordLock}
                                onChangeText={(passwordValue)=>setPassWord(passwordValue)}
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
                                 placeholder={password2Hint}
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
                                placeholder={emailHint}
                                onChangeText={(emailValue)=>setEmail(emailValue)}
                                placeholderTextColor={emailHintColor}
                                
                                  />
                                 
                             </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>loginHandler()}>
                            <View style={styles.loginButton} >
                                <Text style={{color:'white',fontSize:18,fontWeight:'bold'}}>Inscrire</Text>
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
        height : Dimensions.get('window').height /2.5
    },
    bottomView : {
        flex :1,
        backgroundColor: 'white',
        bottom : 45,
        borderTopStartRadius : 50,
        borderTopEndRadius : 60

    },
   
    form : {
        marginTop : 25,
      
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
 
        
    

    
    
 
  
    
});
