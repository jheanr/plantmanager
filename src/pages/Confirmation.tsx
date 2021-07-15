import { useNavigation, useRoute } from '@react-navigation/core';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface Params {
  title: string;
  subtitle: string;
  buttonTitle: string;
  icon: 'smile' | 'hug';
  nextScreen: string;
}

const emojis = {
  hug: '🤗',
  smile: '😄'
}

export default function Confirmation() {
  const navigation = useNavigation();
  const routes = useRoute();

  const { 
    title, 
    subtitle, 
    buttonTitle, 
    icon, 
    nextScreen 
  } = routes.params as Params;

  function handleMoveOn() {
    navigation.navigate(nextScreen);
  }
  
  return (
    <SafeAreaView style={style.container}>
      <View style={style.content}>
        <Text style={style.emoji}>
          {emojis[icon]}
        </Text>

        <Text style={style.title}>
          {title}
        </Text>

        <Text style={style.subtitle}>
          {subtitle}
        </Text>

        <View style={style.footer}>
          <Button title={buttonTitle} onPress={handleMoveOn} />
        </View>
      </View>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    width: '100%',
  },
  emoji: {
    fontSize: 44
  },
  title: {
    color: colors.heading,
    fontFamily: fonts.heading,
    fontSize: 22,
    lineHeight: 28,
    marginTop: 15,
    textAlign: 'center'
  },
  subtitle: {
    color: colors.heading,
    fontFamily: fonts.text,
    fontSize: 17,
    paddingVertical: 20,
    textAlign: 'center'
  },
  footer: {
    paddingHorizontal: 75,
    width: '100%'
  }
})