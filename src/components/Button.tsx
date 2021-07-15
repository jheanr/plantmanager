import React from 'react'
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export function Button({ title, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity style={style.container} {...rest}>
      <Text style={style.text}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({
  container: {
    backgroundColor: colors.green,
    borderRadius: 16,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: colors.white,
    fontFamily: fonts.text,
    fontSize: 16
  }
})