import React, {useCallback, useRef} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, View} from 'react-native';

import Logo from '../../assets/img/logo.png';
import {useNavigation} from '@react-navigation/native';

import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';

import {
  Container,
  Title,
  Image,
  ForgetPassword,
  ForgetPasswordText,
  CreatAccount,
  CreatAccountText,
} from './style';

import Input from '../../Components/Input';
import Button from '../../Components/Button';

const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const useForm = useRef<FormHandles>(null);
  const handleSignIn = useCallback((data) => {
    console.log(data);
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}
        style={{flex: 1}}
        enabled>
        <ScrollView
          contentContainerStyle={{flex: 1}}
          keyboardShouldPersistTaps="handled">
          <Container>
            <Image source={Logo} />

            <View>
              <Title>Faça seu login</Title>
            </View>

            <Form ref={useForm} onSubmit={handleSignIn}>
              <Input name="email" placeholder="Email" icon="mail" />
              <Input name="password" placeholder="Password" icon="lock" />

              <Button onPress={() => useForm.current?.submitForm()}>
                Entrar
              </Button>
            </Form>

            <ForgetPassword>
              <ForgetPasswordText>Esqueci a senha</ForgetPasswordText>
            </ForgetPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreatAccount onPress={() => navigation.navigate('SignUp')}>
        <CreatAccountText>Criar conta</CreatAccountText>
      </CreatAccount>
    </>
  );
};

export default SignIn;
