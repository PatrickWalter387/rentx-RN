import React from 'react';
import { useWindowDimensions } from 'react-native';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';

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

export function SchedulingComplete(){
    const { width } = useWindowDimensions();
    const { navigate }: NavigationProp<ParamListBase> = useNavigation();

    function handleConfirm(){
        navigate('Home');
    }

    return (
        <Container>
            <BackgroundLogoSvg width={width} />

            <Content>
                <DoneSvg width={RFValue(100)} height={RFValue(100)}  />
                
                <Title>Carro alugado!</Title>
                <Description>
                    Agora você só precisa ir {'\n'}
                    até a concessionária da RENTX {'\n'}
                    pegar o seu automóvel.
                </Description>
            </Content>

            <Footer>
                <ConfirmButton title='Ok' onPress={handleConfirm} />
            </Footer>
        </Container>
    );
}