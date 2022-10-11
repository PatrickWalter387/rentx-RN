import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';
 
import {
    Container,
    Title
} from './styles';

interface Props extends TouchableOpacityProps {
    title: string;
    color?: string;
    light?: boolean;
    loading?: boolean;
}

export function Button({ title, color, loading = false, light = false, ...rest } : Props){
    const theme = useTheme();

    return (
        <Container {...rest} color={color} disabled={loading}>
            {
                loading ? 
                    <ActivityIndicator color={light ? theme.colors.header : theme.colors.background_secondary} /> : <Title light={light}>{title}</Title>
            }
        </Container>
    );
}