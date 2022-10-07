import React, { useState } from 'react';
import { useNavigation, NavigationProp, ParamListBase, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import { format } from 'date-fns';

import ArrowSVG from '../../assets/arrow.svg';

import {
    Container,
    Header,
    Title,
    RentalPeriod,
    DateInfo,
    DateTitle,
    DateValue,
    Content,
    Footer
} from './styles';
import { Button } from '../../components/Button';
import { Calendar, DayProps, generateInterval, MarkedDateProps } from '../../components/Calendar';

import { Alert } from 'react-native';
import { CarDTO } from '../../dtos/CarDTO';
import { getPlatformDate } from '../../utils/getPlataformDate';

interface RentalPeriod {
    startFormatted: string;
    endFormatted: string;

}

interface Params {
    car: CarDTO;
}

export function Scheduling(){
    const theme = useTheme();
    const navigator : NavigationProp<ParamListBase> = useNavigation();

    const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps)
    const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps)
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)

    const route = useRoute();
    const { car } = route.params as Params;

    function handleConfirm(){
        navigator.navigate('SchedulingDetails', {
            car,
            dates: Object.keys(markedDates)
        });
    }

    function handleGoBack(){
        navigator.goBack();
    }

    function handleSelectDate(date: DayProps) {
        let start : DayProps;
        let end : DayProps;
        
        if(!!lastSelectedDate.timestamp){
            var inicialDate = new Date(Object.keys(markedDates)[0]);
            var finallDate = new Date(Object.keys(markedDates)[Object.keys(markedDates).length - 1]);

            if(inicialDate.getTime() == lastSelectedDate.timestamp){
                if(inicialDate.getTime() > date.timestamp) {
                    start = date;
                    end = {
                        dateString: format(getPlatformDate(inicialDate), 'yyyy-MM-dd'),
                        year: inicialDate.getFullYear(),
                        month: inicialDate.getMonth(),
                        day: inicialDate.getDay(),
                        timestamp: inicialDate.getTime()
                    };
                }
                else{
                    start = {
                        dateString: format(getPlatformDate(inicialDate), 'yyyy-MM-dd'),
                        year: inicialDate.getFullYear(),
                        month: inicialDate.getMonth(),
                        day: inicialDate.getDay(),
                        timestamp: inicialDate.getTime()
                    };
                    end = date;
                }
            }
            else{
                if(finallDate.getTime() < date.timestamp) {
                    start = {
                        dateString: format(getPlatformDate(finallDate), 'yyyy-MM-dd'),
                        year: finallDate.getFullYear(),
                        month: finallDate.getMonth(),
                        day: finallDate.getDay(),
                        timestamp: finallDate.getTime()
                    };
                    end = date;
                }
                else{
                    start = date;
                    end = {
                        dateString: format(getPlatformDate(finallDate), 'yyyy-MM-dd'),
                        year: finallDate.getFullYear(),
                        month: finallDate.getMonth(),
                        day: finallDate.getDay(),
                        timestamp: finallDate.getTime()
                    };
                }
            }
        }
        else{
            start = date;
            end = date;
        }
    
        setLastSelectedDate(date);
        const interval = generateInterval(start, end);
        setMarkedDates(interval);

        const firstDate = Object.keys(interval)[0];
        const endDate = Object.keys(interval)[Object.keys(interval).length - 1];
        setRentalPeriod({
            startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
            endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
        })
    }

    return (
        <Container>
            <Header>
                <BackButton onPress={handleGoBack} color={theme.colors.shape} />

                <Title>
                    Escolha uma {'\n'}
                    data de início e {'\n'}
                    fim do aluguel
                </Title>

                <RentalPeriod>
                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue selected={!!rentalPeriod.startFormatted}>
                            {rentalPeriod.startFormatted}
                        </DateValue>
                    </DateInfo>

                    <ArrowSVG />

                    <DateInfo>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue selected={!!rentalPeriod.endFormatted}>
                            {rentalPeriod.endFormatted}
                        </DateValue>
                    </DateInfo>
                </RentalPeriod>
            </Header>

            <Content>
                <Calendar
                    markedDates={markedDates}
                    onDayPress={handleSelectDate}
                />
            </Content>

            <Footer>
                <Button title='Confirmar' onPress={handleConfirm} disabled={!rentalPeriod.startFormatted || !rentalPeriod.endFormatted} />
            </Footer>
        </Container>
    );
}