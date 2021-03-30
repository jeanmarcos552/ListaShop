import React from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, Text} from 'react-native';
import {Avatar} from 'react-native-paper';
import Foto from '../../../../assets/img/foto.jpg';

import Icon from 'react-native-vector-icons/Feather';

import {Container, Header, HeaderText, Username} from './style';

const ItensToList: React.FC = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'android' ? 'height' : undefined}
      style={{flex: 1}}
      enabled>
      <Header
        colors={['#01ac73', '#03faa8']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <HeaderText>
          <Username>Minhas listas</Username>
        </HeaderText>
        <Avatar.Image size={54} source={Foto} />
      </Header>
      <ScrollView
        contentContainerStyle={{flex: 1}}
        keyboardShouldPersistTaps="handled">
        <Container>
          <Text>Itens da Lista</Text>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ItensToList;
