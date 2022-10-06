import styled from "styled-components/native";
import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacity } from "react-native";

export const Container = styled(TouchableOpacity)`
    flex-direction: row;
    padding: 12px 24px;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;

    background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const Details = styled.View`

`;

export const Brand = styled.Text`
    font-family: ${({ theme }) => theme.fonts.primary_500};
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(10)}px;

    text-transform: uppercase;
`;

export const Name = styled.Text`
    font-family: ${({ theme }) => theme.fonts.primary_500};
    color: ${({ theme }) => theme.colors.title};
    font-size: ${RFValue(15)}px;
`;

export const Rent = styled.View`
    margin-top: 16px;
`;

export const Period = styled.Text`
    font-family: ${({ theme }) => theme.fonts.primary_500};
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(10)}px;
    text-transform: uppercase;
`;

export const About = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const Price = styled.Text`
    font-family: ${({ theme }) => theme.fonts.primary_500};
    color: ${({ theme }) => theme.colors.main};
    font-size: ${RFValue(15)}px;
`;

export const CarImage = styled.Image`
    width: 180px;
    height: 120px;
`;