import React from 'react';
import {CenterView, Container, Text} from './style';
import {withTheme} from 'styled-components/native';
import {ImageBackground} from 'react-native';
import ButtonDefault from '../Button';

interface PropEmpty {
  theme: any;
  text: string;
  action?: Function;
}
function Empty({action, text = 'Ainda não existe nada por aqui!'}: PropEmpty) {
  return (
    <Container>
      <Text>{text}</Text>
      <CenterView>
        <ImageBackground
          source={require('../../assets/img/empty.png')}
          style={{height: 260, width: '100%'}}
          resizeMode="contain"
        />
      </CenterView>
      {action && (
        <ButtonDefault onPress={() => action()}>Criar conta</ButtonDefault>
      )}
    </Container>
  );
}

export default withTheme(Empty);
