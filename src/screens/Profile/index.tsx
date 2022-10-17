import React, { useState } from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import { Button } from '../../components/Button';    

import {
    Container,
    Header,
    HeaderTop,
    HeaderTitle,
    LogoutButton,
    PhotoContainer,
    Photo,
    PhotoButton,
    Content,
    Options,
    Option,
    OptionTitle,
    Section,
} from './styles';
import { useAuth } from '../../hooks/auth';

export function Profile() {
    const theme = useTheme();
    const navigation : NavigationProp<ParamListBase> = useNavigation();

    const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
    const { user } = useAuth();

    function handleBack() {
        navigation.goBack()
    }

    function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit') {
        if (false && optionSelected === 'passwordEdit') {
            Alert.alert('Você está offline', 'Para mudar a senha, conecte-se a Internet')
        } else {
            setOption(optionSelected)
        }
    }

    return (
        <KeyboardAvoidingView behavior='position' enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Header>
                        <HeaderTop>
                            <BackButton
                                color={theme.colors.shape}
                                onPress={handleBack}
                            />
                            <HeaderTitle>Editar Perfil</HeaderTitle>
                            <LogoutButton onPress={() => {}}>
                                <Feather
                                    name='power'
                                    size={24}
                                    color={theme.colors.shape}
                                />
                            </LogoutButton>
                        </HeaderTop>

                        <PhotoContainer>
                            {!!true && <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/46614552?v=4' }} />}
                            <PhotoButton onPress={() => {}}>
                                <Feather
                                    name='camera'
                                    size={24}
                                    color={theme.colors.shape}
                                />
                            </PhotoButton>
                        </PhotoContainer>
                    </Header>

                    <Content style={{ marginBottom: useBottomTabBarHeight() }}>
                        <Options>
                            <Option
                                active={option == 'dataEdit'}
                                onPress={() => handleOptionChange('dataEdit')}
                            >
                                <OptionTitle active={option === 'dataEdit'}>Dados</OptionTitle>
                            </Option>

                            <Option
                                active={option === 'passwordEdit'}
                                onPress={() => handleOptionChange('passwordEdit')}
                            >
                                <OptionTitle active={option === 'passwordEdit'}>Trocar senha</OptionTitle>
                            </Option>
                        </Options>
                        {
                            option === 'dataEdit'
                                ?
                                <Section>
                                    <Input
                                        iconName='user'
                                        placeholder='Nome'
                                        autoCorrect={false}
                                        defaultValue={user.name}
                                        //onChangeText={setName}
                                    />
                                    <Input
                                        iconName='mail'
                                        placeholder='E-mail'
                                        editable={false}
                                        autoCorrect={false}
                                        defaultValue={user.email}
                                        //onChangeText={setDriverLicense}
                                    />
                                    <Input
                                        iconName='credit-card'
                                        placeholder='CNH'
                                        keyboardType='numeric'
                                        defaultValue={user.driver_license}
                                    />
                                </Section>
                                :
                                <Section>
                                    <PasswordInput
                                        iconName='lock'
                                        placeholder='Senha atual'
                                    />
                                    <PasswordInput
                                        iconName='lock'
                                        placeholder='Nova senha'
                                    />
                                    <PasswordInput
                                        iconName='lock'
                                        placeholder='Confirmar senha'

                                    />
                                </Section>
                        }
                        <Button
                            title='Salvar alterações'
                            onPress={() => {}}
                        />
                    </Content>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}