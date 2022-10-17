import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Home } from '../screens/Home';
import { MyCars } from '../screens/MyCars';
import { AppStackRoutes } from './app.stack.routes';
import { Profile } from '../screens/Profile';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppTabRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen 
                name="HomeSplash"
                component={AppStackRoutes}
            />

            <Screen 
                name="MyCars"
                component={MyCars}
            />

            <Screen 
                name="Profile"
                component={Profile}
            />
        </Navigator>
    )
}