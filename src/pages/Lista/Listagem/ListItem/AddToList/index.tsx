import React, {ReactNode, useCallback, useRef, useState} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView} from 'react-native';

import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import {NavigationScreenProp} from 'react-navigation';

import Icon from 'react-native-vector-icons/Feather';

import {Container, TextInputSugest, InputText} from './style';
import HeaderSingle from '../../../../../Layout/HeaderSingle';
interface PropsComponente {
  route: {
    params: {
      item: object;
    };
  };
  navigation: NavigationScreenProp<any, any>;
}

const DATA = [
  {
    id: '1',
    title: 'Papel higiênico',
  },
  {
    id: '2',
    title: 'Desinfetante',
  },
  {
    id: '3',
    title: 'Suco de caxinha',
  },
];

interface PropsItens {
  item: {
    title: string;
  };
  onPress: ReactNode;
  backgroundColor: any;
  textColor: any;
}

// const Item: React.FC<PropsItens> = ({item}) => (
//   <TouchableOpacity onPress={() => console.log(item.title)}>
//     <Text>{item.title}</Text>
//   </TouchableOpacity>
// );
interface PropsTextInput {
  text?: string;
}

const AddToList: React.FC<PropsComponente> = ({route, navigation}) => {
  const formRef = useRef<FormHandles>(null);
  let {item} = route.params;
  const [value, onChangeText] = useState<PropsTextInput>();

  const handleSearchItens = useCallback((text) => {
    onChangeText(text);
  }, []);

  const handleCreateLista = useCallback(
    (data) => {
      console.log(data);
      console.log(item);
    },
    [item],
  );

  return (
    <>
      <HeaderSingle navigation={navigation} title="Lista" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}
        style={{flex: 1}}
        enabled>
        <ScrollView
          contentContainerStyle={{flex: 1}}
          keyboardShouldPersistTaps="handled">
          <Container>
            <Form onSubmit={handleCreateLista} ref={formRef}>
              <TextInputSugest>
                <Icon name="search" size={15} color="#858484" />
                <InputText
                  placeholder="pesquisar..."
                  value={value}
                  onChangeText={(text) => handleSearchItens(text)}
                />
              </TextInputSugest>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default AddToList;
