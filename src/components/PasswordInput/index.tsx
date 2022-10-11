import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';

import {
    Container,
    IconContainer,
    InputText
} from './styles';
import { TextInputProps } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

interface Props extends TextInputProps{
    iconName: React.ComponentProps<typeof Feather>['name'];
}

export function PasswordInput({ value, iconName, ...rest } : Props){
    const [isTextEntrySecured, setIsTextEntrySecured] = useState(true);
    const [isFocused, setIsFocused] = useState(false);
    const theme = useTheme();

    function handleOnFocus(){
        setIsFocused(true);
    }

    function handleOnBlur(){
        setIsFocused(false);
    }

    function handleToggleSecureTextEntry(){
        setIsTextEntrySecured(isSecured => !isSecured);
    }

    return (
        <Container style={{ borderBottomWidth: isFocused ? 2 : 0, borderBottomColor: theme.colors.main }}>
            <IconContainer>
                <Feather 
                    name={iconName}
                    size={24}
                    color={(isFocused || !!value) ? theme.colors.main : theme.colors.text}
                />
            </IconContainer>

            <InputText secureTextEntry={isTextEntrySecured} onFocus={handleOnFocus} onBlur={handleOnBlur} {...rest} />

            <TouchableOpacity onPress={handleToggleSecureTextEntry}>
                <IconContainer>
                    <Feather 
                        name={isTextEntrySecured ? 'eye-off' : 'eye'}
                        size={24}
                    />
                </IconContainer>
            </TouchableOpacity>
        </Container>
    );
}