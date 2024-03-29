import { TouchableOpacityProps } from "react-native";
import styled, { css } from "styled-components/native";

interface Props extends TouchableOpacityProps{
    color: string;
    light: boolean;
}

interface TextProps{
    light: boolean;
}

export const Container = styled.TouchableOpacity<Props>`
    width: 100%;
    padding: 19px;
    align-items: center;

    background-color: ${({ theme, color }) => color ? color : theme.colors.main};

    ${({ disabled }) => disabled && css`opacity: 0.5;`}
`;

export const Title = styled.Text<TextProps>`
    font-family: ${({ theme }) => theme.fonts.secondary_500};
    color: ${({ theme, light }) => light ? theme.colors.header : theme.colors.background_secondary};
`;