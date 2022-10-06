import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

interface DateValueProps{
    selected: boolean
}

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const Header = styled.View`
    padding: 32px 25px;
    padding-top: ${getStatusBarHeight() + 30}px;

    height: ${RFValue(325)}px;
    background-color: ${({ theme }) => theme.colors.header};

    justify-content: center;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondary_600};
    color: ${({ theme }) => theme.colors.shape};
    font-size: ${RFValue(30)}px;

    margin-top: 24px;
`;

export const RentalPeriod = styled.View`
    width: 100%;

    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    margin-top: 32px;
`;

export const DateInfo = styled.View`
    width: 30%;
`;

export const DateTitle = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondary_500};
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(10)}px;
`;

export const DateValue = styled.Text<DateValueProps>`
    font-family: ${({ theme }) => theme.fonts.secondary_500};
    color: ${({ theme }) => theme.colors.shape};
    font-size: ${RFValue(15)}px;

    ${({ theme, selected }) => !selected && css`
        border-bottom-width: 1px;
        border-bottom-color: ${theme.colors.text};
    `}
`;

export const Content = styled.ScrollView.attrs({
    contentContainerStyle:{
        paddingBottom: 24
    },
    showsVerticalScrollIndicator: false
})``;


export const Footer = styled.View`
    padding: 24px;
`;