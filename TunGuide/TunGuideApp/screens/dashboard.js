import React, { useState } from 'react';
import {View,StyleSheet,Text,ScrollView, ImageBackground,Dimensions,Image,
         TextInput, TouchableOpacity} from 'react-native';

import Ionic from 'react-native-vector-icons/Ionicons'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';//API
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './homeScreen';
import ProfileScreen from './ProfileScreen';
import { createStackNavigator } from "@react-navigation/stack";

import Favorite from './AddScreen';

import Restaurant from './restaurantsScreen';
import Location from './location';

const Tab=createBottomTabNavigator();
const Stack = createStackNavigator();
const StackNavigator=()=>(
    <Stack.Navigator   screenOptions={({route})=>({
        tabBarShowLabel  : true,
        tabBarActiveTintColor :'#1464F4',
        headerShown : false,})}
              >
        <Stack.Screen name="appHome"  component={HomeScreen}/>
        <Stack.Screen name="restaurants" component={Restaurant}/>
        <Stack.Screen name="location" component={Location}/>
        
    </Stack.Navigator>
    
    
    
    
)

const TabNavigator=()=>(
    <Tab.Navigator 
            screenOptions={({route})=>({
                    tabBarShowLabel  : true,
                    tabBarActiveTintColor :'#1464F4',
                    headerShown : false,
                
                    
                tabBarStyle : {
                    height : 60,
                    paddingBottom : 5,
                    paddingTop : 5,
                    
                    
                    
                  },

              
            
               
                tabBarIcon: ({focused, size,color})=>{
                    let iconName;
                    if(route.name==="Home"){
                        iconName = focused ? "ios-home" : "ios-home-outline";
                        color = focused ? "#1464F4" : "black";
                        size = focused ? size+8: size+5;
                      
                        
                        
                    }else if(route.name==="Favorite"){
                        iconName = focused ? "heart" : "heart-outline";
                        color = focused ? "#1464F4" : "black";
                        size = focused ? size+8: size+5;
                      
                    }else if(route.name==="Profile"){
                        iconName = focused ? "person-circle" : "person-circle-outline";
                        color = focused ? "#1464F4" : "black";
                        size = focused ? size+8: size+5;
                      
                    }
                    return  <Ionicons name={iconName} size={size} color={color} />
                },
                
            })}
            
                >
                
              
              
                <Tab.Screen name='Home' component={StackNavigator}/>
                <Tab.Screen name='Favorite' component={Favorite}/>
               
                
                <Tab.Screen name='Profile' component={ProfileScreen}/>
               
             
              
            </Tab.Navigator>
        
)
export default function dashboard({ navigation }){
/*

    const Tab=createBottomTabNavigator();
    const Stack = createStackNavigator();
*/
 
    return(
        <NavigationContainer >
            <TabNavigator/>
        </NavigationContainer>


/*

        <NavigationContainer 
            >
        
        
            <Tab.Navigator 
            screenOptions={({route})=>({
                    tabBarShowLabel  : true,
                    tabBarActiveTintColor :'#1464F4',
                    headerShown : false,
                
                    
                tabBarStyle : {
                    height : 60,
                    paddingBottom : 5,
                    paddingTop : 5,
                    
                    
                    
                  },

              
            
               
                tabBarIcon: ({focused, size,color})=>{
                    let iconName;
                    if(route.name==="Home"){
                        iconName = focused ? "ios-home" : "ios-home-outline";
                        color = focused ? "#1464F4" : "black";
                        size = focused ? size+8: size+5;
                      
                        
                        
                    }else if(route.name==="Add"){
                        iconName = focused ? "add-circle" : "add-circle-outline";
                        color = focused ? "#1464F4" : "black";
                        size = focused ? size+8: size+5;
                      
                    }else if(route.name==="Profile"){
                        iconName = focused ? "person-circle" : "person-circle-outline";
                        color = focused ? "#1464F4" : "black";
                        size = focused ? size+8: size+5;
                      
                    }
                    return  <Ionicons name={iconName} size={size} color={color} />
                },
                
            })}
            
                >
                
              
              
                <Tab.Screen name='Home' component={HomeScreen}/>
                <Tab.Screen name='Add' component={AddScreen}/>
               
                
                <Tab.Screen name='Profile' component={ProfileScreen}/>
             
              
            </Tab.Navigator>
        </NavigationContainer>
        */
      
    )


    
}