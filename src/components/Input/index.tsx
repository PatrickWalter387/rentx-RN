import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';

import {
    Container,
    IconContainer,
    InputText
} from './styles';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components';

interface Props extends TextInputProps{
    iconName: React.ComponentProps<typeof Feather>['name'];
}

export function Input({ value, iconName, ...rest } : Props){
    const [isFocused, setIsFocused] = useState(false);
    const theme = useTheme();

    function handleOnFocus(){
        setIsFocused(true);
    }

    function handleOnBlur(){
        setIsFocused(false);
    }

    return (
        <Container isFocused={isFocused}>
            <IconContainer>
                <Feather 
                    name={iconName}
                    size={24}
                    color={(isFocused || !!value) ? theme.colors.main : theme.colors.text}
                />
            </IconContainer>

            <InputText onFocus={handleOnFocus} onBlur={handleOnBlur} {...rest} />
        </Container>
    );
}