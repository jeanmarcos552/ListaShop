import React from 'react';
import {Button} from 'react-native-paper';
import {CenterView, Container, Icon, Text} from './style';
import {withTheme} from 'styled-components/native';

interface PropEmpty {
  theme: any;
  text: string;
}
function Empty({theme, text = 'Ainda não existe nada por aqui!'}: PropEmpty) {
  console.log(theme.colors);
  return (
    <Container>
      <Text>{text}</Text>
      <CenterView>
        <Icon name="checkcircleo" size={30} color={theme.colors.text} />
      </CenterView>
      <Button
        mode="contained"
        buttonColor={theme.colors.secondary}
        textColor={theme.colors.text}
        onPress={() => console.log('ok')}>
        Criar uma lista
      </Button>
    </Container>
  );
}

export default withTheme(Empty);
