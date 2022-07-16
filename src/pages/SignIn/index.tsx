import React, {useCallback, useRef} from 'react';

import * as Yup from 'yup';

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  TextInput,
  Alert,
} from 'react-native';

import Logo from '../../assets/img/logo.png';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';

import getValidationErrors from '../../../Utils/getValidation';

import {
  Container,
  Title,
  Image,
  ForgetPassword,
  ForgetPasswordText,
  CreatAccount,
  CreatAccountText,
  IconText,
} from './style';

import Input from '../../Components/Input';
import Button from '../../Components/Button';

import {useAuth} from '../../hooks/auth';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const navigate = useNavigation<NavigationProp<ParamListBase>>();
  const formRef = useRef<FormHandles>(null);
  const passwordRef = useRef<TextInput>(null);

  const {signIn} = useAuth();

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatorio')
            .email('email inválido'),
          password: Yup.string().required('Password obrigatória!'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({email: data.email, password: data.password});
      } catch (err) {
        console.log(err);
        if (err instanceof Yup.ValidationError) {
          const erros = getValidationErrors(err);
          formRef.current?.setErrors(erros);

          return;
        }
        Alert.alert('Erro na validação', 'Erro ao efetuar o Login!');
      }
    },
    [signIn],
  );

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

            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input
                autoCapitalize="none"
                keyboardType="email-address"
                autoCorrect={false}
                placeholder="Email *"
                icon="mail"
                name="email"
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current?.focus()}
              />
              <Input
                ref={passwordRef}
                secureTextEntry
                name="password"
                placeholder="Password *"
                icon="lock"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <Button onPress={() => formRef.current?.submitForm()}>
                Entrar
              </Button>
            </Form>

            <ForgetPassword onPress={() => navigate.navigate('ForgetPass')}>
              <ForgetPasswordText>Esqueci a senha</ForgetPasswordText>
            </ForgetPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreatAccount onPress={() => navigate.navigate('SignUp')}>
        <IconText name="user-plus" color="#fff" size={20} />
        <CreatAccountText>Criar conta</CreatAccountText>
      </CreatAccount>
    </>
  );
};

export default SignIn;
