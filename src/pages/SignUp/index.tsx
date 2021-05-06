import React, {useCallback, useRef} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  TextInput,
  Alert,
} from 'react-native';

import * as Yup from 'yup';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';

import Input from '../../Components/Input';
import Button from '../../Components/Button';

import {Title, Container, BackToLogin, BackToLoginText} from './style';
import Logo from '../../assets/img/logo.png';
import {Image} from '../SignIn/style';
import {useNavigation} from '@react-navigation/native';

import IconBack from 'react-native-vector-icons/Feather';
import getValidationErrors from '../../../Utils/getValidation';
import api from '../../services/axios';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const SignUp: React.FC = () => {
  const navigate = useNavigation();
  const formRef = useRef<FormHandles>(null);

  const emailInputRef = useRef<TextInput>(null);
  const passwordlInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          nome: Yup.string().required('Nome obrigatório!'),
          email: Yup.string()
            .required('Email obrigatório!')
            .email('Email inválido!'),
          password: Yup.string().min(2, 'No mínimo 6 digitos'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        console.log(data);

        await api.post('/register', data);

        return navigate.navigate('SignIn');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const erros = getValidationErrors(err);
          formRef.current?.setErrors(erros);

          return;
        }

        Alert.alert('Erro na validação', 'Ocorreu um erro no cadastro');
      }
    },
    [navigate],
  );

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
          <Form ref={formRef} onSubmit={handleSignUp}>
            <Input
              name="name"
              placeholder="Nome"
              icon="user"
              returnKeyType="next"
              onSubmitEditing={() => emailInputRef.current?.focus()}
            />

            <Input
              ref={emailInputRef}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              name="email"
              placeholder="Email"
              icon="mail"
              returnKeyType="next"
              onSubmitEditing={() => passwordlInputRef.current?.focus()}
            />

            <Input
              ref={passwordlInputRef}
              secureTextEntry
              name="password"
              placeholder="Senha"
              icon="lock"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />
            <Input
              ref={passwordlInputRef}
              secureTextEntry
              name="password_confirmation"
              placeholder="Repetir senha"
              icon="lock"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />

            <Button onPress={() => formRef.current?.submitForm()}>
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
