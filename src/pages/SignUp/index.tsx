import React, {useCallback, useRef} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, View} from 'react-native';

import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';

import Input from '../../Components/Input';
import Button from '../../Components/Button';

import {Title, Container, BackToLogin, BackToLoginText} from './style';
import Logo from '../../assets/img/logo.png';
import {Image} from '../SignIn/style';
import {useNavigation} from '@react-navigation/native';

import IconBack from 'react-native-vector-icons/Feather';

const SignUp: React.FC = () => {
  const navigate = useNavigation();
  const useForm = useRef<FormHandles>(null);

  const handleSignUp = useCallback((data) => {
    console.log(data);
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{flex: 1}}
      enabled>
      <ScrollView
        contentContainerStyle={{flex: 1}}
        keyboardShouldPersistTaps="handled">
        <Container>
          <Image source={Logo} />
          <View>
            <Title>Cadastre-se</Title>
          </View>
          <Form ref={useForm} onSubmit={handleSignUp}>
            <Input name="nome" placeholder="Nome" icon="user" />
            <Input name="email" placeholder="Email" icon="mail" />
            <Input name="password" placeholder="Senha" icon="lock" />

            <Button onPress={() => useForm.current?.submitForm()}>
              Criar conta
            </Button>
          </Form>
        </Container>
      </ScrollView>

      <BackToLogin>
        <BackToLoginText onPress={() => navigate.navigate('SignIn')}>
          <IconBack name="arrow-left" color="#fff" size={20} />
          Voltar para o Login
        </BackToLoginText>
      </BackToLogin>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
