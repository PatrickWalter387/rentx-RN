import React, { useEffect } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, interpolate, runOnJS, Extrapolate } from 'react-native-reanimated';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';

import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';

import {
  Container
} from './styles';

export function Splash(){
    const navigator : NavigationProp<ParamListBase> = useNavigation();

    const animation = useSharedValue(0);

    const brandStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(animation.value, [0, 25, 50], [1, .3, 0]),
            transform: [
                {
                    translateX: interpolate(animation.value, [0, 50], [0, -50], Extrapolate.CLAMP)
                }
            ]
        };
    });

    const logoStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(animation.value, [0, 25, 50], [0, .3, 1]),
            transform: [
                {
                    translateX: interpolate(animation.value, [0, 50], [-50, 0], Extrapolate.CLAMP)
                }
            ]
        };
    });

    function startApp() {
        navigator.navigate('Home');
    }

    useEffect(() => {
        animation.value = withTiming(50, { duration: 2500 }, () => {
            'worklet';
            runOnJS(startApp)();
        });
    }, []);

    return (
        <Container>
            <Animated.View style={[brandStyle, { position: 'absolute' }]}>
                <BrandSvg />
            </Animated.View>

            <Animated.View style={[logoStyle, { position: 'absolute' }]}>
                <LogoSvg />
            </Animated.View>
        </Container>
    );
}