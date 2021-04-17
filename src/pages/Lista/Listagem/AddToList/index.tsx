import React, {useCallback, useEffect, useRef, useState} from 'react';
import {KeyboardAvoidingView, Platform, Text} from 'react-native';

import {NavigationScreenProp} from 'react-navigation';

import Icon from 'react-native-vector-icons/Feather';

import {
  Container,
  TextInputSugest,
  InputText,
  HeaderSearch,
  ListResult,
  Item,
  ItemText,
} from './style';

interface PropsComponente {
  route: {
    params: {
      item: object;
    };
  };
  navigation: NavigationScreenProp<any, any>;
}
interface PropsTextInput {
  text?: string;
  value: string;
}

interface Provider {
  id: number;
  title: string;
}

const DATA = [
  {
    id: 1,
    title: 'Papel higienico',
  },
  {
    id: 2,
    title: 'pera',
  },
  {
    id: 3,
    title: 'Detergente',
  },
];

const AddToList: React.FC<PropsComponente> = ({route, navigation}) => {
  const searchRef = useRef<any>(null);
  let {item} = route.params;
  const [value, onChangeText] = useState<PropsTextInput>();
  let [lista, setLista] = useState<Provider[]>();
  let [listaOfItens, setListaOfItens] = useState<Provider[]>([]);

  useEffect(() => {
    console.log(listaOfItens);
  }, [listaOfItens]);

  const handleSearchItens = useCallback(
    (text) => {
      onChangeText(text);
      const item = DATA.filter((item) => item.title === text);
      setLista(item);
    },
    [setLista],
  );

  const handleAddItemToLista = useCallback(
    (data) => {
      let newLista = [...listaOfItens, {...data}];

      setListaOfItens(newLista);
      // console.log(newLista);
      // console.log(item);
    },
    [listaOfItens],
  );

  return (
    <>
      <HeaderSearch>
        <TextInputSugest>
          <Icon name="search" size={15} color="#858484" />
          <InputText
            ref={searchRef}
            placeholder="pesquisar..."
            value={value}
            placeholderTextColor="#858484"
            onChangeText={(text) => handleSearchItens(text)}
            autoCapitalize="none"
          />
        </TextInputSugest>
      </HeaderSearch>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}
        style={{flex: 1}}
        enabled>
        <Container>
          <ListResult
            data={lista ?? []}
            keyExtractor={(provider) => provider.id.toString()}
            renderItem={({item: provider}) => (
              <Item onPress={() => handleAddItemToLista(provider)}>
                <ItemText>{provider.title}</ItemText>
                {listaOfItens.map((item) => {
                  return item.title === provider.title ? (
                    <Icon
                      key={provider.id}
                      name="check"
                      size={20}
                      color="#01ac73"
                    />
                  ) : null;
                })}
              </Item>
            )}
          />
        </Container>
      </KeyboardAvoidingView>
    </>
  );
};

export default AddToList;
