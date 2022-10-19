import React, { useEffect, useState } from 'react';
import { useNavigation, NavigationProp, ParamListBase, useRoute } from '@react-navigation/native';
import Animated, { Extrapolate, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { StatusBar, StyleSheet } from 'react-native';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { CarDTO } from '../../dtos/CarDTO';

import {
    Container, 
    Header, 
    CarImages,
    Details,
    Description,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    About,
    Accessories,
    Footer,
    OfflineInfo
} from './styles';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useNetInfo } from '@react-native-community/netinfo';
import api from '../../services/api';

interface Params {
    car: CarDTO;
}

export function CarDetails() {
    const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);

    const navigator : NavigationProp<ParamListBase> = useNavigation();
    const netInfo = useNetInfo();

    const scrollY = useSharedValue(0);
    const handleScroll = useAnimatedScrollHandler(event => {
        scrollY.value = event.contentOffset.y;
    });

    const headerStyleAnimation = useAnimatedStyle(() => {
        return {
            height: interpolate(
                scrollY.value,
                [0, 220],
                [220, 90],
                Extrapolate.CLAMP
            )
        }
    });

    const sliderCarsStyleAnimation = useAnimatedStyle(() => {
        return {
                opacity: interpolate(
                scrollY.value,
                [0, 150],
                [1, 0],
                Extrapolate.CLAMP
            )
        }
    });

    const route = useRoute();
    const { car } = route.params as Params;

    function handleConfirm(){
        navigator.navigate('Scheduling', { car: carUpdated });
    }

    function handleGoBack(){
        navigator.goBack();
    }

    useEffect(() => {
        async function fetchOnlineData() {
            const response = await api.get(`cars/${car.id}`);
            setCarUpdated(response.data);
        }

        if (netInfo.isConnected === true) {
            fetchOnlineData();
        }
    }, [netInfo.isConnected])

    return (
        <Container>
            <Animated.View style={[headerStyleAnimation, styles.header, { backgroundColor: '#ffffff' }]}>
                <Header>
                    <StatusBar 
                        barStyle="dark-content"
                        translucent
                        backgroundColor="transparent"
                    />
                    <BackButton onPress={handleGoBack} />
                </Header>

                <Animated.View style={[sliderCarsStyleAnimation]}>
                    <CarImages>
                        <ImageSlider imagesUrl={
                            !!carUpdated.photos
                                ? carUpdated.photos
                                : [{ id: car.thumbnail, photo: car.thumbnail }]
                        } />
                    </CarImages>
                </Animated.View>
            </Animated.View>

            <Animated.ScrollView
                contentContainerStyle={{
                    padding: 24,
                    alignItems: 'center',
                    paddingTop: getStatusBarHeight() + 160
                }}
                showsVerticalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>

                    <Rent>
                        <Period>{car.period}</Period>
                        <Price>R$ {netInfo.isConnected === true ? car.price : '...'}</Price>
                    </Rent>
                </Details>

                <Accessories>
                    {
                        carUpdated.accessories &&
                        <Accessories>
                            {
                                carUpdated.accessories.map(accessory => (
                                    <Accessory
                                        key={accessory.type}
                                        name={accessory.name}
                                        icon={getAccessoryIcon(accessory.type)}
                                    />
                                ))
                            }
                        </Accessories>
                    }
                </Accessories>

                <About>{car.about}</About>
            </Animated.ScrollView>

            <Footer>
                <Button title='Escolher período do aluguel' onPress={handleConfirm} loading={netInfo.isConnected === false} />

                {
                    netInfo.isConnected === false &&
                    <OfflineInfo>
                        Conecte-se a internet para ver mais detalhes e agendar seu carro.
                    </OfflineInfo>
                }
            </Footer>
        </Container>
    );
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        overflow: 'hidden',
        zIndex: 1
    }
});