import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import React, {useEffect, useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
} from 'react-native';

import Input from '../../../Components/Input';
import {
  Title,
  Container,
  Modal,
  PressableButton,
  PressableButtonText,
  FooterButtons,
  ButtonCreate,
  ButtonCreateText,
  FabButtom,
  IconsStyle,
} from './style';
import {createNewList} from '../../../store/actions/list/createNewList';

interface ComponentProps {
  dispatch: any;
  setModalVisible: Function;
  modalVisible: boolean;
}

const FormList: React.FC<ComponentProps> = ({
  dispatch,
  modalVisible,
  setModalVisible,
}) => {
  const formRef = useRef<FormHandles>(null);
  const inputRef = useRef<any>(null);
  const [bottom, setBottom] = useState(new Animated.Value(-150));

  function handleSubmit(data) {
    createNewList(dispatch, data);
    setModalVisible(!modalVisible);
  }
  useEffect(() => {
    if (inputRef && modalVisible) {
      inputRef?.current?.focus();
      setBottom(new Animated.Value(0));
    } else {
      setBottom(new Animated.Value(-150));
    }
  }, [modalVisible, setBottom]);

  useEffect(() => {
    Animated.timing(bottom, {
      toValue: 0,
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, [bottom]);

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

              <Form onSubmit={handleSubmit} ref={formRef}>
                <Input
                  ref={inputRef}
                  name="name"
                  placeholder="Nome da lista"
                  icon="list"
                />

                <FooterButtons>
                  <PressableButton
                    onPress={() => setModalVisible(!modalVisible)}>
                    <PressableButtonText>Cancelar</PressableButtonText>
                  </PressableButton>
                  <ButtonCreate onPress={() => formRef.current?.submitForm()}>
                    <ButtonCreateText>Criar</ButtonCreateText>
                  </ButtonCreate>
                </FooterButtons>
              </Form>
            </Container>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
      <Animated.View
        style={{
          bottom: bottom,
        }}>
        <FabButtom onPress={() => setModalVisible(true)}>
          <IconsStyle name="add" size={25} />
        </FabButtom>
      </Animated.View>
    </>
  );
};

export default FormList;
