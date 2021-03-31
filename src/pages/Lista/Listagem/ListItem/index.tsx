import React, {useCallback, useRef} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, Text} from 'react-native';
import {Avatar} from 'react-native-paper';
import Foto from '../../../../assets/img/foto.jpg';

import Icon from 'react-native-vector-icons/Feather';

import {Container, Header, HeaderText, Username, FormContainer} from './style';
import Input from '../../../../Components/Input';
import {FormHandles} from '@unform/core';

const ItensToList: React.FC = ({route, navigation}) => {
  const {item} = route.params;

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(({data}) => {
    console.log(data);
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'android' ? 'height' : undefined}
      style={{flex: 1, backgroundColor: '#fff'}}
      enabled>
      <Header
        colors={['#01ac73', '#03faa8']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <Icon
          name="arrow-left"
          size={20}
          color="#fff"
          onPress={() => navigation.goBack()}
        />
        <HeaderText>
          <Username>{item.title}</Username>
        </HeaderText>
        <Avatar.Image size={54} source={Foto} />
      </Header>
      <ScrollView
        contentContainerStyle={{flex: 1}}
        keyboardShouldPersistTaps="handled">
        <Container>
          <FormContainer ref={formRef} onSubmit={handleSubmit}>
            <Input name="item" placeholder="Item" icon="list" />
            <Icon name="plus" onPress={() => formRef.current?.submitForm()} />
          </FormContainer>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ItensToList;
