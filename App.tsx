import { StatusBar } from 'react-native';
import React from 'react';

import { useFonts, Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import { Archivo_400Regular, Archivo_500Medium, Archivo_600SemiBold } from '@expo-google-fonts/archivo';
import { Home } from './src/screens/Home';
import { ThemeProvider } from 'styled-components/native';
import theme from './src/global/styles/theme';
import { CarDetails } from './src/screens/CarDetails';
import { Scheduling } from './src/screens/Scheduling';
import { SchedulingDetails } from './src/screens/SchedulingDetails';
import { Confirmation } from './src/screens/Confirmation';
import { Routes } from './src/routes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold
  });

  if(!fontsLoaded)
    return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <StatusBar backgroundColor='transparent' barStyle={'light-content'} translucent />
        <Routes />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}