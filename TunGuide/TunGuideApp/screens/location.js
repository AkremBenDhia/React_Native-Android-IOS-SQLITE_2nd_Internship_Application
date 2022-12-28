import React, { useEffect, useState } from 'react';
import {View,StyleSheet,Text,ScrollView, ImageBackground,Dimensions,Image,
         TextInput, TouchableOpacity} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Avatar, Badge, Card } from '@rneui/base';
import { FlatList } from 'react-native-gesture-handler';
import { NavigationContainer } from 'react-navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import MapViewDirections from "react-native-maps-directions"
export default function location({route, navigation}){
  
    const [restaurant, setRestaurant] = React.useState(null)
    const [streetName, setStreetName] = React.useState("")
    const [destinationAdress, setdestinationAdress] = React.useState("")
    const [fromLocation, setFromLocation] = React.useState(null)
    const [toLocation, setToLocation] = React.useState(null)
    const [region, setRegion] = React.useState(null)

    const GOOGLE_MAPS_APIKEY = 'AIzaSyAKuMyWJmcDfzegO0mCRgmRMUgIgIh3Bo0';

    React.useEffect(() => {
        let { destination, currentLocation } = route.params;

        let fromLoc = currentLocation.gps
        let toLoc = destination.location
        let destAdresse = destination.adresse
        let street = currentLocation.streetName

        let mapRegion = {
            latitude: (fromLoc.latitude + toLoc.latitude) / 2,
            longitude: (fromLoc.longitude + toLoc.longitude) / 2,
            latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude) * 2,
            longitudeDelta: Math.abs(fromLoc.longitude - toLoc.longitude) * 2
        }

        setRestaurant(destination)
        setStreetName(street)
        setFromLocation(fromLoc)
        setToLocation(toLoc)
        setRegion(mapRegion)
        setdestinationAdress(destAdresse)

    }, [])
    
    function renderDestinationHeader() {
        return (
            <View
                style={{
                    position: 'absolute',
                    top: 50,
                    left: 0,
                    right: 0,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        
                       justifyContent:'center',
                        paddingVertical: 5,
                        paddingHorizontal: 5,
                        borderRadius:40,
                        backgroundColor: 'white'
                    }}
                >
               

                        <View style={{height:30,width:30,borderRadius:20,alignItems:'center',justifyContent:'center',backgroundColor:'#1464F4'}}> 
                
                            <Entypo name="location-pin" size={20} color="white" />
                
                        </View>
                        <Text style={{fontSize:15,marginLeft:5,marginRight:5}}>{destinationAdress}, {streetName}</Text>
                        
               

                  
                </View>
            </View>
        )
    }


    function renderMap(){
        const destinationMarker = ()=>(
            <Marker coordinate={toLocation}>
            <View style={{height:40,width:40,borderRadius:20,alignItems:'center',justifyContent:'center',backgroundColor:'#1464F4'}}> 
                
                <Entypo name="location-pin" size={30} color="white" />
                
            </View>

            </Marker>
        )
        return(
            <View style={{flex:1}}>
            <MapView 
                provider={PROVIDER_GOOGLE}
                initialRegion={region}
             style={{flex:1}}>
         
            {destinationMarker()}
          
            </MapView>

            </View>
        )
    }
    return (
        <View style={{flex:1}}>
            {renderMap()}
            {renderDestinationHeader()}

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });