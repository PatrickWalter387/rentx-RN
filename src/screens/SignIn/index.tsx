import React, { useState } from 'react';
import { KeyboardAvoidingView, StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

import {
    Container,
    Header,
    Title,
    Description,
    Content,
    Footer
} from './styles';

export function SignIn(){
    const theme = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Container>
            <StatusBar backgroundColor='transparent' barStyle={'dark-content'} translucent />
            <Header>
                <Title>Estamos{'\n'}quase lá.</Title>
                <Description>
                    Faça seu login para começar{'\n'}
                    uma experiência incrível.
                </Description>
            </Header>

            <Content>
                <Input 
                    iconName='mail' 
                    placeholder='E-mail' 
                    keyboardType='email-address' 
                    autoCapitalize='none'
                    onChangeText={setEmail}
                    value={email}
                />
                <PasswordInput 
                    iconName='key' 
                    placeholder='Senha' 
                    autoCapitalize='none'
                    onChangeText={setPassword}
                    value={password}
                />
            </Content>

            <Footer>
                <Button title='Login' />
                <Button style={{ marginTop: 8 }} title='Criar conta gratuita' color={theme.colors.background_secondary} light />
            </Footer>
        </Container>
    );
}