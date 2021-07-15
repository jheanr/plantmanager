import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import avatarImg from '../assets/waterdrop.png';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Header() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    async function getUserName() {
      const user = await AsyncStorage.getItem('@plantManager:user');
      setUserName(user || '');
    }

    getUserName();
  }, [userName]);

  return (
    <View style={style.container}>
      <View>
        <Text style={style.greetings}>Olá</Text>
        <Text style={style.name}>{userName}</Text>
      </View>

      <Image source={avatarImg} style={style.avatar} />
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: getStatusBarHeight(),
    paddingVertical: 30,
    width: '100%',
  },
  greetings: {
    color: colors.heading,
    fontFamily: fonts.text,
    fontSize: 32,
  },
  name: {
    color: colors.heading,
    fontFamily: fonts.heading,
    fontSize: 32,
    lineHeight: 40
  },
  avatar: {
    borderRadius: 32,
    height: 64,
    width: 64,
  }
})