import React, {useCallback, useEffect, useRef, useState} from 'react';
import {KeyboardAvoidingView, Platform, View} from 'react-native';

import {NavigationScreenProp} from 'react-navigation';

import Icon from 'react-native-vector-icons/Feather';

import {Container, ListResult, Item, ItemText} from './style';

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
import {CreateNewItem} from './CreadNewItem';
import {GlobalStyles} from '../../../styles/global';

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
  const {id, title} = route.params.item;
  const [lista, setLista] = useState<PayloadItem[]>();
  const [allItems, setAllItems] = useState<PayloadItem[]>();
  const [ItemsOfList, setItemsOfList] = useState<ItemsRequest[]>([]);
  const [currentSearch, setcurrentSearch] = useState<string>();

  const [loading, setLoading] = useState(true);
  const {user} = useAuth();

  const getItemByList = useCallback(async () => {
    const {data, status} = await showList(id);
    if (status === 200) {
      setItemsOfList(data?.itens || []);
    }
  }, [id]);

  const init = useCallback(async () => {
    const {data, status} = await indexItems();
    if (status === 200) {
      setLista(data.data);
      setAllItems(data.data);
      getItemByList();
      setcurrentSearch('');
    }
  }, [getItemByList]);

  useEffect(() => {
    (async () => {
      try {
        init();
        setLoading(false);
        searchRef.current.focus();
      } catch (erro) {
        console.error(erro);
        setLoading(false);
      }
    })();
  }, [init]);

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
      init();
    },
    [ItemsOfList, init, id, user.id, getItemByList],
  );

  const handleSearch = useCallback(async (text: string) => {
    const {data, status} = await searchItemsByName(text);
    if (status === 200) {
      setLista(data);

      if (!data.length) {
        setcurrentSearch(_ => text);
      }
    }
  }, []);

  const handleSearchItens = useCallback(
    async (text: string): Promise<void> => {
      if (text.length > 2) {
        if (lista?.length === 0) {
          // se a palavra nao existe, nao faz mais requisicoes quando o cara digita
          setcurrentSearch(_ => text);
        } else {
          // fluxo normal
          handleSearch(text);
        }
      } else {
        // inicia o rolê
        setLista(_ => allItems);
        setcurrentSearch(_ => '');
      }
    },
    [allItems, handleSearch, lista?.length],
  );

  return (
    <GlobalStyles>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}
        style={{flex: 1}}
        enabled>
        <SearchItems
          label={title}
          searchRef={searchRef}
          handleSearchItens={handleSearchItens}
          isConclude={ItemsOfList && ItemsOfList.length > 0}
          {...rest}
        />

        <Container>
          {loading ? (
            <View />
          ) : (
            <ListResult
              data={lista}
              ListEmptyComponent={
                <CreateNewItem
                  value={currentSearch || ''}
                  callback={handleSearch}
                />
              }
              keyExtractor={(provider: any) => provider.id.toString()}
              renderItem={({item: provider}: any) => (
                <Item onPress={() => handleAddItemToList(provider)}>
                  <ItemText>{provider.name}</ItemText>
                  {ItemsOfList?.map((item: any) => {
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
          )}
        </Container>
      </KeyboardAvoidingView>
    </GlobalStyles>
  );
};

export default AddItemsToList;
