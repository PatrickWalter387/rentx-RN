import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from 'styled-components';
import { BackButton } from '../../../components/BackButton';

import {
ConfirmNewPasswordInput,
Container,
FinishRegisterButton,
Form,
FormTitle,
Header,
NewPasswordInput,
ScrollableContainer,
SignUpFirstStep,
SignUpSecondStep,
SignUpSteps,
SubTitle,
Title
} from './styles';

export function SecondStep() {
    const navigation = useNavigation();
    const theme = useTheme();

    function handleGoBack() {
        if (navigation.canGoBack()) {
            navigation.goBack();
        }
    }

    return (
        <Container>
            <Header>
                <BackButton onPress={handleGoBack} />

                <SignUpSteps>
                    <SignUpFirstStep />
                    <SignUpSecondStep active />
                </SignUpSteps>
            </Header>

            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
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
                        <FormTitle>2. Senha</FormTitle>

                        <NewPasswordInput 
                            iconName='key' 
                            placeholder="Senha"
                            autoCorrect={false}
                            autoCapitalize="none"
                            // value={password}
                            // onChangeText={setPassword}
                        />

                        <ConfirmNewPasswordInput
                            iconName='key' 
                            placeholder="Repetir Senha"
                            autoCorrect={false}
                            autoCapitalize="none"
                            // value={password}
                            // onChangeText={setPassword}
                        />

                        <FinishRegisterButton
                            title="Cadastrar"
                            style={{ marginTop: 15 }}
                            color={theme.colors.success}
                            onPress={() => {}}
                        />
                    </Form>
                </ScrollableContainer>
            </KeyboardAvoidingView>
        </Container>
    );
}