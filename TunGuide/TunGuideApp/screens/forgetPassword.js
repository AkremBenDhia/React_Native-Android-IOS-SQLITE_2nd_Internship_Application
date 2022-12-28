import React, { useEffect, useState } from 'react';
import {View,StyleSheet,Text,ScrollView, ImageBackground,Dimensions,
         TextInput, TouchableOpacity,Alert} from 'react-native';
import  { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import * as SQLite from 'expo-sqlite';
import Communication from 'react-native-communications';






    const db = SQLite.openDatabase('TunguideApp.db');
    export default function forgetPassword({ navigation }){
   
    const [email,setEmail]=useState('');
    const [emailIconColor,setEmailIconColor] = useState('#1464F4');
    const [emailHint,setEmailHint] = useState('Enter your email');
    const [emailHintColor,setEmailHintColor]=useState('#808080');
   

    
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
                { text: "Confirm", onPress: () => setVisible(true) }
              ]
          );
    }       
    
   
    
    const isValidPassword=()=>{
        db.transaction((tx)=>{
            tx.executeSql(
                "SELECT email,password FROM utilisateur where email='"+email+"'",[],((tx,results)=>{
                        var len= results.rows.length;
                        var long= Number(len);
                        var mail=results.rows.item(0).email;
                        var pass=results.rows.item(0).password;
                      if(len>0){
                       
                            
                         Communication.email(mail,mail,mail,"TunGuideApp password ","Your password is "+pass);
                         
                      }else
                      insertionErrorAlert("Account Error :","There is no account matching this email !")
                       
                })
            )
          })
    }
    
    const resetPasswordHandler=()=>{
        if((email.length==0)){
            setEmailHintColor('red');
            setEmailHint('Error : Required email !');
            setEmailIconColor('red');
        }else if(email.indexOf('@')==-1){
            setEmailHintColor('red');
            setEmailHint('Error : email should contain @...!');
            setEmailIconColor('red');
        }
        else{
            isValidPassword();
        }
    }
   
    return(
     
            <ScrollView style={styles.scroll} >

                <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                    <View style={{marginTop:'10%'}} >
                        <Ionicons name="md-chevron-back-sharp" size={50} color="black" />
                    </View>
                </TouchableOpacity>
                
                
                <View style={styles.header}>
                    <MaterialCommunityIcons name="lock-reset"  size={200} color="#1464F4" />
                </View>
                
                <View style={styles.section}>
                    <Text style={{fontSize:30,fontWeight:'bold',marginBottom : '2%',alignSelf :'center'}}>Forget password ?</Text>
                    <Text style ={{alignItems :'center',color: '#808080'}}>We just need your email adress to send you your password.</Text>


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

                   <TouchableOpacity onPress={()=>resetPasswordHandler()} >
                            <View style={styles.loginButton} >
                                <Text style={{color:'white',fontSize:18,fontWeight:'bold'}}>RESET PASSWORD</Text>
                            </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{navigation.navigate('Inscription')}} style={{marginTop:'5%',alignSelf:'center', width: '90%',}}>
                         <Text style={{color:'#808080'}} >Don't have an account? 
                             <Text style={{fontStyle: 'italic',color:'#1464F4'}}  >
                                Register now
                                </Text>
                         </Text>
                    </TouchableOpacity>
                


    

                </View>
                
            </ScrollView>
                        

      
    )
}
const styles = StyleSheet.create(
    {
        scroll : {
            flex :1,
            backgroundColor : 'white',
            padding :'2%'
        },
        header : {
            alignItems :'center',
           


        },
        section : {
           
            marginTop : '5%',
            padding : 25,
          
           
        },
        form2 : {
            marginTop : '15%',
          
            flexDirection :'row',
            alignItems :'center',
            color : '#4682B4',
            
            paddingVertical : 10,
            justifyContent :'flex-start',
            borderBottomWidth : 1,
           borderBottomColor : 'black'
        
        }, 
        loginButton : {
            marginTop : '20%',
          
            alignItems:'center',
            borderColor:'#1464F4',
            borderRadius :40,
            padding : 8,
            width: '90%',
            alignSelf :'center',
           backgroundColor : '#1464F4',
        
    
        }
      
        
    }
)
