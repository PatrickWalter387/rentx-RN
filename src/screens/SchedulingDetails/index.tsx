import React from 'react';
import { useNavigation, NavigationProp, ParamListBase, useRoute } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { Alert, StatusBar } from 'react-native';
import { format } from 'date-fns';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';
import { CarDTO } from '../../dtos/CarDTO';

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
    Acessories,
    Footer,
    RentalPeriod,
    CalendarIcon,
    DateInfo,
    DateTitle,
    DateValue,
    RentalPrice,
    RentalPriceLabel,
    RentalPriceDetails,
    RentalPriceQuota,
    RentalPriceTotal
} from './styles';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { getPlatformDate } from '../../utils/getPlataformDate';
import api from '../../services/api';

interface Params {
    car: CarDTO;
    dates: string[];
}

export function SchedulingDetails() {
    const theme = useTheme();
    const navigator : NavigationProp<ParamListBase> = useNavigation();

    const route = useRoute();
    const { car, dates } = route.params as Params;

    async function handleConfirm(){
        try {
            const schedulesByCar = await api.get(`schedules_bycars/${car.id}`);
      
            const unavailable_dates = [
                ...schedulesByCar.data.unavailable_dates,
                ...dates
            ]
      
            await api.put(`schedules_bycars/${car.id}`, {
                id: car.id,
                unavailable_dates
            })
      
            navigator.navigate('SchedulingComplete');
        } 
        catch {
            Alert.alert('Não foi possível confirmar o agendamento')
        }
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

                <Acessories>
                    {
                        car.accessories.map(item => (
                            <Accessory name={item.name} icon={getAccessoryIcon(item.type)} key={item.id} />
                        ))
                    }
                </Acessories>

                <RentalPeriod>
                    <CalendarIcon>
                        <Feather 
                            name="calendar"
                            size={RFValue(24)}
                            color={theme.colors.shape}
                        />
                    </CalendarIcon>

                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue>{format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy')}</DateValue>
                    </DateInfo>

                    <Feather 
                        name="chevron-right"
                        size={RFValue(10)}
                        color={theme.colors.text}
                    />

                    <DateInfo>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue>{format(getPlatformDate(new Date(dates[dates.length-1])), 'dd/MM/yyyy')}</DateValue>
                    </DateInfo>
                </RentalPeriod>

                <RentalPrice>
                    <RentalPriceLabel>Total</RentalPriceLabel>
                    <RentalPriceDetails>
                        <RentalPriceQuota>R$ {car.rent.price} x{dates.length} diárias</RentalPriceQuota>
                        <RentalPriceTotal>R$ {car.rent.price * dates.length}</RentalPriceTotal>
                    </RentalPriceDetails>
                </RentalPrice>
            </Content>

            <Footer>
                <Button title="Alugar agora" onPress={handleConfirm} color={theme.colors.success} />
            </Footer>
        </Container>
    );
}