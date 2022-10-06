import React from 'react';
import { useNavigation, NavigationProp, ParamListBase, useRoute } from '@react-navigation/native';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';

import SpeedSvg from '../../assets/speed.svg';
import AccelerationSvg from '../../assets/acceleration.svg';
import ForceSvg from '../../assets/force.svg';
import GasolineSvg from '../../assets/gasoline.svg';
import ExchangeSvg from '../../assets/exchange.svg';
import PeopleSvg from '../../assets/people.svg';

import {
    Container, 
    Header, 
    CarImages,
    Content,
    Details,
    Description,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    About,
    Accessories,
    Footer
} from './styles';
import { Button } from '../../components/Button';
import { StatusBar } from 'react-native';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { CarDTO } from '../../dtos/CarDTO';

interface Params {
    car: CarDTO;
}

export function CarDetails() {
    const navigator : NavigationProp<ParamListBase> = useNavigation();

    const route = useRoute();
    const { car } = route.params as Params;

    function handleConfirm(){
        navigator.navigate('Scheduling');
    }

    function handleGoBack(){
        navigator.goBack();
    }

    return (
        <Container>
            <Header>
                <StatusBar 
                    barStyle="dark-content"
                    translucent
                    backgroundColor="transparent"
                />
                <BackButton onPress={handleGoBack} />
            </Header>

            <CarImages>
                <ImageSlider 
                    imagesUrl={car.photos}
                />
            </CarImages>

            <Content>
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>

                    <Rent>
                        <Period>{car.rent.period}</Period>
                        <Price>R$ {car.rent.price}</Price>
                    </Rent>
                </Details>

                <Accessories>
                    {
                        car.accessories.map(item => (
                            <Accessory name={item.name} icon={getAccessoryIcon(item.type)} key={item.id} />
                        ))
                    }
                </Accessories>

                <About>{car.about}</About>
            </Content>

            <Footer>
                <Button title='Escolher período do aluguel' onPress={handleConfirm} />
            </Footer>
        </Container>
    );
}