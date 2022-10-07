import React, { useEffect, useState } from 'react';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

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
import { useTheme } from 'styled-components';

export function Home(){
  const [carsData, setCarsData] = useState<CarDTO[]>([]);
  const navigator : NavigationProp<ParamListBase> = useNavigation();

  const theme = useTheme();

  useEffect(() => {
    (async function(){
      const response = await api.get("/cars");
      setCarsData(response.data);
    })();
  },[]);

  function handleConfirm(car: CarDTO){
    navigator.navigate('CarDetails', { car });
  }

  function handleOpenMyCars() {
    navigator.navigate('MyCars')
  }

  return (
    <Container>
      <Header>
        <Logo />

        <Total>Total de 12 carros</Total>
      </Header>
      
      <Content
        data={carsData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <CarCard data={item} onPress={() => handleConfirm(item)} key={item.id} /> }
      />

      <MyCarsButton onPress={handleOpenMyCars}>
        <Ionicons 
          name="ios-car-sport" 
          size={32}
          color={theme.colors.background_secondary}
        />
      </MyCarsButton>
    </Container>
  );
}