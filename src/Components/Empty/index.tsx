import React from 'react';
import {Button} from 'react-native-paper';
import {Background, Container, Text} from './style';
import {withTheme} from 'react-native-paper';
import {ThemeOverride} from '../../App';

interface PropEmpty {
  theme: ThemeOverride;
  text: string;
}
function Empty({theme, text = 'Ainda não existe nada por aqui!'}: PropEmpty) {
  return (
    <Container>
      <Text>{text}</Text>
      <Background
        resizeMode="center"
        source={require('../../assets/img/empty.png')}
      />
      <Button
        mode="contained"
        buttonColor={theme.colors.tertiary}
        textColor={theme.colors.white}
        onPress={() => console.log('ok')}>
        Criar uma lista
      </Button>
    </Container>
  );
}

export default withTheme(Empty);
