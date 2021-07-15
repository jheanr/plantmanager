import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Animated, StyleSheet, Text, View } from "react-native";
import { RectButtonProps, RectButton, Swipeable } from 'react-native-gesture-handler';
import { SvgFromUri } from 'react-native-svg';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface PlantCardProps extends RectButtonProps {
  plant: {
    name: string;
    photo: string;
    hour: string;
  },
  handleRemovePlant: () => void;
}

export function PlantCardSecondary({ plant, handleRemovePlant, ...rest }: PlantCardProps) {
  return (
    <Swipeable
      overshootRight={false}
      renderRightActions={() => (
        <Animated.View>
          <View>
            <RectButton
              style={style.buttonRemove}
              onPress={handleRemovePlant}
            >
              <Feather name="trash" size={32} color={colors.white} />
            </RectButton>
          </View>
        </Animated.View>
      )}
    >
      <RectButton style={style.container} {...rest}>
        <SvgFromUri uri={plant.photo} width={50} height={50} />

        <Text style={style.title}>
          {plant.name}
        </Text>

        <View style={style.details}>
          <Text style={style.timeLabel}>
            Regar às
          </Text>

          <Text style={style.time}>
            {plant.hour}
          </Text>
        </View>
      </RectButton>
    </Swipeable>
  )
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.shape,
    borderRadius: 20,
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 25,
    width: '100%'
  },
  title: {
    flex: 1,
    color: colors.heading,
    fontFamily: fonts.heading,
    fontSize: 17,
    marginLeft: 10
  },
  details: {
    alignItems: 'flex-end'
  },
  timeLabel: {
    color: colors.body_light,
    fontFamily: fonts.text,
    fontSize: 16,
  },
  time: {
    color: colors.body_dark,
    fontFamily: fonts.heading,
    fontSize: 16,
    marginTop: 5,
  },
  buttonRemove: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.red,
    borderRadius: 20,
    height: 85,
    marginTop: 15,
    paddingLeft: 15,
    position: 'relative',
    right: 20,
    width: 120
  }
})