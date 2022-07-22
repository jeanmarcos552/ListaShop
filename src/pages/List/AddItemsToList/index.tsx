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

import {useAuth} from '../../../hooks/auth';
import {ItemsRequest} from '../../../types/list';
import {SearchItems} from './SearchItems';
import {
  addItemToList,
  removeItemToList,
} from '../../../services/list/list-itens';
import {showList} from '../../../services/list';
import {indexItems, searchItemsByName} from '../../../services/list/items';
import {PayloadItem} from '../../../types/items';

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

const AddItemsToList: React.FC<PropsComponente> = ({route, ...rest}) => {
  const searchRef = useRef<any>(null);
  let {id, title} = route.params.item;
  let [lista, setLista] = useState<PayloadItem[]>();
  let [allItems, setAllItems] = useState<PayloadItem[]>();
  let [ItemsOfList, setItemsOfList] = useState<ItemsRequest[]>([]);
  const {user} = useAuth();

  const getItemByList = useCallback(async () => {
    const {data, status} = await showList(id);
    if (status === 200) {
      setItemsOfList(data?.itens || []);
    }
  }, [id]);

  useEffect(() => {
    (async () => {
      try {
        searchRef.current.focus();
        const {data, status} = await indexItems();
        if (status === 200) {
          setLista(data.data);
          setAllItems(data.data);
          getItemByList();
        }
      } catch (erro) {
        console.error(erro);
      }
    })();
  }, [searchRef, id, getItemByList]);

  const handleAddItemToList = useCallback(
    async (data: any) => {
      let newLista = [...ItemsOfList, {...data}];

      let hasItem: any = ItemsOfList.find((item: any) => item.id === data.id);
      if (!hasItem) {
        const {id: itens_id} = data;
        const body = {
          lista: id,
          itens: {
            itens_id,
            qty: 1,
          },
          user: user.id,
        };
        await addItemToList({body});
        setItemsOfList(newLista);
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
    [ItemsOfList, id, user.id, getItemByList],
  );

  const handleSearchItens = useCallback(
    async (text: string) => {
      try {
        if (text.length > 2) {
          const {data, status} = await searchItemsByName(text);

          if (status !== 200) {
            throw Error(String('Erro'));
          }

          setLista(data);
        } else {
          setLista(allItems);
        }
      } catch (erro) {
        console.error(erro);
      }
    },
    [allItems],
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}
      style={{flex: 1}}
      enabled>
      <SearchItems
        searchRef={searchRef}
        handleSearchItens={handleSearchItens}
        isConclude={ItemsOfList && ItemsOfList.length > 0}
        {...rest}
      />

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
            <Item onPress={() => handleAddItemToList(provider)}>
              <ItemText>{provider.name}</ItemText>
              {ItemsOfList &&
                ItemsOfList.map((item: any) => {
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
  );
};

export default AddItemsToList;
