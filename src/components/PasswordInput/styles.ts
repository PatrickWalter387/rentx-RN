import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
    flex-direction: row;
    margin: 4px 0;
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