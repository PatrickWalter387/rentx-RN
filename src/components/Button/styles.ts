import { TouchableOpacityProps } from "react-native";
import styled from "styled-components/native";

interface Props extends TouchableOpacityProps{
    color: string;
}

export const Container = styled.TouchableOpacity<Props>`
    width: 100%;
    padding: 19px;
    align-items: center;

    background-color: ${({ theme, color }) => color ? color : theme.colors.main};
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondary_500};
    color: ${({ theme }) => theme.colors.background_secondary};
`;