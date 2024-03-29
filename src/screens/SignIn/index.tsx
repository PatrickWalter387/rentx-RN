import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

import * as Yup from 'yup';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

import {
    Container,
    Header,
    Title,
    Description,
    Content,
    Footer
} from './styles';
import { useAuth } from '../../hooks/auth';

export function SignIn(){
    const theme = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigator : NavigationProp<ParamListBase> = useNavigation();
    const { signIn } = useAuth();

    function handleRegister() {
        navigator.navigate('SignUpFirstStep');
    }

    async function handleSignIn(){
        try{
            const schema = Yup.object().shape({
                email: Yup.string()
                    .required()
                    .email(),
                
                password: Yup.string()
                    .required()
            });
            await schema.validate({ email, password });
            await signIn({ email, password });
        }
        catch (error) {
            if (error instanceof Yup.ValidationError) {
                return Alert.alert('Verifique os dados', error.errors.join('\n'));
            }
            
            return Alert.alert('Erro na autenticação', 'Ocorreu um erro ao fazer login, verifique as credenciais.');
        }
    }

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
                <Button title='Login' onPress={handleSignIn} />
                <Button style={{ marginTop: 8 }} title='Criar conta gratuita' color={theme.colors.background_secondary} light onPress={handleRegister} />
            </Footer>
        </Container>
    );
}