import React, {useCallback, useRef} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView} from 'react-native';

import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';

import Input from '../../Components/Input';
import Button from '../../Components/Button';

import {BackToLogin, BackToLoginText, Container, Title, Image} from './style';

import IconBack from 'react-native-vector-icons/Feather';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

import Logo from '../../assets/img/logo.png';

const ForgetPass = () => {
  const navigate = useNavigation<NavigationProp<ParamListBase>>();

  const handleRecoverPass = useCallback((data: any) => {
    console.log(data);
  }, []);

  const formRef = useRef<FormHandles>(null);

  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled>
        <ScrollView
          contentContainerStyle={{flex: 1}}
          keyboardShouldPersistTaps="handled">
          <Container>
            <Image source={Logo} />
            <Title>Recuperar senha</Title>
            <Form ref={formRef} onSubmit={handleRecoverPass}>
              <Input name="email" icon="mail" placeholder="email" />

              <Button onPress={() => formRef.current?.submitForm()}>
                Recuperar senha
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToLogin
        onPress={() => {
          navigate.navigate('SignIn');
        }}>
        <BackToLoginText>
          <IconBack name="arrow-left" size={20} color="#fff" />
          Voltar para o Login
        </BackToLoginText>
      </BackToLogin>
    </>
  );
};

export default ForgetPass;
