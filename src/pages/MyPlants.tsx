import { formatDistance } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, StyleSheet, Text, View } from "react-native";

import waterdropIcon from '../assets/waterdrop.png';
import { Header } from '../components/Header';
import { Load } from '../components/Load';
import { PlantCardSecondary } from '../components/PlantCardSecondary';
import { getPlants, PlantProps, removePlant } from '../libs/storage';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export default function MyPlants() {
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWatering, setNextWatering] = useState('');

  function handleRemovePlant(plant: PlantProps) {
    Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [
      {
        text: 'Não',
        style: 'cancel'
      },
      {
        text: 'Sim',
        onPress: async () => {
          try {
            await removePlant(plant.id);

            const updatedPlants = plants.filter(currentPlant => currentPlant.id !== plant.id);

            setPlants(updatedPlants);
          } catch {
            Alert.alert('Não foi possível remover a planta.');
          }
        }
      }
    ]);
  }

  useEffect(() => {
    async function getNextWatering() {
      const plantsStorage = await getPlants();

      const nextTime = formatDistance(
        new Date(plantsStorage[0].dateTimeNotification).getTime(), 
        new Date().getTime(),
        { locale: ptBR }
      );

      setNextWatering(
        `Não esqueça de regar a ${plantsStorage[0].name}! ${nextTime}.`
      )

      setPlants(plantsStorage);
      setLoading(!loading);
    }

    getNextWatering();
  }, [])

  if (loading)
    return <Load />

  return (
    <View style={style.container}>
      <Header />

      <View style={style.spotlight}>
        <Image
          source={waterdropIcon} 
          style={style.spotlightImage}
        />

        <Text style={style.spotlightText}>
          {nextWatering}
        </Text>
      </View>

      <View style={style.plants}>
        <Text style={style.plantsTitle}>
          Próximas regadas
        </Text>

        <FlatList 
          data={plants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardSecondary
              plant={item}
              handleRemovePlant={() => handleRemovePlant(item)} 
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
    paddingHorizontal: 30,
  },
  spotlight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.blue_light,
    borderRadius: 20,
    height: 110,
    paddingHorizontal: 20,
  },
  spotlightImage: {
    height: 60,
    width: 60
  },
  spotlightText: {
    flex: 1,
    color: colors.blue,
    fontFamily: fonts.complement,
    paddingHorizontal: 20,
  },
  plants: {
    flex: 1,
    width: '100%'
  },
  plantsTitle: {
    color: colors.heading,
    fontFamily: fonts.heading,
    fontSize: 24,
    marginVertical: 20
  }
})