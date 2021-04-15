import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import React, {useCallback, useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import Input from '../../../Components/Input';
import {
  Title,
  Container,
  FabButtom,
  Modal,
  PressableButton,
  PressableButtonText,
  FooterButtons,
  ButtonCreate,
  ButtonCreateText,
} from './style';

const FormLista = () => {
  const formRef = useRef<FormHandles>(null);

  const handleCreateLista = useCallback((data) => {
    console.log(data);
  }, []);

  const [modalVisible, setModalVisible] = useState(false);

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
              <Title>Adicionar uma Lista de compras?</Title>

              <Form onSubmit={handleCreateLista} ref={formRef}>
                <Input name="name" placeholder="Nome da lista" icon="list" />

                <FooterButtons>
                  <ButtonCreate onPress={() => formRef.current?.submitForm()}>
                    <ButtonCreateText>Criar</ButtonCreateText>
                  </ButtonCreate>
                  <PressableButton
                    onPress={() => setModalVisible(!modalVisible)}>
                    <PressableButtonText>Cancelar</PressableButtonText>
                  </PressableButton>
                </FooterButtons>
              </Form>
            </Container>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>

      <FabButtom onPress={() => setModalVisible(!modalVisible)}>
        <Icon name="plus" size={40} color="#fff" />
      </FabButtom>
    </>
  );
};

export default FormLista;
