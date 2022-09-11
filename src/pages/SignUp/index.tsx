import React, {useCallback, useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  TextInput,
  Alert,
  Text,
} from 'react-native';

import * as Yup from 'yup';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';

import Input from '../../Components/Input';

import {Title, Container, BackToLogin, BackToLoginText, Image} from './style';
import Logo from '../../assets/img/logo.png';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

import IconBack from 'react-native-vector-icons/Feather';
import getValidationErrors from '../../../Utils/getValidation';
import api from '../../services/api';
import ButtonDefault from '../../Components/Button';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const SignUp: React.FC = () => {
  const navigate = useNavigation<NavigationProp<ParamListBase>>();
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const emailInputRef = useRef<TextInput>(null);
  const passwordlInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório!'),
          email: Yup.string()
            .required('Email obrigatório!')
            .email('Email inválido!'),
          password: Yup.string().min(2, 'No mínimo 2 digitos'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'Passwords must match',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        setLoading(true);
        await api.post('/register', data);
        setLoading(false);
        return navigate.navigate('SignIn');
      } catch (err: any) {
        if (err instanceof Yup.ValidationError) {
          const erros = getValidationErrors(err);
          formRef.current?.setErrors(erros);

          return;
        }

        console.log(err.response);
        if (err.response) {
          let msg = '';
          if (err.response.status === 422) {
            msg = `Email: ${data.email} já existe!`;
          }

          Alert.alert('Erro na validação', msg);
          setLoading(false);
        }
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
          <Image resizeMode="contain" source={Logo} />
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
            <ButtonDefault
              loading={loading}
              onPress={() => formRef.current?.submitForm()}>
              Criar conta
            </ButtonDefault>
          </Form>
        </Container>
      </ScrollView>

      <BackToLogin>
        <IconBack name="arrow-left" color="#fff" size={20} />
        <BackToLoginText onPress={() => navigate.navigate('SignIn')}>
          <Text style={{marginRight: 15}}>Voltar para o Login</Text>
        </BackToLoginText>
      </BackToLogin>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
