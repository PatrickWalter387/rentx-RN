import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

interface ContainerProps {
    isFocused: boolean;
}

export const Container = styled.View<ContainerProps>`
    flex-direction: row;
    margin: 4px 0;

    ${({ isFocused, theme }) => isFocused && css`
        border-bottom-width: 2px;
        border-bottom-color: ${theme.colors.main};
    `}
`;

export const IconContainer = styled.View`
    font-family: ${({ theme }) => theme.fonts.primary_400};
    font-size: ${RFValue(15)}px;
    background-color: ${({ theme }) => theme.colors.background_secondary};
    margin-right: 2px;

    padding: 18px;
`;

export const InputText = styled.TextInput`
    background-color: ${({ theme }) => theme.colors.background_secondary};
    flex: 1;
    padding-left: 24px;
`;