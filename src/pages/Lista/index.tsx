import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import React, {useCallback, useRef, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import LinearGradient from 'react-native-linear-gradient';
import Button from '../../Components/Button';
import Input from '../../Components/Input';
import {Title, Container, FabButtom, Modal} from './style';

const Lista = () => {
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
              <Input name="description" placeholder="Descrição" icon="list" />
              <Input name="qty" placeholder="Quantidade" icon="plus" />

              <Button onPress={() => formRef.current?.submitForm()}>
                Criar
              </Button>

              <Pressable onPress={() => setModalVisible(!modalVisible)}>
                <Text>Hide Modal</Text>
              </Pressable>
            </Form>
          </Container>
        </Modal>
      </ScrollView>
      <FabButtom onPress={() => setModalVisible(!modalVisible)}>
        <Icon name="plus" size={40} color="#fff" />
      </FabButtom>
    </KeyboardAvoidingView>
  );
};

export default Lista;
