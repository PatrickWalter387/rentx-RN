import { FlatList, FlatListProps } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { CarDTO } from '../../dtos/CarDTO';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;

    background-color: ${({ theme }) => theme.colors.header};
    height: ${RFValue(113)}px;
    padding: 24px;
`;

export const Total = styled.Text`
    color: ${({ theme }) => theme.colors.text};
`;

export const Content = styled(FlatList as new (props: FlatListProps<CarDTO>) => FlatList<CarDTO>).attrs({
    contentContainerStyle: { padding: 24 },
    showsVerticalScrollIndicator: false
})`
    flex: 1;
    padding-bottom: 40px;
`;