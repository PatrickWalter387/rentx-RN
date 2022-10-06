import React, { useState } from 'react';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';

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

export function Scheduling(){
    const theme = useTheme();
    const navigator : NavigationProp<ParamListBase> = useNavigation();

    const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps)
    const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps)

    function handleConfirm(){
        navigator.navigate('SchedulingDetails');
    }

    function handleGoBack(){
        navigator.goBack();
    }

    function handleSelectDate(date: DayProps) {
        let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
        let end = date;
    
        if(start.timestamp > end.timestamp) {
            start = end;
            end = start;
        }
    
        setLastSelectedDate(end);
        const interval = generateInterval(start, end);
        setMarkedDates(interval);
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
                        <DateValue selected={true}>123321</DateValue>
                    </DateInfo>

                    <ArrowSVG />

                    <DateInfo>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue></DateValue>
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
                <Button title='Confirmar' onPress={handleConfirm} />
            </Footer>
        </Container>
    );
}