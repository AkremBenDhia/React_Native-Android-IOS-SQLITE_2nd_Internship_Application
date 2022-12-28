import React, { useState } from 'react';
import {View,StyleSheet,Text,ScrollView, ImageBackground,Dimensions,Image,SafeAreaView,Button,Alert,
         TextInput, TouchableOpacity} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Avatar, Badge, Card } from '@rneui/base';
import { Ionicons } from '@expo/vector-icons'; 
import { FlatList } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons'; 
import { NavigationContainer, useTheme } from 'react-navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SQLite from 'expo-sqlite';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system'; //Télecharger
import { EvilIcons } from '@expo/vector-icons'; 



export const hotel = require("../assets/hotel.png");
export const resto = require("../assets/resto.png");
export const beach = require("../assets/beach.png");
export const disco = require("../assets/disco.png");
export const camping = require("../assets/camping.png");
export const airport = require("../assets/airplane.png");

export const souk = require("../assets/souk.png");
export const monument = require("../assets/monuments.jpg");
export const hana = require("../assets/hana.jpg");
export const transport = require("../assets/transport.jpg");
//RestosPhoto
export const darJeld = require("../assets/darJeld.jpg");
export const vinotheque = require("../assets/restosPhotos/vinotheque.jpg");
export const darMarsa = require("../assets/restosPhotos/darMarsa.jpg");
export const movenpich = require("../assets/restosPhotos/movenpich.jpg");
//hanaPics
export const hana1 = require("../assets/hanaa.jpg");
export const hana2 = require("../assets/hana2.jpg");
export const hana3 = require("../assets/room.jpg");
//bardo pics
export const bardo1 = require("../assets/1.jpg");
export const bardo2 = require("../assets/2.jpg");
export const bardo3 = require("../assets/3.jpg");
export const bardo4 = require("../assets/4.jpg");
//dougge pics
export const dougga1 = require("../assets/dog1.jpg");
export const dougga2 = require("../assets/dog2.jpg");
export const dougga3 = require("../assets/gog3.jpg");
export const dougga4 = require("../assets/d4.jpg");
////dougge pics
export const carthage1 = require("../assets/car1.jpg");
export const carthage2 = require("../assets/car2.jpg");
export const carthage3 = require("../assets/car3.jpg");
export const carthage4 = require("../assets/car4.jpg");
/////
////dougge pics
export const dahdah1 = require("../assets/dah1.jpg");
export const dahdah2 = require("../assets/dah2.jpg");
export const dahdah3 = require("../assets/dah3.jpg");
export const dahdah4 = require("../assets/dahdah4.jpg");
/////
////dougge pics

export const dar2 = require("../assets/dar2.jpg");
export const dar3 = require("../assets/dar3.jpg");
export const dar4 = require("../assets/dar4.jpg");
/////
////vinotheque pics

export const vino1 = require("../assets/vin1.jpg");
export const vino2 = require("../assets/vin2.jpg");
export const vino3 = require("../assets/vin3.jpg");
/////dar marsa pics

export const marsa1 = require("../assets/marsa2.jpg");
export const marsa2 = require("../assets/marsa3.jpg");
export const marsa3 = require("../assets/romms.jpg");
/////Carthage land pics

export const carth1 = require("../assets/carthage1.jpg");
export const carth2 = require("../assets/carthage2.jpg");
export const carth3 = require("../assets/carthage3.jpg");

export const carth4 = require("../assets/carth4.jpg");
/////bowling  pics

export const bowling = require("../assets/bow1.jpg");
export const bowling1 = require("../assets/bow2.jpg");
export const bowling2 = require("../assets/boww3.jpg");

export const bowling3 = require("../assets/boww4.jpg");

/////africa hotel  pics

export const africa = require("../assets/af1.jpg");
export const africa1 = require("../assets/africa2.jpg");
export const africa2 = require("../assets/africa3.jpg");

export const africa3 = require("../assets/africa4.jpg");
/////mouradi hotel  pics

export const mouradi1 = require("../assets/mou1.jpg");
export const mouradi2 = require("../assets/mou.jpg");
export const mouradi3 = require("../assets/mou2.jpg");

export const mouradi4 = require("../assets/mou3.jpg");
/////monastir hotel  pics

export const monastir1 = require("../assets/mon1.jpg");
export const monastir2 = require("../assets/mon2.jpg");
export const monastir3 = require("../assets/mon3.jpg");

export const monastir4 = require("../assets/mon4.jpg");




const db = SQLite.openDatabase('TunguideApp.db');


    

