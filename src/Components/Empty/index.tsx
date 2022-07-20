import React from 'react';
import {Button} from 'react-native-paper';
import {CenterView, Container, Text} from './style';
import {withTheme} from 'styled-components/native';
import {ImageBackground} from 'react-native';

interface PropEmpty {
  theme: any;
  text: string;
  action?: Function;
}
function Empty({
  theme,
  action,
  text = 'Ainda não existe nada por aqui!',
}: PropEmpty) {
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
        <Button
          mode="contained"
          buttonColor={theme.colors.secondary}
          onPress={() => action()}>
          Criar uma lista
        </Button>
      )}
    </Container>
  );
}

export default withTheme(Empty);
