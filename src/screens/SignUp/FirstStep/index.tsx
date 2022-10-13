import { ParamListBase, useNavigation, NavigationProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Alert } from 'react-native';
import * as Yup from 'yup';

import { BackButton } from '../../../components/BackButton';

import {
    Container,
    Form,
    FormTitle,
    Header,
    NextStepButton,
    SignUpFirstStep,
    SignUpSecondStep,
    SignUpSteps,
    SubTitle,
    Title,
    DriverLicenseInput,
    EmailInput,
    NameInput,
    ScrollableContainer,
} from './styles';

export function FirstStep() {
    const navigator : NavigationProp<ParamListBase> = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [driverLicense, setDriverLicense] = useState('');

    async function handleGoToNextStep() {
        try {
            const schema = Yup.object().shape({
                name: Yup
                    .string()
                    .required('Nome é obrigatório'),
                email: Yup
                    .string()
                    .required('E-mail obrigatório')
                    .email('Digite um e-mail válido'),
                driverLicense: Yup
                    .string()
                    .required('CNH é obrigatória')
            });

            const data = { name, email, driverLicense };
            await schema.validate(data, { abortEarly: false });

            navigator.navigate('SignUpSecondStep', { user: data });
        } 
        catch (error) {
            if (error instanceof Yup.ValidationError) {
                return Alert.alert('Verifique os dados', error.errors.join('\n'));
            }

            return Alert.alert('Erro na autenticação', 'Ocorreu um erro ao fazer login, verifique as credenciais.');
        }
    }

    function handleGoBack() {
        if (navigator.canGoBack()) {
            navigator.goBack();
        }
    }

    return (
        <Container>
            <Header>
                <BackButton onPress={handleGoBack} />

                <SignUpSteps>
                    <SignUpFirstStep active />
                    <SignUpSecondStep />
                </SignUpSteps>
            </Header>

            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
                enabled
            >
                <ScrollableContainer
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <Title>
                        Crie sua{'\n'}
                        conta
                    </Title>
                    <SubTitle>
                        Faça seu cadastro de{'\n'}
                        forma rápida e fácil
                    </SubTitle>

                    <Form>
                        <FormTitle>1. Dados</FormTitle>

                        <NameInput
                            iconName="user"
                            placeholder="Nome"
                            autoCorrect={false}
                            value={name}
                            onChangeText={setName}
                        />

                        <EmailInput
                            iconName="mail"
                            placeholder="E-mail"
                            keyboardType="email-address"
                            autoCorrect={false}
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}
                        />

                        <DriverLicenseInput 
                            iconName="credit-card"
                            placeholder="CNH"
                            keyboardType="numeric"
                            value={driverLicense}
                            onChangeText={setDriverLicense}
                        />

                        <NextStepButton
                            title="Próximo"
                            onPress={handleGoToNextStep}
                        />
                    </Form>
                </ScrollableContainer>
            </KeyboardAvoidingView>
        </Container>
    );
}