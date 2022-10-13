import { ParamListBase, useNavigation, NavigationProp } from '@react-navigation/native';
import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
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
    DriversLicenseInput,
    EmailInput,
    NameInput,
    ScrollableContainer,
} from './styles';

export function FirstStep() {
    const navigator : NavigationProp<ParamListBase> = useNavigation();

    function handleGoBack() {
        if (navigator.canGoBack()) {
            navigator.goBack();
        }
    }

    function handleGoToNextStep() {
        navigator.navigate('SignUpSecondStep');
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
                            // value={name}
                            // onChangeText={setName}
                        />

                        <EmailInput
                            iconName="mail"
                            placeholder="E-mail"
                            keyboardType="email-address"
                            autoCorrect={false}
                            autoCapitalize="none"
                            // value={email}
                            // onChangeText={setEmail}
                        />

                        <DriversLicenseInput 
                            iconName="credit-card"
                            placeholder="CNH"
                            // keyboardType="numeric"
                            // value={driversLicense}
                            // onChangeText={setDriversLicense}
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