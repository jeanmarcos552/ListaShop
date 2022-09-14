import React, {createRef, useCallback, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {
  Container,
  ListItens,
  GridItens,
  TextValues,
  IconTrash,
  TextNameItems,
} from './style';
import {useFocusEffect} from '@react-navigation/native';
import SkeletonListItem from './skeleton';
import HeaderSingle from '../../../Layout/HeaderSingle';
import {ItemsRequest, ProviderItemsList} from '../../../types/list';
import TemplateDefault from '../../../Layout/Default';
import {showList} from '../../../services/list';
// import {removeItemToList, updateItems} from '../../../services/list/list-itens';
import {CenterView, ViewJ} from '../../../styles/global';
import {RenderFooter} from './Footer';
import {RenderHeader} from './RenderHeader';
import Icon from 'react-native-vector-icons/Ionicons';

export interface PropsComponente {
  route: any;
  navigation: any;
}
function itemIsChecked(obj: ItemsRequest, checkedList: ItemsRequest[]) {
  return checkedList.map(item => item.id).includes(obj.id);
}

function somaValoresItens(items: ProviderItemsList[]): string {
  if (!items) {
    return '0';
  }

  const total = items
    .map(item => item.pivot)
    .map((prev: any) => +prev.qty * +prev.value)
    .reduce((prev, current) => prev + current, 0)
    .toFixed(2)
    .replace('.', ',');

  return total;
}

function checkItemsSelected(items: ItemsRequest[]): ItemsRequest[] {
  const totalSelected = items?.filter(item => item.pivot.status);
  return totalSelected;
}

function createRefsInput(setElRefs: Function, size: number) {
  setElRefs((el: any) =>
    Array(size)
      .fill(size)
      .map((_, i) => el[i] || createRef()),
  );
}
const ItemsList: React.FC<PropsComponente> = ({route, navigation}) => {
  const {id, title} = route.params;
  const [itemsChecked, setItemsChecked] = useState<ItemsRequest[]>([]);
  const [items, setItems] = useState<ItemsRequest[]>([]);

  const [elRefs, setElRefs] = useState<Array<any>>([]);
  const [somaItens, setSomaItens] = useState('0');
  const [trashedItem, setTrashedItem] = useState(false);

  const getDados = useCallback(async () => {
    try {
      const {data, status} = await showList(id);

      if (status === 200) {
        if (data.itens) {
          const {itens} = data;
          if (itens) {
            createRefsInput(setElRefs, itens.length);
            setItems(itens);
            setItemsChecked(checkItemsSelected(itens));
          }
        }
      }
    } catch (erro: any) {
      console.error(erro.message);
    }
  }, [id]);

  const handleCheckedItems = (provider: ItemsRequest) => {
    setItemsChecked(state => {
      const exists = state.find(item => item.id === provider.id);
      if (!exists) {
        return [...state, provider];
      }
      return [...state.filter(item => item.id !== provider.id)];
    });
  };

  useEffect(() => {
    if (itemsChecked) {
      const soma = somaValoresItens(itemsChecked);
      setSomaItens(soma);
    }
  }, [itemsChecked]);

  useFocusEffect(
    useCallback(() => {
      getDados();
    }, [getDados]),
  );

  return (
    <TemplateDefault
      header={
        <HeaderSingle
          title={title}
          navigation={navigation}
          right={
            <>
              <TouchableOpacity onPress={() => setTrashedItem(!trashedItem)}>
                <Icon name="md-trash-outline" size={20} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={{marginLeft: 5}}>
                <Icon name="ios-settings-outline" size={20} color="#fff" />
              </TouchableOpacity>
            </>
          }
        />
      }
      loadingComponent={<SkeletonListItem />}
      loading={!items}>
      <Container>
        <RenderHeader totalSelected={itemsChecked} total={items.length} />
        <ListItens
          showsVerticalScrollIndicator={false}
          data={items}
          keyExtractor={(provider: any) => provider.id.toString()}
          removeClippedSubviews={false}
          ListFooterComponent={<View style={{marginBottom: 50}} />}
          renderItem={({item: provider, index}: any) => {
            return (
              <GridItens onPress={() => handleCheckedItems(provider)}>
                <ViewJ direction="row" alignItems="center">
                  <TextValues
                    ref={elRefs[index]}
                    key={provider.id}
                    defaultValue={provider.pivot.qty.toString()}
                    keyboardType="numeric"
                    placeholder="0"
                  />
                  <TextNameItems
                    checked={itemIsChecked(provider, itemsChecked)}>
                    {provider.name}{' '}
                    <Text
                      style={{
                        fontSize: 10,
                      }}>
                      {provider.un}
                    </Text>
                  </TextNameItems>
                </ViewJ>

                {trashedItem ? (
                  <CenterView>
                    <TouchableOpacity onPress={() => null}>
                      <IconTrash
                        name="trash"
                        size={18}
                        style={{paddingLeft: 4}}
                      />
                    </TouchableOpacity>
                  </CenterView>
                ) : (
                  <TextValues
                    ref={elRefs[index]}
                    defaultValue={provider.pivot.value.toString()}
                    keyboardType="numeric"
                    placeholder="0"
                  />
                )}
              </GridItens>
            );
          }}
        />
        <RenderFooter
          sumItems={somaItens}
          action={() =>
            navigation.navigate('AddItemsToList', {
              item: {id, title},
            })
          }
        />
      </Container>
    </TemplateDefault>
  );
};

export default ItemsList;
