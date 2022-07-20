import React, {useCallback, useEffect, useRef, useState} from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';

import {NavigationScreenProp} from 'react-navigation';

import Icon from 'react-native-vector-icons/Feather';

import {
  Container,
  ListResult,
  Item,
  ItemText,
  HeaderList,
  HeaderListTitle,
  TitleBold,
} from './style';

import api from '../../../services/api';
import {useAuth} from '../../../hooks/auth';
import {ProviderItemsList} from '../../../types/list';
import {SearchItems} from './SearchItems';
import {removeItemToList} from '../../../services/list/list-itens';

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
  data: Array<ProviderItemsList>;
  pivot: {
    qty: number;
    value: string;
    status: boolean;
    lista_id: number;
    itens_id: number;
  };
}

const AddToList: React.FC<PropsComponente> = ({route, ...rest}) => {
  const searchRef = useRef<any>(null);
  let {id, title} = route.params.item;
  let [lista, setLista] = useState<Provider[]>();
  let [allItems, setAllItems] = useState<Provider[]>();
  let [ItemsOfItens, setItemsOfItens] = useState<Provider[]>([]);
  const {user} = useAuth();

  const getItemByList = useCallback(async () => {
    api.get(`lista/${id}`).then(res => {
      if (res.data) {
        setItemsOfItens(res.data.itens);
      }
    });
  }, [id]);

  useEffect(() => {
    searchRef.current.focus();
    api.get('/itens').then(res => {
      setLista(res.data.data);
      setAllItems(res.data.data);
    });

    getItemByList();
  }, [searchRef, id, getItemByList]);

  const handleAddItemToLista = useCallback(
    async (data: any) => {
      let newLista = [...ItemsOfItens, {...data}];

      let hasItem: any = ItemsOfItens.find((item: any) => item.id === data.id);
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
            setItemsOfItens(newLista);
          })
          .catch(err => console.log(err));
      } else {
        let body: any = {};
        if (hasItem.pivot) {
          body = {
            itens_id: hasItem.pivot.itens_id,
            lista_id: hasItem.pivot.lista_id,
          };
        } else {
          body = {
            itens_id: hasItem.id,
            lista_id: id,
          };
        }
        await removeItemToList(body);
        getItemByList();
      }
    },
    [ItemsOfItens, id, user.id, getItemByList],
  );

  const handleSearchItens = useCallback(
    (text: string) => {
      if (text.length > 2) {
        api.get(`/itens-search?name=${text}`).then(res => setLista(res.data));
      } else {
        setLista(allItems);
      }
    },
    [allItems],
  );

  return (
    <>
      <SearchItems
        searchRef={searchRef}
        handleSearchItens={handleSearchItens}
        isConclude={ItemsOfItens && ItemsOfItens.length > 0}
        {...rest}
      />
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
                {ItemsOfItens &&
                  ItemsOfItens.map((item: any) => {
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
