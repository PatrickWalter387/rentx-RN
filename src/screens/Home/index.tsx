import React, { useEffect, useState } from 'react';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';

import {
  Container,
  Header,
  Total,
  Content
} from './styles';

import Logo from '../../assets/logo.svg';
import { CarCard } from '../../components/CarCard';
import { CarDTO } from '../../dtos/CarDTO';
import api from '../../services/api';

export function Home(){
  const [carsData, setCarsData] = useState<CarDTO[]>([]);
  const { navigate }: NavigationProp<ParamListBase> = useNavigation();

  useEffect(() => {
    (async function(){
      const response = await api.get("/cars");
      setCarsData(response.data);
    })();
  },[]);

  function handleConfirm(car: CarDTO){
    navigate('CarDetails', { car });
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
    </Container>
  );
}