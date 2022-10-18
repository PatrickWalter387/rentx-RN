import React, { useState } from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from 'styled-components';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

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
    const { user, signOut, updateUser } = useAuth();

    const navigation : NavigationProp<ParamListBase> = useNavigation();

    const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
    const [avatar, setAvatar] = useState(user.avatar);
    const [name, setName] = useState(user.name);
    const [driverLicense, setDriverLicense] = useState(user.driver_license);

    function handleBack() {
        navigation.goBack()
    }

    function handleSignOut() {
        Alert.alert('Deseja mesmo sair?', 'Será necessário conexão com a internet para fazer login novamente!', [
            {
                text: 'Cancelar',
                onPress: () => {}
            },
            {
                text: 'Confirmar',
                onPress: () => signOut()
            }
        ])
    }

    async function handleAvatarSelect(){
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1, //0 menor qualidade possivel. 
        });

        if(result.cancelled)
            return;

        setAvatar(result.uri);
    }

    function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit') {
        if (false && optionSelected === 'passwordEdit') {
            Alert.alert('Você está offline', 'Para mudar a senha, conecte-se a Internet')
        } else {
            setOption(optionSelected)
        }
    }

    async function handleUpdateUser(){
        const schema = Yup.object().shape({
            driverLicense: Yup.string().required('CNH é obrigatório!'),
            name: Yup.string().required('Nome é obrigatório')
        });

        try{
            await schema.validate({ name, driverLicense });
            await updateUser({
                id: user.id,
                user_id: user.user_id,
                email: user.email,
                name,
                driver_license: user.driver_license,
                avatar,
                token: user.token
            });
        
            Alert.alert('Perfil atualizado');
        }
        catch(error){
            if(error instanceof Yup.ValidationError)
                return Alert.alert('Verifique os campos', error.message);

            console.error(error);
            Alert.alert('Não foi possivel atualizar o perfil!');
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
                            <LogoutButton onPress={handleSignOut}>
                                <Feather
                                    name='power'
                                    size={24}
                                    color={theme.colors.shape}
                                />
                            </LogoutButton>
                        </HeaderTop>

                        <PhotoContainer>
                            {!!avatar && <Photo source={{ uri: avatar }} />}
                            <PhotoButton onPress={handleAvatarSelect}>
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
                                        onChangeText={setName}
                                    />
                                    <Input
                                        iconName='mail'
                                        placeholder='E-mail'
                                        editable={false}
                                        autoCorrect={false}
                                        defaultValue={user.email}
                                        onChangeText={setDriverLicense}
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
                            onPress={handleUpdateUser}
                        />
                    </Content>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}