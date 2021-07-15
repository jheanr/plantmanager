import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

import { EnvironmentButton } from '../components/EnvironmentButton';
import { Header } from '../components/Header';
import { Load } from '../components/Load';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { PlantProps } from '../libs/storage';
import api from '../services/api';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnvironmentProps {
  key: string;
  title: string;
}

export default function PlantSelect() {
  const [environments, setEnvironments] = useState<EnvironmentProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [plantsFiltered, setPlantsFiltered] = useState<PlantProps[]>([]);
  const [environmentActive, setEnvironmentActive] = useState('all');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const navigation = useNavigation();

  async function getPlants() {
    const { data } = await api.get('/plants', {
      params: {
        _sort: 'name',
        _order: 'asc',
        _page: page,
        _limit: 8
      }
    });

    if (!data)
      return setLoading(true);

    if (page > 1) {
      setPlants(oldValue => [...oldValue, ...data]);
      setPlantsFiltered(oldValue => [...oldValue, ...data]);
    } else {
      setPlants(data);
      setPlantsFiltered(data);
    }

    setLoading(false);
    setLoadingMore(false);
  }

  function handleSelectedEnvironment(environment: string) {
    setEnvironmentActive(environment);

    if (environment === 'all')
      return setPlantsFiltered(plants);

    const filteredPlants = plants.filter(plant => plant.environments.includes(environment));

    setPlantsFiltered(filteredPlants);
  }

  function handleGetMorePlants(distance: number) {
    if (distance < 1)
      return;

    setLoadingMore(true);
    setPage(oldValue => oldValue + 1);
    getPlants();
  }

  function handleSelectPlant(plant: PlantProps) {
    navigation.navigate('PlantSave', { plant });
  }

  useEffect(() => {
    async function getEnvironments() {
      const { data } = await api.get('/plants_environments', {
        params: {
          _sort: 'title',
          _order: 'asc'
        }
      });

      setEnvironments([
        {
          key: 'all',
          title: 'Todos'
        },
        ...data
      ]);
    }

    getEnvironments();
  }, []);

  useEffect(() => {
    getPlants();
  }, []);

  if (loading)
    return <Load />

  return (
    <View style={style.container}>
      <View style={style.header}>
        <Header />

        <Text style={style.title}>
          Em qual ambiente
        </Text>
        <Text style={style.subtitle}>
          você quer colocar sua planta?
        </Text>
      </View>

      <View>
        <FlatList
          data={environments} 
          keyExtractor={(item) => String(item.key)}
          renderItem={({ item }) => (
            <EnvironmentButton
              title={item.title}
              active={item.key === environmentActive} 
              onPress={() => handleSelectedEnvironment(item.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={style.environmentList}
        />
      </View>

      <View style={style.plants}>
        <FlatList 
          data={plantsFiltered} 
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardPrimary
              plant={item} 
              onPress={() => handleSelectPlant(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) => {
            handleGetMorePlants(distanceFromEnd)
          }}
          ListFooterComponent={
            loadingMore ? <ActivityIndicator color={colors.green} /> : <></>
          }
        />
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  header: {
    paddingHorizontal: 30
  },
  title: {
    color: colors.heading,
    fontFamily: fonts.heading,
    fontSize: 17,
    lineHeight: 20,
    marginTop: 15
  },
  subtitle: {
    color: colors.heading,
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 20,
  },
  environmentList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    marginLeft: 30,
    marginVertical: 30
  },
  plants: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20
  }
})