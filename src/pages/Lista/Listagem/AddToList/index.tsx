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
  HeaderList,
  HeaderListTitle,
  TitleBold,
  TextButton,
} from './style';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface PropsComponente {
  route: {
    params: {
      item: {
        title: string;
      };
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
  {
    id: 4,
    title: 'pera',
  },
];

const AddToList: React.FC<PropsComponente> = ({route, navigation}) => {
  const searchRef = useRef<any>(null);
  let {item} = route.params;
  const [value, onChangeText] = useState<PropsTextInput>();
  let [lista, setLista] = useState<Provider[]>();
  let [listaOfItens, setListaOfItens] = useState<Provider[]>([]);

  const [isFocus, setIsFocus] = useState(true);

  useEffect(() => {
    searchRef.current.focus();
  }, [searchRef, item]);

  const handleIsFocus = useCallback(() => {
    setIsFocus(false);
  }, []);

  const handleIsFilled = useCallback(() => {
    setIsFocus(true);
  }, []);

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
    },
    [listaOfItens],
  );

  return (
    <>
      <HeaderSearch>
        <TextInputSugest isFocus={isFocus}>
          <Icon
            name="search"
            size={15}
            color={isFocus ? '#01ac73' : '#ff9000'}
          />
          <InputText
            isFocus={isFocus}
            ref={searchRef}
            placeholder="pesquisar..."
            value={value}
            placeholderTextColor={isFocus ? '#01ac73' : '#ff9000'}
            onChangeText={(text) => handleSearchItens(text)}
            autoCapitalize="none"
            onFocus={handleIsFocus}
            onBlur={handleIsFilled}
          />
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <TextButton>
              {listaOfItens.length > 0 ? 'Concluir' : 'Cancelar'}
            </TextButton>
          </TouchableOpacity>
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
            ListHeaderComponent={() => (
              <HeaderList>
                <HeaderListTitle>
                  Adicionar Itens a lista: <TitleBold>{item.title}</TitleBold>
                </HeaderListTitle>
              </HeaderList>
            )}
            renderItem={({item: provider}) => (
              <Item onPress={() => handleAddItemToLista(provider)}>
                <ItemText>{provider.title}</ItemText>
                {listaOfItens.map((item) => {
                  return item.id === provider.id ? (
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
