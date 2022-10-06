import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import GasolineSVG from '../../assets/gasoline.svg';

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

export function CarCard({ ...rest } : TouchableOpacityProps){
  return (
    <Container {...rest}>
        <Details>
            <Brand>Audi</Brand>
            <Name>RS 5 Coupé</Name>
            
            <Rent>
                <Period>Ao dia</Period>
                <About>
                    <Price>R$ 120</Price>
                    <GasolineSVG />
                </About>
            </Rent>
        </Details>

        <CarImage 
            source={{ uri: 'https://production.autoforce.com/uploads/version/profile_image/6737/comprar-tiptronic_13d79f3c1b.png' }} 
            resizeMode='contain'
        />
    </Container>
  );
}