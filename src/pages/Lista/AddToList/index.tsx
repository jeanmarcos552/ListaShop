import React, {useCallback, useEffect, useRef, useState} from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';

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
import api from '../../../services/api';
import {useAuth} from '../../../hooks/auth';
import {ProviderItensList} from '../../../types/lista';

interface PropsComponente {
  route: {
    params: {
      item: {
        id: number;
        title: string;
      };
    };
  };
  navigation: NavigationScreenProp<any, any>;
}
interface Provider {
  data: Array<ProviderItensList>;
  pivot: {
    qty: number;
    value: string;
    status: boolean;
    lista_id: number;
    itens_id: number;
  };
}

const AddToList: React.FC<PropsComponente> = ({route, navigation}) => {
  const searchRef = useRef<any>(null);
  let {id, title} = route.params.item;
  const [value, onChangeText] = useState<string>();
  let [lista, setLista] = useState<Provider[]>();
  let [listaOfItens, setListaOfItens] = useState<Provider[]>([]);
  const [isFocus, setIsFocus] = useState(true);
  const {user} = useAuth();

  useEffect(() => {
    searchRef.current.focus();
    api.get('/itens').then(res => {
      setLista(res.data.data);
    });

    api.get(`lista/${id}`).then(res => {
      if (res.data) {
        setListaOfItens(res.data.itens);
      }
    });
  }, [searchRef, id]);

  const handleIsFocus = useCallback(() => {
    setIsFocus(false);
  }, []);

  const handleIsFilled = useCallback(() => {
    setIsFocus(true);
  }, []);

  const handleSearchItens = useCallback((text: string) => {
    onChangeText(text);
    if (text.length > 2) {
      api.get(`/search/itens?name=${text}`).then(res => setLista(res.data));
    } else {
      setLista([]);
    }
  }, []);

  const handleAddItemToLista = useCallback(
    (data: any) => {
      let newLista = [...listaOfItens, {...data}];

      console.log(newLista);
      let hasItem: any = listaOfItens.find((item: any) => item.id === data.id);
      console.log(hasItem);
      if (!hasItem) {
        let {id: itens_id} = data;
        const body = {
          lista: id,
          itens: {
            itens_id,
            qty: 1,
          },
          user: user.id,
        };
        api
          .post('/addItem', {...body})
          .then(_ => {
            setListaOfItens(newLista);
          })
          .catch(err => console.log(err));
      } else {
        let body = {};
        if (hasItem.pivot) {
          body = {
            item_id: hasItem.pivot.itens_id,
            lista: hasItem.pivot.lista_id,
          };
        } else {
          body = {
            item_id: hasItem.id,
            lista: id,
          };
        }
        api
          .post('/removeItem', body)
          .then(res => res.data)
          .then(_ => {
            api.get(`lista/${id}`).then(res => {
              if (res.data) {
                setListaOfItens(res.data.itens);
              }
            });
          });
      }
    },
    [id, listaOfItens, user.id],
  );

  return (
    <>
      <HeaderSearch>
        <TextInputSugest isFocus={isFocus} isErrored={false}>
          <Icon
            name="search"
            size={15}
            color={isFocus ? '#01ac73' : '#ff9000'}
          />
          <InputText
            isErrored={false}
            isFocus={isFocus}
            ref={searchRef}
            placeholder="pesquisar..."
            value={value}
            placeholderTextColor={isFocus ? '#01ac73' : '#ff9000'}
            onChangeText={(text: string) => handleSearchItens(text)}
            autoCapitalize="none"
            onFocus={handleIsFocus}
            onBlur={handleIsFilled}
          />
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <TextButton>
              {listaOfItens && listaOfItens.length > 0 ? 'Concluir' : 'Voltar'}
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
            keyExtractor={(provider: any) => provider.id.toString()}
            ListHeaderComponent={() => (
              <HeaderList>
                <HeaderListTitle>
                  Adicionar Itens a lista: <TitleBold>{title}</TitleBold>
                </HeaderListTitle>
              </HeaderList>
            )}
            renderItem={({item: provider}: any) => (
              <Item onPress={() => handleAddItemToLista(provider)}>
                <ItemText>{provider.name}</ItemText>
                {listaOfItens &&
                  listaOfItens.map((item: any) => {
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
