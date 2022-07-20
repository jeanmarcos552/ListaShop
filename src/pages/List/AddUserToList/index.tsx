import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import React, {useCallback, useRef, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';

import {
  Title,
  Container,
  Modal,
  PressableButton,
  PressableButtonText,
  FooterButtons,
  ButtonCreate,
  ButtonCreateText,
  CompartilharLista,
  IconsShare,
} from './style';
import {useAuth} from '../../../hooks/auth';
import getValidationErrors from '../../../../Utils/getValidation';
import Input from '../../../Components/Input';
import {storeNotification} from '../../../services/notification';

interface ShareFormData {
  user: string;
}

interface ComponentProps {
  provider: {
    id: number;
    name: string;
    itens: Array<any>;
    total: number;
    info: {
      itens: number;
      user: number;
    };
  };
}
const ShareList: React.FC<ComponentProps> = props => {
  const formRef = useRef<FormHandles>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const {user} = useAuth();
  const handleShareList = useCallback(
    async (data: ShareFormData) => {
      try {
        console.log(data);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          user: Yup.string()
            .required('E-mail obrigatorio')
            .email('email inválido'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {status} = await storeNotification({
          body: {
            lista: props.provider.id,
            user_receiver: data.user,
            user_send: user.id,
            description: 'Convite: Nova lista',
          },
        });
        console.log(status);
        if (status !== 201) {
          throw new Error(String(data));
        }

        Alert.alert('Successo!', 'Lista foi enviada!');
        setModalVisible(false);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const erros = getValidationErrors(err);
          formRef.current?.setErrors(erros);
          return;
        }
        console.error(err.message);
        setModalVisible(false);
        Alert.alert('Erro na validação', 'Erro ao compartilhar a lista!');
      }
    },
    [props.provider.id, user.id],
  );

  return (
    <>
      <Modal
        presentationStyle="fullScreen"
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'android' ? 'height' : 'padding'}
          style={{flex: 1}}
          enabled>
          <ScrollView
            contentContainerStyle={{flex: 1}}
            keyboardShouldPersistTaps="handled">
            <Container>
              <View>
                <Title>Compartilhar lista?</Title>
              </View>

              <Form onSubmit={handleShareList} ref={formRef}>
                <Input
                  autoCapitalize="none"
                  keyboardType="email-address"
                  autoCorrect={false}
                  name="user"
                  placeholder="Digite o email"
                  icon="mail"
                />
                <FooterButtons>
                  <PressableButton
                    onPress={() => setModalVisible(!modalVisible)}>
                    <PressableButtonText>Cancelar</PressableButtonText>
                  </PressableButton>
                  <ButtonCreate onPress={() => formRef.current?.submitForm()}>
                    <ButtonCreateText>Enviar</ButtonCreateText>
                    <Icon name="send" size={20} color="#fff" />
                  </ButtonCreate>
                </FooterButtons>
              </Form>
            </Container>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>

      <CompartilharLista onPress={() => setModalVisible(true)}>
        <IconsShare name="share" size={18} />
      </CompartilharLista>
    </>
  );
};

export default ShareList;
