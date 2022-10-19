import React, { useEffect, useState } from 'react';
import { useNavigation, NavigationProp, ParamListBase, useFocusEffect, CommonActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import styled, { useTheme } from 'styled-components';
import { GestureHandlerRootView, PanGestureHandler, TouchableOpacity } from 'react-native-gesture-handler';
import { Alert, BackHandler } from 'react-native';

import {
  Container,
  Header,
  Total,
  Content,
  MyCarsButton
} from './styles';

import Logo from '../../assets/logo.svg';
import { CarCard } from '../../components/CarCard';
import { CarDTO } from '../../dtos/CarDTO';
import api from '../../services/api';
import { database } from '../../database';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync';
import { Car as ModelCar } from '../../database/models/Car';

const ButtonAnimated = Animated.createAnimatedComponent(TouchableOpacity);

export function Home(){
  const [carsData, setCarsData] = useState<CarDTO[]>([]);
  const navigator : NavigationProp<ParamListBase> = useNavigation();
  const netInfo = useNetInfo();

  const theme = useTheme();

  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);

  const animatedMyCarsViewStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value }
      ]
    }
  })

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = positionX.value,
      ctx.positionY = positionY.value
    },
    onActive(event, ctx: any) {
      positionX.value = event.translationX + ctx.positionX,
      positionY.value = event.translationY + ctx.positionY
    },
    onEnd() {
      positionX.value = withSpring(0),
      positionY.value = withSpring(0)
    }
  });

  useEffect(() => {
    (async function(){
      const carCollection = database.get<ModelCar>('cars');
      const cars = await carCollection.query().fetch();
      const carsDTO = cars.map(car => car._raw as unknown as CarDTO);
      setCarsData(carsDTO);
    })();
  },[]);

  //Bloquea acao do botao caso necessario
  //useFocusEffect(() => {
  //  const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
  //
  //  return backHandler.remove();
  //});

  function handleConfirm(car: CarDTO) {
    navigator.navigate('CarDetails', { car });
  }

  function handleOpenMyCars() {
    navigator.navigate('MyCars')
  }

  async function offlineSyncronize() {
    await synchronize({
        database,
        pullChanges: async ({ lastPulledAt }) => {
          const response = await api
            .get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`)

          const { changes, latestVersion } = response.data
          return { changes, timestamp: latestVersion }
        },
        pushChanges: async ({ changes }) => {
          const user = changes.users;
          await api.post('/users/sync', user);
        }
    })
  }
  
  useEffect(() => {
    if (netInfo.isConnected === true) {
      offlineSyncronize();
    }
  }, [netInfo.isConnected])

  return (
      <Container>
        <Header>
          <Logo />

          <Total>Total de 12 carros</Total>
        </Header>
        
        <Content
          data={carsData}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <CarCard data={item} onPress={() => handleConfirm(item)} /> }
        />

        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View 
          style={[
            animatedMyCarsViewStyle,
            { 
              position: 'absolute',
              bottom: RFValue(13),
              right: RFValue(22),
            }
          ]}>
            <ButtonAnimated onPress={handleOpenMyCars} style={
              { 
                width: RFValue(60),
                height: RFValue(60),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: RFValue(30),
                backgroundColor: theme.colors.main
              }
            }>
              <Ionicons 
                name="ios-car-sport" 
                size={32}
                color={theme.colors.background_secondary}
              />
            </ButtonAnimated>
          </Animated.View>
        </PanGestureHandler>
      </Container>
  );
}