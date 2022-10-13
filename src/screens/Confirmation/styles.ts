import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.header};

    padding-top: 56px;
`;

export const Content = styled.View`
    align-items: center;
    justify-content: center;
    flex: 1;
`;

export const Title = styled.Text`
    margin-top: 30px;

    font-family: ${({ theme }) => theme.fonts.secondary_600};
    font-size: ${RFValue(30)}px;
    color: ${({ theme }) => theme.colors.shape};
`;

export const Description = styled.Text`
    text-align: center;

    margin-top: 16px;
    line-height: 25px;

    font-family: ${({ theme }) => theme.fonts.primary_400};
    font-size: ${RFValue(15)}px;
    color: ${({ theme }) => theme.colors.text};
`;

export const Footer = styled.View`
    align-items: center;
    flex: 1;
    justify-content: flex-end;
    margin-bottom: 100px;
`;

