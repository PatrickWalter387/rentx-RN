import React from 'react';
import { ViewProps } from 'react-native';

import {
    Container,
} from './styles';

interface BulletProps extends ViewProps {
    active?: boolean;
}

export function Bullet({ active = false, ...rest }: BulletProps) {
    return (
        <Container active={active} {...rest} />
    );
}