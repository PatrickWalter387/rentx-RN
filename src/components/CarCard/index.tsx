import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import GasolineSVG from '../../assets/gasoline.svg';
import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import {
    Container,
    Details,
    Brand,
    Name,
    Rent,
    Period,
    About,
    Price,
    CarImage
} from './styles';

interface Props extends TouchableOpacityProps {
    data: CarDTO;
}

export function CarCard({ data, ...rest } : Props){
    const MotorIcon = getAccessoryIcon(data.fuel_type);

    return (
        <Container {...rest}>
            <Details>
                <Brand>{data.brand}</Brand>
                <Name>{data.name}</Name>
                
                <Rent>
                    <About>
                        <Period>{data.rent.period}</Period>
                        <Price>R$ {data.rent.price}</Price>
                    </About>
                    <MotorIcon />
                </Rent>
            </Details>

            <CarImage 
                source={{ uri: data.thumbnail }} 
                resizeMode='contain'
            />
        </Container>
    );
}