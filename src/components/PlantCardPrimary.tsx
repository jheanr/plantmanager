import React from 'react';
import { StyleSheet, Text } from "react-native";
import { RectButtonProps, RectButton } from 'react-native-gesture-handler';
import { SvgFromUri } from 'react-native-svg';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface PlantCardProps extends RectButtonProps {
  plant: {
    name: string;
    photo: string;
  }
}

export function PlantCardPrimary({ plant, ...rest }: PlantCardProps) {
  return (
    <RectButton style={style.container} {...rest}>
      <SvgFromUri uri={plant.photo} width={70} height={70} />

      <Text style={style.title}>
        {plant.name}
      </Text>
    </RectButton>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: '45%',
    backgroundColor: colors.shape,
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    margin: 10
  },
  title: {
    color: colors.green_dark,
    fontFamily: fonts.heading,
    marginVertical: 16
  }
})