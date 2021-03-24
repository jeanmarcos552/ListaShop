import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import React, {useCallback, useRef, useState} from 'react';
import {Alert, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import Button from '../../../Components/Button';
import Input from '../../../Components/Input';
import {
  Title,
  Container,
  FabButtom,
  Modal,
  PressableButton,
  PressableButtonText,
} from './style';

const FormLista = () => {
  const formRef = useRef<FormHandles>(null);

  const handleCreateLista = useCallback((data) => {
    console.log(data);
  }, []);

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}
      style={{flex: 1}}
      enabled>
      <ScrollView
        contentContainerStyle={{flex: 1}}
        keyboardShouldPersistTaps="handled">
        <Modal
          presentationStyle="fullScreen"
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <Container>
            <Title>Adicionar uma Lista de compras?</Title>

            <Form onSubmit={handleCreateLista} ref={formRef}>
              <Input name="name" placeholder="Nome da lista" icon="list" />

              <Button onPress={() => formRef.current?.submitForm()}>
                Criar
              </Button>
            </Form>
            <PressableButton onPress={() => setModalVisible(!modalVisible)}>
              <PressableButtonText
                size={50}
                name="md-close-outline"
                color="red"
              />
            </PressableButton>
          </Container>
        </Modal>
      </ScrollView>
      <FabButtom onPress={() => setModalVisible(!modalVisible)}>
        <Icon name="plus" size={40} color="#fff" />
      </FabButtom>
    </KeyboardAvoidingView>
  );
};

export default FormLista;
