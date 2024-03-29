import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { Confirmation } from '../screens/Confirmation';
import { MyCars } from '../screens/MyCars';
import { SignIn } from '../screens/SignIn';
import { FirstStep } from '../screens/SignUp/FirstStep';
import { SecondStep } from '../screens/SignUp/SecondStep';

export function AppStackRoutes(){
    const { Navigator, Screen } = createNativeStackNavigator();

    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen 
                name="Home"
                component={Home}
            />
            
            <Screen 
                name="CarDetails"
                component={CarDetails}
            />

            <Screen 
                name="Scheduling"
                component={Scheduling}
            />

            <Screen 
                name="SchedulingDetails"
                component={SchedulingDetails}
            />
            
            <Screen 
                name="Confirmation"
                component={Confirmation}
            />
        </Navigator>
    );
}