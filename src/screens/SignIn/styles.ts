import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.ScrollView.attrs({
    contentContainerStyle: {
        paddingBottom: 16
    }
})`
    margin-top: ${getStatusBarHeight()}px;
    padding: 0 24px;
`;

/*export const Container = styled.View`
    margin-top: ${getStatusBarHeight()}px;
    padding: 0 24px;
`;*/

export const Header = styled.View`
    margin-top: 115px;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondary_600};
    font-size: ${RFValue(40)}px;
`;

export const Description = styled.Text`
    margin-top: 16px;

    font-family: ${({ theme }) => theme.fonts.primary_400};
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(15)}px;
`;

export const Content = styled.View`
    margin-top: 64px;
`;

export const Footer = styled.View`
    margin-top: 64px;
`;