/*
db.transaction((tx)=>{
    tx.executeSql("INSERT INTO categorie (idCat,nameCat) VALUES (1,'Hotel')")
})

db.transaction((tx)=>{
    tx.executeSql("INSERT INTO categorie (idCat,nameCat) VALUES (2,'Restos')")
})

db.transaction((tx)=>{
    tx.executeSql("INSERT INTO categorie (idCat,nameCat) VALUES (3,'Airports')")
})

db.transaction((tx)=>{
    tx.executeSql("INSERT INTO categorie (idCat,nameCat) VALUES (4,'Monuments')")
})
*/

export default function HomeScreen({navigation}){



    
    db.transaction((tx)=>{
        tx.executeSql("CREATE TABLE if not exists categorie(idCat integer primary key,nameCat varchar(50))")
    })
 
    db.transaction((tx)=>{
        tx.executeSql("INSERT INTO categorie (idCat,nameCat) VALUES (1,'Hotel')")
    })
    
    db.transaction((tx)=>{
        tx.executeSql("INSERT INTO categorie (idCat,nameCat) VALUES (2,'Restos')")
    })
    
    db.transaction((tx)=>{
        tx.executeSql("INSERT INTO categorie (idCat,nameCat) VALUES (3,'Airports')")
    })
    
    db.transaction((tx)=>{
        tx.executeSql("INSERT INTO categorie (idCat,nameCat) VALUES (4,'Monuments')")
    })
    

db.transaction((tx)=>{
    tx.executeSql("CREATE TABLE destination(destinationId integer primary key  autoincrement,nameDest varchar(50),ratingDest varchar(20),adresseDest varchar(50),telephoneDest varchar(20),libelleDest varchar(50),idCat integer,  FOREIGN KEY(idCat) REFERENCES categorie(idCat) )")
})

db.transaction((tx)=>{
    tx.executeSql("INSERT INTO destination (destinationId,nameDest,ratingDest,adresseDest,telephoneDest,libelleDest,idCat) VALUES ( 1,'Dar el jeld', '4', ' 5-10، Rue Dar El Jeld, Street 1005','54878788','est un restaurant tunisien situé dans la médina de Tunis Il est classé en tant que meilleur restaurant touristique du pays selon lOffice national du tourisme tunisien',2)")
})
db.transaction((tx)=>{
    tx.executeSql("INSERT INTO destination (destinationId,nameDest,ratingDest,adresseDest,telephoneDest,libelleDest,idCat) VALUES ( 2,'La vinotheque', '4.3', ' 3 Rue Imam Sahnoun, Tunis 1002','71 793 283','Endroit sympathique, bien décoré avec une bonne ambiance, tout au fond du restaurant qui, lui, fait un peu vieillot.',2)")

})

db.transaction((tx)=>{
    tx.executeSql("INSERT INTO destination (destinationId,nameDest,ratingDest,adresseDest,telephoneDest,libelleDest,idCat) VALUES ( 3,'Dar el marsa', '4.5', ' 75 Av. Habib Bourguiba, Marsa 2078','71 793 283','“Dar” signifie “maison”. “El Marsa” désigne la mer ou les ports. De l’antiquité à nos jours, la Marsa est un havre de paix, riche de son histoire et de sa mixité culturelle où, de tous temps, les Tunisois aiment se retrouver et se ressourcer. ',1)")
})
db.transaction((tx)=>{
    tx.executeSql("INSERT INTO destination (destinationId,nameDest,ratingDest,adresseDest,telephoneDest,libelleDest,idCat) VALUES ( 4,'El hana international', '3.4', ' 49 Av. Habib Bourguiba, Tunis 1015','71 331 948','Découvrez pourquoi El Hana International est l hôtel préféré des voyageurs visitant Tunis. Mélange idéal entre rapport qualité,prix et confort, il offre une gamme de services conçus pour les voyageurs comme vous.',1)")
})
db.transaction((tx)=>{
    tx.executeSql("INSERT INTO destination (destinationId,nameDest,ratingDest,adresseDest,telephoneDest,libelleDest,idCat) VALUES ( 5,'El hana international', '3.4', ' 49 Av. Habib Bourguiba, Tunis 1015','71 331 948','Découvrez pourquoi El Hana International est l hôtel préféré des voyageurs visitant Tunis. Mélange idéal entre rapport qualité,prix et confort, il offre une gamme de services conçus pour les voyageurs comme vous.',4)")
})
db.transaction((tx)=>{
    tx.executeSql("INSERT INTO destination (destinationId,nameDest,ratingDest,adresseDest,telephoneDest,libelleDest,idCat) VALUES ( 6,'Musee bardo', '3.4', ' Bardo, Tunis ','71 513 650','C est l un des plus importants musées du bassin méditerranéen et le second musée du continent africain après le musée égyptien.',4)")
})
db.transaction((tx)=>{
    tx.executeSql("INSERT INTO destination (destinationId,nameDest,ratingDest,adresseDest,telephoneDest,libelleDest,idCat) VALUES ( 7,'Dougge', '4.1', ' Dougga, Teboursouk ','45 684 378','Dougga ou Thugga ou TBGG était une colonie berbère, punique et romaine près de lactuel Téboursouk dans le nord de la Tunisie',4)")
})
db.transaction((tx)=>{
    tx.executeSql("INSERT INTO destination (destinationId,nameDest,ratingDest,adresseDest,telephoneDest,libelleDest,idCat) VALUES ( 8,'Tunis carthage', '5', ' 1080 Tunis Cedex ','71 754 000','L aéroport de Tunis Carthage est l aéroport international de Tunis, la capitale de la Tunisie. Il sert de port d attache à Tunisair, Tunisair Express, Nouvelair Tunisie et Tunisavia',3)")
})
db.transaction((tx)=>{
    tx.executeSql("INSERT INTO destination (destinationId,nameDest,ratingDest,adresseDest,telephoneDest,libelleDest,idCat) VALUES ( 9,'Tierra Feliz Dah Dah', '4.9', ' R6MG+P9J, Av. principale, Tunis ','71 860 888','est un très grand espace de loisirs créé en 1995 et régulièrement enrichi. Il se trouve sur les Berges du Lac de Tunis, non loin de l aéroport international de Tunis Carthage, à quatre kilomètres environ au Nord-Est de la capitale',0)")
})
db.transaction((tx)=>{
    tx.executeSql("INSERT INTO destination (destinationId,nameDest,ratingDest,adresseDest,telephoneDest,libelleDest,idCat) VALUES ( 10,'Carthage Land', '4.9', '1 Av. principale, Tunis ','70 020 820','Ce parc aquatique en plein air comprend une variété de toboggans et de piscines, ainsi que quelques manèges à sensations.',0)")
})
db.transaction((tx)=>{
    tx.executeSql("INSERT INTO destination (destinationId,nameDest,ratingDest,adresseDest,telephoneDest,libelleDest,idCat) VALUES ( 11,'Bowling du lac', '4.5', 'Av. principale, Tunis ','54 123 123','Une bonne dose de divertissement: Parties de bowling avec un petit-déjeuner duo à 28 DT seulement au Bowling du Lac .',0)")
})
db.transaction((tx)=>{
    tx.executeSql("INSERT INTO destination (destinationId,nameDest,ratingDest,adresseDest,telephoneDest,libelleDest,idCat) VALUES ( 12,'Hotel Africa', '3.8', '50 Ave Habib Bourguiba, Tunis 1001 ','71 347 477','Situé à Tunis, sur la célèbre avenue Habib Bourguiba, l hôtel Africa Tunis se trouve à 15 minutes en voiture de l aéroport de Tunis-Carthage.',1)")
})

db.transaction((tx)=>{
    tx.executeSql("INSERT INTO destination (destinationId,nameDest,ratingDest,adresseDest,telephoneDest,libelleDest,idCat) VALUES ( 13,'Mouradi gammarth', '3.8', 'B.P597 la marsa gammarth، La Marsa 2070 ','71 274 300','EL Mouradi Gammarth est situé le long d une belle plage blanche. L hôtel est partiellement rénové, dans un cadre enchanteur et relaxant reflétant superbement l architecture de la tradition du pays, à 1 km du terrain de Golf de Carthage, à 18 km de l aéroport International de Tunis-Carthage,',1)")
})
db.transaction((tx)=>{
    tx.executeSql("INSERT INTO destination (destinationId,nameDest,ratingDest,adresseDest,telephoneDest,libelleDest,idCat) VALUES ( 14,'Aéroport monastir', '3.8', 'Monastir','71 274 300','L aéroport international de Monastir Habib Bourguiba est un aéroport desservant les régions de Monastir et de Sousse en Tunisie. L Autorité tunisienne de l aviation civile et des aéroports a confié la gestion de l aéroport à TAV Airports Holding en mars 2007.',3)")
})

db.transaction((tx)=>{
    tx.executeSql("CREATE TABLE destinationPrefere(idDestPrefere integer primary key  autoincrement,userId integer,destinationId integer,foreign key (userId) references utilisateur(userId), foreign key (destinationId) references destination(destinationId) )")
})


    const initialCurrentLocation = {
        streetName: "Tunisia",
        gps: {
            latitude: 33.886917,
            longitude:  9.537499
        }
    }
    db.transaction((tx)=>{
        tx.executeSql(
            "SELECT destinationId,nameDest,ratingDest,adresseDest,telephoneDest,libelleDest,idCat from destination where destinationId=1",[],((tx,results)=>{
                    var len= results.rows.length;
                    var long= Number(len);

                    let destinationId = results.rows.item(0).destinationId;
                    let nameDest= results.rows.item(0).nameDest;
                    let ratingDest = results.rows.item(0).ratingDest;
                    let adresseDest= results.rows.item(0).adresseDest;
                    let telephoneDest= results.rows.item(0).telephoneDest;
                    let libelleDest = results.rows.item(0).libelleDest;
                    let idCat= results.rows.item(0).idCat;
                 
                    restaurantData.push({ 
                        id: destinationId,
                        name: nameDest,
                        rating: ratingDest,
                        categories: [idCat],
                        photo: darJeld,
                        adresse: adresseDest,
                        libelle: libelleDest,
                        location: {
                            latitude: 36.79849,
                              longitude:10.169194
                        },
                        Téléphone :telephoneDest,
                      
                        photo1: dar2,
                         
                           
                               
                        photo2: dar3,
               
                       
                        photo3: dar4

                       
                    })
            })
            
        ),
        tx.executeSql(
            "SELECT destinationId,nameDest,ratingDest,adresseDest,telephoneDest,libelleDest,idCat from destination where destinationId=2",[],((tx,results)=>{
                    var len= results.rows.length;
                    var long= Number(len);

                    let destinationId = results.rows.item(0).destinationId;
                    let nameDest= results.rows.item(0).nameDest;
                    let ratingDest = results.rows.item(0).ratingDest;
                    let adresseDest= results.rows.item(0).adresseDest;
                    let telephoneDest= results.rows.item(0).telephoneDest;
                    let libelleDest = results.rows.item(0).libelleDest;
                    let idCat= results.rows.item(0).idCat;
                 
                    restaurantData.push({ 
                        id: destinationId,
                        name: nameDest,
                        rating: ratingDest,
                        categories: [idCat],
                        photo: vinotheque,
                        adresse: adresseDest,
                        libelle: libelleDest,
                        location: {	
                            latitude: 36.8222482,
                              longitude: 10.1815566
                        },
                        Téléphone :telephoneDest,


                        photo1: vino1,
                         
                           
                               
                        photo2: vino2,
               
                       
                        photo3: vino3
                    })
            })
            
        ),
        tx.executeSql(
            "SELECT destinationId,nameDest,ratingDest,adresseDest,telephoneDest,libelleDest,idCat from destination where destinationId=3",[],((tx,results)=>{
                    var len= results.rows.length;
                    var long= Number(len);

                    let destinationId = results.rows.item(0).destinationId;
                    let nameDest= results.rows.item(0).nameDest;
                    let ratingDest = results.rows.item(0).ratingDest;
                    let adresseDest= results.rows.item(0).adresseDest;
                    let telephoneDest= results.rows.item(0).telephoneDest;
                    let libelleDest = results.rows.item(0).libelleDest;
                    let idCat= results.rows.item(0).idCat;
                 
                    restaurantData.push({ 
                        id: destinationId,
                        name: nameDest,
                        rating: ratingDest,
                        categories: [idCat],
                        photo: darMarsa,
                        adresse: adresseDest,
                        libelle: libelleDest,
                        location: { 
                            latitude: 36.884234,
                              longitude: 10.332129
                        },
                        Téléphone :telephoneDest,

                        photo1: marsa1,
                         
                           
                               
                        photo2: marsa2,
               
                       
                        photo3: marsa3
                        
                        
                    })
            })
            
        ),
        tx.executeSql(
            "SELECT destinationId,nameDest,ratingDest,adresseDest,telephoneDest,libelleDest,idCat from destination where destinationId=4",[],((tx,results)=>{
                    var len= results.rows.length;
                    var long= Number(len);

                    let destinationId = results.rows.item(0).destinationId;
                    let nameDest= results.rows.item(0).nameDest;
                    let ratingDest = results.rows.item(0).ratingDest;
                    let adresseDest= results.rows.item(0).adresseDest;
                    let telephoneDest= results.rows.item(0).telephoneDest;
                    let libelleDest = results.rows.item(0).libelleDest;
                    let idCat= results.rows.item(0).idCat;
                 
                    restaurantData.push({ 
                        id: destinationId,
                        name: nameDest,
                        rating: ratingDest,
                        categories: [idCat],
                        photo: hana,
                        adresse: adresseDest,
                        libelle: libelleDest,
                        location: {
                            latitude: 36.7999043,
                              longitude: 10.1808849
                        },
                        Téléphone :telephoneDest,
                        photo1: hana1,
                         
                           
                               
                        photo2: hana2,
               
                       
                        photo3: hana3
                   
                    })
            })
            
        ),
        tx.executeSql(
            "SELECT destinationId,nameDest,ratingDest,adresseDest,telephoneDest,libelleDest,idCat from destination where destinationId=6",[],((tx,results)=>{
                    var len= results.rows.length;
                    var long= Number(len);

                    let destinationId = results.rows.item(0).destinationId;
                    let nameDest= results.rows.item(0).nameDest;
                    let ratingDest = results.rows.item(0).ratingDest;
                    let adresseDest= results.rows.item(0).adresseDest;
                    let telephoneDest= results.rows.item(0).telephoneDest;
                    let libelleDest = results.rows.item(0).libelleDest;
                    let idCat= results.rows.item(0).idCat;
                 
                    restaurantData.push({ 
                        id: destinationId,
                        name: nameDest,
                        rating: ratingDest,
                        categories: [idCat],
                        photo: bardo1,
                        adresse: adresseDest,
                        libelle: libelleDest,
                        location: {
                            latitude: 36.809425,
                              longitude: 10.134211
                        },
                        Téléphone :telephoneDest,
                        photo1: bardo2,
                         
                           
                               
                        photo2:  bardo3,
               
                       
                        photo3: bardo4
                   
                    })
            })
            
        ),
        tx.executeSql(
            "SELECT destinationId,nameDest,ratingDest,adresseDest,telephoneDest,libelleDest,idCat from destination where destinationId=7",[],((tx,results)=>{
                    var len= results.rows.length;
                    var long= Number(len);

                    let destinationId = results.rows.item(0).destinationId;
                    let nameDest= results.rows.item(0).nameDest;
                    let ratingDest = results.rows.item(0).ratingDest;
                    let adresseDest= results.rows.item(0).adresseDest;
                    let telephoneDest= results.rows.item(0).telephoneDest;
                    let libelleDest = results.rows.item(0).libelleDest;
                    let idCat= results.rows.item(0).idCat;
                 
                    restaurantData.push({ 
                        id: destinationId,
                        name: nameDest,
                        rating: ratingDest,
                        categories: [idCat],
                        photo: dougga3,
                        adresse: adresseDest,
                        libelle: libelleDest,
                        location: {
                            latitude: 36.41999832,
                              longitude: 9.217665796
                        },
                        Téléphone :telephoneDest,
                        photo1: dougga2,
                         
                           
                               
                        photo2:  dougga1,
               
                       
                        photo3: dougga4
                   
                    })
            })
            
        ),





        
        tx.executeSql(
            "SELECT destinationId,nameDest,ratingDest,adresseDest,telephoneDest,libelleDest,idCat from destination where destinationId=8",[],((tx,results)=>{
                    var len= results.rows.length;
                    var long= Number(len);

                    let destinationId = results.rows.item(0).destinationId;
                    let nameDest= results.rows.item(0).nameDest;
                    let ratingDest = results.rows.item(0).ratingDest;
                    let adresseDest= results.rows.item(0).adresseDest;
                    let telephoneDest= results.rows.item(0).telephoneDest;
                    let libelleDest = results.rows.item(0).libelleDest;
                    let idCat= results.rows.item(0).idCat;
                 
                    restaurantData.push({ 
                        id: destinationId,
                        name: nameDest,
                        rating: ratingDest,
                        categories: [idCat],
                        photo: carthage1,
                        adresse: adresseDest,
                        libelle: libelleDest,
                        location: {
                            latitude: 36.8458 ,
                              longitude: 10219
                        },
                        Téléphone :telephoneDest,
                        photo1: carthage2,
                         
                           
                               
                        photo2:  carthage3,
               
                       
                        photo3: carthage4
                   
                    })
            }),
            tx.executeSql(
                "SELECT destinationId,nameDest,ratingDest,adresseDest,telephoneDest,libelleDest,idCat from destination where destinationId=9",[],((tx,results)=>{
                        var len= results.rows.length;
                        var long= Number(len);
    
                        let destinationId = results.rows.item(0).destinationId;
                        let nameDest= results.rows.item(0).nameDest;
                        let ratingDest = results.rows.item(0).ratingDest;
                        let adresseDest= results.rows.item(0).adresseDest;
                        let telephoneDest= results.rows.item(0).telephoneDest;
                        let libelleDest = results.rows.item(0).libelleDest;
                        let idCat= results.rows.item(0).idCat;
                     
                        restaurantData.push({ 
                            id: destinationId,
                            name: nameDest,
                            rating: ratingDest,
                            categories: [idCat],
                            photo: dahdah2,
                            adresse: adresseDest,
                            libelle: libelleDest,
                            location: {
                                latitude: 36.8325 ,
                                  longitude: 10.2271
                            },
                            Téléphone :telephoneDest,
                            photo1: dahdah1,
                             
                               
                                   
                            photo2:  dahdah3,
                   
                           
                            photo3: dahdah4
                       
                        })
                })
                
            ),
            tx.executeSql(
                "SELECT destinationId,nameDest,ratingDest,adresseDest,telephoneDest,libelleDest,idCat from destination where destinationId=10",[],((tx,results)=>{
                        var len= results.rows.length;
                        var long= Number(len);
    
                        let destinationId = results.rows.item(0).destinationId;
                        let nameDest= results.rows.item(0).nameDest;
                        let ratingDest = results.rows.item(0).ratingDest;
                        let adresseDest= results.rows.item(0).adresseDest;
                        let telephoneDest= results.rows.item(0).telephoneDest;
                        let libelleDest = results.rows.item(0).libelleDest;
                        let idCat= results.rows.item(0).idCat;
                     
                        restaurantData.push({ 
                            id: destinationId,
                            name: nameDest,
                            rating: ratingDest,
                            categories: [idCat],
                            photo: carth1,
                            adresse: adresseDest,
                            libelle: libelleDest,
                            location: {
                                latitude: 36.8315 ,
                                  longitude: 10.2247
                            },
                            Téléphone :telephoneDest,
                            photo1: carth2,
                             
                               
                                   
                            photo2:  carth3,
                   
                           
                            photo3: carth4
                       
                        })
                })
                
            ),
            tx.executeSql(
                "SELECT destinationId,nameDest,ratingDest,adresseDest,telephoneDest,libelleDest,idCat from destination where destinationId=11",[],((tx,results)=>{
                        var len= results.rows.length;
                        var long= Number(len);
    
                        let destinationId = results.rows.item(0).destinationId;
                        let nameDest= results.rows.item(0).nameDest;
                        let ratingDest = results.rows.item(0).ratingDest;
                        let adresseDest= results.rows.item(0).adresseDest;
                        let telephoneDest= results.rows.item(0).telephoneDest;
                        let libelleDest = results.rows.item(0).libelleDest;
                        let idCat= results.rows.item(0).idCat;
                     
                        restaurantData.push({ 
                            id: destinationId,
                            name: nameDest,
                            rating: ratingDest,
                            categories: [idCat],
                            photo: bowling,
                            adresse: adresseDest,
                            libelle: libelleDest,
                            location: {
                                latitude: 36.8315663 ,
                                  longitude: 10.2160625
                            },
                            Téléphone :telephoneDest,
                            photo1: bowling1,
                             
                               
                                   
                            photo2:  bowling2,
                   
                           
                            photo3: bowling3
                       
                        })
                })
                
            ),
            tx.executeSql(
                "SELECT destinationId,nameDest,ratingDest,adresseDest,telephoneDest,libelleDest,idCat from destination where destinationId=12",[],((tx,results)=>{
                        var len= results.rows.length;
                        var long= Number(len);
    
                        let destinationId = results.rows.item(0).destinationId;
                        let nameDest= results.rows.item(0).nameDest;
                        let ratingDest = results.rows.item(0).ratingDest;
                        let adresseDest= results.rows.item(0).adresseDest;
                        let telephoneDest= results.rows.item(0).telephoneDest;
                        let libelleDest = results.rows.item(0).libelleDest;
                        let idCat= results.rows.item(0).idCat;
                     
                        restaurantData.push({ 
                            id: destinationId,
                            name: nameDest,
                            rating: ratingDest,
                            categories: [idCat],
                            photo: africa1,
                            adresse: adresseDest,
                            libelle: libelleDest,
                            location: {
                                latitude: 36.7994568 ,
                                  longitude: 10.1831972
                            },
                            Téléphone :telephoneDest,
                            photo1: africa,
                             
                               
                                   
                            photo2:  africa2,
                   
                           
                            photo3: africa3
                       
                        })
                })
                
            ),
            tx.executeSql(
                "SELECT destinationId,nameDest,ratingDest,adresseDest,telephoneDest,libelleDest,idCat from destination where destinationId=13",[],((tx,results)=>{
                        var len= results.rows.length;
                        var long= Number(len);
    
                        let destinationId = results.rows.item(0).destinationId;
                        let nameDest= results.rows.item(0).nameDest;
                        let ratingDest = results.rows.item(0).ratingDest;
                        let adresseDest= results.rows.item(0).adresseDest;
                        let telephoneDest= results.rows.item(0).telephoneDest;
                        let libelleDest = results.rows.item(0).libelleDest;
                        let idCat= results.rows.item(0).idCat;
                     
                        restaurantData.push({ 
                            id: destinationId,
                            name: nameDest,
                            rating: ratingDest,
                            categories: [idCat],
                            photo: mouradi1,
                            adresse: adresseDest,
                            libelle: libelleDest,
                            location: {
                                latitude: 36.7994568 ,
                                  longitude: 10.1831972
                            },
                            Téléphone :telephoneDest,
                            photo1: mouradi2,
                             
                               
                                   
                            photo2:  mouradi3,
                   
                           
                            photo3: mouradi4
                       
                        })
                })
                
            ),
            tx.executeSql(
                "SELECT destinationId,nameDest,ratingDest,adresseDest,telephoneDest,libelleDest,idCat from destination where destinationId=14",[],((tx,results)=>{
                        var len= results.rows.length;
                        var long= Number(len);
    
                        let destinationId = results.rows.item(0).destinationId;
                        let nameDest= results.rows.item(0).nameDest;
                        let ratingDest = results.rows.item(0).ratingDest;
                        let adresseDest= results.rows.item(0).adresseDest;
                        let telephoneDest= results.rows.item(0).telephoneDest;
                        let libelleDest = results.rows.item(0).libelleDest;
                        let idCat= results.rows.item(0).idCat;
                     
                        restaurantData.push({ 
                            id: destinationId,
                            name: nameDest,
                            rating: ratingDest,
                            categories: [idCat],
                            photo: monastir1,
                            adresse: adresseDest,
                            libelle: libelleDest,
                            location: {
                                latitude: 35.7605861 ,
                                  longitude: 10.7506447
                            },
                            Téléphone :telephoneDest,
                            photo1: monastir2,
                             
                               
                          
                            photo2:  monastir3,
                   
                           
                            photo3: monastir4
                       
                        })
                })
                
            )
           
           
           
           
            
        )
       
       
       
       
   
       
   

       




    })
  

    const restaurantData = [

        
        
        ]
        
  

        db.transaction((tx)=>{
            tx.executeSql(
                "SELECT idCat,nameCat from categorie where idCat=1",[],((tx,results)=>{
                        var len= results.rows.length;
                        var long= Number(len);
                        let hotelId = results.rows.item(0).idCat;
                        let hotelName= results.rows.item(0).nameCat.toString();
                        categoryData.push({id : hotelId,name:hotelName,icon:hotel})
                })
                
            ),
            tx.executeSql(
                "SELECT idCat,nameCat from categorie where idCat=2",[],((tx,results)=>{
                        var len= results.rows.length;
                        var long= Number(len);
                        let hotelId = results.rows.item(0).idCat;
                        let hotelName= results.rows.item(0).nameCat.toString();
                        categoryData.push({id : hotelId,name:hotelName,icon:resto})
                })
                
            ),
            tx.executeSql(
                "SELECT idCat,nameCat from categorie where idCat=3",[],((tx,results)=>{
                        var len= results.rows.length;
                        var long= Number(len);
                      let hotelId = results.rows.item(0).idCat;
                     let hotelName= results.rows.item(0).nameCat.toString();
                     categoryData.push({id : hotelId,name:hotelName,icon:airport})
                })
                
            ),
            tx.executeSql(
                "SELECT idCat,nameCat from categorie where idCat=4",[],((tx,results)=>{
                        var len= results.rows.length;
                        var long= Number(len);
                      let hotelId = results.rows.item(0).idCat;
                     let hotelName= results.rows.item(0).nameCat.toString();
                     categoryData.push({id : hotelId,name:hotelName,icon:monument})
                })
                
            )
          });
         
         
          



    const categoryData = [
        {
          id : 0,
            name: "Loisir",
            icon: transport,  
        },

    ]
    //RestaurantsData

    const [categories, setCategories] = useState(categoryData);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [restaurants, setRestaurants] = useState(restaurantData);
    const [currentLocation, setCurrentLocation] = React.useState(initialCurrentLocation)
    //RestaurantData
   const [iconColor,setIconColor]=useState('black');

    
    //restaurants
    function renderHeader(){
        return (
            <View  style={{flexDirection :'row',height: 50}}>
                <TouchableOpacity style={{width: 35,justifyContent : 'center'}}>
                <Ionicons name="earth" size={35}  />
                </TouchableOpacity>
                

                {/*
                <Button title='DATABASE FILE' onPress={()=>{
                              Sharing.shareAsync(
                FileSystem.documentDirectory + 'SQLite/TunguideApp.db', 
                {dialogTitle: 'share or copy your DB via'}
             ).catch(error =>{
                console.log(error);
             })
                }} />
                */}


                
                <View style={{flex: 1,alignItems:'center',justifyContent :'center'}}>
                    <View style={{width:'70%',height :'100%',backgroundColor :'#E6E6E6',alignItems:'center',justifyContent:'center',borderRadius:30}}>
                        <Text style={{fontSize:20,fontWeight:'bold'}}>Tunisia</Text>
                    </View>
                </View>
                <TouchableOpacity style={{width:50,justifyContent:'center'}}>
                    <MaterialIcons name="explore" size={35} color={iconColor} onPress={()=>{setIconColor('#1464F4')}} />
                
                </TouchableOpacity>
            </View>
        )   
    }
    function onDestinationSelect(item){
        let restaurantList = restaurantData.filter(a => a.categories.includes(item.id));

        setRestaurants(restaurantList);

        setSelectedCategory(item);
        
        
        
    

    }


    function flat(){
       
        return(
            <View style={{marginTop:'4%'}}>

    
                <Text style={{fontSize : 35,fontWeight:'bold'}}>Tunisia</Text> 

        
                 
         

               
                <Text style={{fontSize : 35,fontWeight:'bold'}}>Best <Text style={{ color : '#1464F4',}}>Destinations</Text> </Text>
                <FlatList 
                    style={{marginTop:'2%'}}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={categories}
                    renderItem={ ({item})=>(
                        <TouchableOpacity style={{padding : 8,paddingBottom:13,backgroundColor:(selectedCategory?.id == item.id) ? 'blue' : 'white',borderRadius:30,alignItems:'center',justifyContent:'center',marginRight:10}} onPress={()=>onDestinationSelect(item)}>
                        <View style={{padding:22,width:20,height:20,borderRadius:30,alignItems:'center',justifyContent:'center',backgroundColor:'white'}}>
                        <Image rounded source={item.icon} resizeMode='contain'  style={{width:35,height:35}} />
                        </View>
                        
                        <Text style={{color:(selectedCategory?.id == item.id) ? 'white' : 'black'}}>{item.name}</Text>
                       
                        </TouchableOpacity>
                        
                
            
                )} 
           
                    
                />
                
        
            </View>
        )
    }
    function renderRestaurantsList(){
        return(
            <FlatList 
            showsVerticalScrollIndicator={false}
            style={{marginTop:'5%'}}
                data={restaurants}
                renderItem={ ({item})=>(
                        <TouchableOpacity
                              onPress={()=>{navigation.navigate('restaurants', {
                                item,
                                currentLocation
                              })}}
                            style={{marginTop:'5%'}}>
                            <Image 
                                source={item.photo}
                                resizeMode="cover"
                                style={{
                                    width:"100%",
                                    height:200,
                                    borderRadius:10
                                }}
                            />
                            <View
                            style={{shadowColor:'gray',shadowOpacity:100,shadowRadius:50,position:'absolute',bottom:0,height:50,width:100,backgroundColor:'white',borderTopRightRadius:20,alignItems:'center',justifyContent:'center'}}>
                            <Text style={{fontSize:15,fontWeight:'bold'}}>{item.name}</Text>

                            </View>
                           
                        </TouchableOpacity>
            
                )} 
                
            />
            
        )
    }
    return(
        <SafeAreaView style={styles.container}>
        
            {renderHeader()}
            {flat()}
            {renderRestaurantsList()}
        
          
            
        </SafeAreaView>
    )
}
const styles=StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : 'lightGray',
       paddingHorizontal :'2%',
       paddingTop :'7%'
      
        
    },
   
})