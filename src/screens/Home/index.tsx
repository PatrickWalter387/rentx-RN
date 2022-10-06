import React from 'react';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';

import {
  Container,
  Header,
  Total,
  Content
} from './styles';

import Logo from '../../assets/logo.svg';
import { CarCard } from '../../components/CarCard';

const carData = {
  brand: 'Porsche',
    name: 'Panamera',
    rent: {
      period: 'Ao dia',
      price: 340
    },
    thumbnail: 'https://assets.stickpng.com/images/580b585b2edbce24c47b2cae.png'
}

export function Home(){
  const { navigate }: NavigationProp<ParamListBase> = useNavigation();

  function handleConfirm(){
    navigate('CarDetails');
  }

  return (
    <Container>
      <Header>
        <Logo />

        <Total>Total de 12 carros</Total>
      </Header>

      <Content>
        <CarCard onPress={handleConfirm} />
        <CarCard onPress={handleConfirm} />
      </Content>
    </Container>
  );
}