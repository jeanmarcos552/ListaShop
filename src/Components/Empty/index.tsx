import React from 'react';
import {Button} from 'react-native-paper';
import {CenterView, Container, Icon, Text} from './style';
import {withTheme} from 'styled-components/native';

interface PropEmpty {
  theme: any;
  text: string;
}
function Empty({theme, text = 'Ainda não existe nada por aqui!'}: PropEmpty) {
  return (
    <Container>
      <Text>{text}</Text>
      <CenterView>
        <Icon
          name="checkcircleo"
          size={30}
          color={theme.colors.textSecondary}
        />
      </CenterView>
      <Button
        mode="contained"
        buttonColor={theme.colors.secondary}
        onPress={() => console.log('ok')}>
        Criar uma lista
      </Button>
    </Container>
  );
}

export default withTheme(Empty);
