import React from 'react'
import { View } from 'react-native';
import { ExternalStyle } from "../ExternalStyle";
import { MaterialIcons } from '@expo/vector-icons';

const IntroScreen = () => {
  return (
    <View style={{...ExternalStyle.introContainer}} >
    <MaterialIcons name="calculate" size={150} color="black" />
    </View>
  )
}

export default IntroScreen
