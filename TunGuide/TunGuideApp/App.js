import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import Navigator from './screens/routes/navigationStack';

import { createStackNavigator } from '@react-navigation/stack';




export default function App() {
  return (
  
    <Navigator headerMode="none" />
    
  
  );
}


