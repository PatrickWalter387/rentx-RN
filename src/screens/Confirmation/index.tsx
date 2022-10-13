import React from 'react';
import { useWindowDimensions } from 'react-native';
import { useNavigation, NavigationProp, ParamListBase, useRoute } from '@react-navigation/native';

import BackgroundLogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import { ConfirmButton } from '../../components/ConfirmButton';

import {
    Container,
    Content,
    Title,
    Description,
    Footer
} from './styles';
import { RFValue } from 'react-native-responsive-fontsize';

interface Params {
    title: string;
    message: string;
    screenToNavigate: string;
}

export function Confirmation(){
    const { width } = useWindowDimensions();
    const  navigator : NavigationProp<ParamListBase> = useNavigation();
 
    const route = useRoute();
    const { title, message, screenToNavigate } = route.params as Params;

    function handleConfirm(){
        navigator.reset({
            index: 0,
            routes: [{ name: screenToNavigate }]
        });
    }

    return (
        <Container>
            <BackgroundLogoSvg width={width} />

            <Content>
                <DoneSvg width={RFValue(100)} height={RFValue(100)}  />
                
                <Title>{title}</Title>
                <Description>{message}</Description>
            </Content>

            <Footer>
                <ConfirmButton title='Ok' onPress={handleConfirm} />
            </Footer>
        </Container>
    );
}