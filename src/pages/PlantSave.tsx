import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { useNavigation, useRoute } from '@react-navigation/core';
import { format, isBefore } from 'date-fns';
import React, { useState } from 'react';
import { Alert, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { SvgFromUri } from 'react-native-svg';

import waterdropIcon from '../assets/waterdrop.png';

import { Button } from '../components/Button';
import { PlantProps, savePlant } from '../libs/storage';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface PlantParams {
  plant: PlantProps;
}

export default function PlantSave() {
  const navigation = useNavigation();
  const route = useRoute();
  const { plant } = route.params as PlantParams;

  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');

  function handleChangeTime(event: Event, dateTime: Date | undefined) {
    if (Platform.OS === 'android') {
      setShowDatePicker(!showDatePicker)
    }

    if (dateTime && isBefore(dateTime, new Date())) {
      setSelectedDateTime(new Date());

      return Alert.alert('Escolha um horário de lembrete');
    }

    if (dateTime) {
      setSelectedDateTime(dateTime);
    }
  }

  function handleToggleDateTimePicker() {
    setShowDatePicker(!showDatePicker);
  }

  async function handleSavePlant() {
    try {
      await savePlant({
        ...plant,
        dateTimeNotification: selectedDateTime
      });

      navigation.navigate('Confirmation', {
        title: 'Tudo certo!',
        subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua planta.',
        buttonTitle: 'Muito obrigado',
        icon: 'hug',
        nextScreen: 'MyPlants'
      });
    } catch {
      Alert.alert('Não foi possível salvar a sua planta.')
    }
  }

  return (
    <ScrollView 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={style.container}
    >
      <View style={style.container}>
        <View style={style.info}>
          <SvgFromUri uri={plant.photo} height={150} width={150} />

          <Text style={style.name}>
            {plant.name}
          </Text>

          <Text style={style.about}>
            {plant.about}
          </Text>
        </View>

        <View style={style.controller}>
          <View style={style.tipContainer}>
            <Image source={waterdropIcon} style={style.tipImage}/>

            <Text style={style.tipText}>
              {plant.water_tips}
            </Text>
          </View>

          <Text style={style.alertLabel}>
            Clique no horário para definir a notificação de quando regar a sua planta
          </Text>

          {
            showDatePicker && 
            <DateTimePicker
              value={selectedDateTime} 
              mode="time"
              display="spinner"
              onChange={handleChangeTime}
            />
          }

          {
            Platform.OS === 'android' && (
              <TouchableOpacity
                style={style.dateTimePickerButton}
                onPress={handleToggleDateTimePicker}
              >
                <Text style={style.dateTimePickerText}>
                  {format(selectedDateTime, 'HH:mm')}
                </Text>
              </TouchableOpacity>
            )
          }

          <Button title="Cadastrar planta" onPress={handleSavePlant} />
        </View>
      </View>
    </ScrollView>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.shape
  },
  info: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.shape,
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
  name: {
    color: colors.heading,
    fontFamily: fonts.heading,
    fontSize: 24,
    marginTop: 15
  },
  about: {
    color: colors.heading,
    fontFamily: fonts.text,
    fontSize: 17,
    marginTop: 10,
    textAlign: 'center'
  },
  controller: {
    backgroundColor: colors.white,
    paddingBottom: getBottomSpace() || 20,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.blue_light,
    borderRadius: 20,
    padding: 20,
    position: 'relative',
    bottom: 60
  },
  tipImage: {
    height: 56,
    width: 45
  },
  tipText: {
    flex: 1,
    color: colors.blue,
    fontFamily: fonts.text,
    fontSize: 17,
    marginLeft: 20,
    textAlign: 'justify'
  },
  dateTimePickerButton: {
    alignItems: 'center',
    paddingVertical: 40,
    width: '100%'
  },
  dateTimePickerText: {
    color: colors.heading,
    fontFamily: fonts.heading,
    fontSize: 24
  },
  alertLabel: {
    color: colors.heading,
    fontFamily: fonts.complement,
    fontSize: 15,
    marginBottom: 5,
    textAlign: 'center'
  },
})