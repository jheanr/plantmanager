import React from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

import loadAnimation from '../assets/load.json';

export function Load() {
  return (
    <View style={style.container}>
      <LottieView
        source={loadAnimation}
        autoPlay
        loop
        style={style.animation}
      />
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  animation: {
    backgroundColor: 'transparent',
    height: 200,
    width: 200
  }
})