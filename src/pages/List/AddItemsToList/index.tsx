import React, {useCallback, useEffect, useRef, useState} from 'react';
import {KeyboardAvoidingView, Platform, View} from 'react-native';

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
import {PayloadItem, PropsComponente} from '../../../types/items';
import {CreateNewItem} from './CreadNewItem';
import {GlobalStyles} from '../../../styles/global';

const AddItemsToList: React.FC<PropsComponente> = ({route, ...rest}) => {
  const searchRef = useRef<any>(null);
  const {id, title} = route.params.item;
  const [lista, setLista] = useState<PayloadItem[]>();
  const [ItemsOfList, setItemsOfList] = useState<ItemsRequest[]>([]);
  const [currentSearch, setcurrentSearch] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const {user} = useAuth();

  const getItemByList = useCallback(async () => {
    const {data, status} = await showList(id);
    if (status === 200) {
      setItemsOfList(data?.itens || []);
    }
  }, [id]);

  const handleInit = useCallback(async () => {
    const {data, status} = await indexItems();
    if (status === 200) {
      setLista(data.data);
      getItemByList();
    }
  }, [getItemByList]);

  useEffect(() => {
    (async () => {
      try {
        handleInit();
        setLoading(false);
        searchRef.current.focus();
      } catch (erro) {
        console.error(erro);
        setLoading(false);
      }
    })();
  }, [handleInit]);

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

  const handleSearch = useCallback(async () => {
    const {data, status} = await searchItemsByName(currentSearch);
    if (status === 200) {
      setLista(data);
    }
  }, [currentSearch]);

  useEffect(() => {
    if (currentSearch) {
      handleSearch();
    } else {
      handleInit();
    }
  }, [currentSearch, handleInit, handleSearch]);

  return (
    <GlobalStyles>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}
        style={{flex: 1}}
        enabled>
        <SearchItems
          label={title}
          searchRef={searchRef}
          setValue={setcurrentSearch}
          value={currentSearch}
          isConclude={ItemsOfList && ItemsOfList.length > 0}
          {...rest}
        />

        <Container>
          {loading ? (
            <View />
          ) : (
            <ListResult
              removeClippedSubviews={true}
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
