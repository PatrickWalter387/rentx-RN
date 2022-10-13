import React from 'react';
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
    Footer
} from './styles';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

interface Params {
    car: CarDTO;
}

export function CarDetails() {
    const navigator : NavigationProp<ParamListBase> = useNavigation();

    const scrollY = useSharedValue(0);
    const handleScroll = useAnimatedScrollHandler(event => {
        scrollY.value = event.contentOffset.y;
        console.log(event.contentOffset.y);
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
        navigator.navigate('Scheduling', { car });
    }

    function handleGoBack(){
        navigator.goBack();
    }

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
                        <ImageSlider 
                            imagesUrl={car.photos}
                        />
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
                        <Price>R$ {car.price}</Price>
                    </Rent>
                </Details>

                <Accessories>
                    {
                        car.accessories.map(item => (
                            <Accessory name={item.name} icon={getAccessoryIcon(item.type)} key={item.type} />
                        ))
                    }
                </Accessories>

                <About>{car.about}</About>
            </Animated.ScrollView>

            <Footer>
                <Button title='Escolher período do aluguel' onPress={handleConfirm} />
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