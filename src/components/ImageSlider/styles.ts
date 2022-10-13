import { Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';
import { Bullet } from '../Bullet';

interface SliderBulletProps {
    isFirst: boolean;
}

export const Container = styled.View`
    width: 100%;
`;

export const ImageIndexes = styled.View`
    flex-direction: row;
    align-self: flex-end;
    padding-right: 24px;
`;

export const CarImageWrapper = styled.View`
    width: ${Dimensions.get('window').width}px;
    height: ${RFValue(132)}px;
    justify-content: center;
    align-items: center;
`;

export const CarImage = styled.Image`
    width: ${RFValue(280)}px;
    height: ${RFValue(132)}px;
`;

export const SliderBullet = styled(Bullet)<SliderBulletProps>`
    ${({ isFirst }) => !isFirst && css`
        margin-left: 4px;
    `};
`;