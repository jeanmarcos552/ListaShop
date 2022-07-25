import React, {createRef, useCallback, useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';

import {
  Container,
  InputCheckbox,
  ListItens,
  GridItens,
  TextValues,
  IconTrash,
} from './style';
import {Swipeable} from 'react-native-gesture-handler';
import {useFocusEffect} from '@react-navigation/native';
import SkeletonListItem from './skeleton';
import HeaderSingle from '../../../Layout/HeaderSingle';
import {ItemsRequest, ProviderItemsList} from '../../../types/list';
import TemplateDefault from '../../../Layout/Default';
import {showList} from '../../../services/list';
import {removeItemToList, updateItems} from '../../../services/list/list-itens';
import {CenterView, TextJ} from '../../../styles/global';
import {RenderFooter} from './Footer';
import {RenderHeader} from './RenderHeader';
import Icon from 'react-native-vector-icons/Ionicons';

export interface PropsComponente {
  route: any;
  navigation: any;
}

function somaValoresItens(items: ProviderItemsList[]): string {
  if (!items) {
    return '0';
  }

  const total = items
    .map(item => item.pivot)
    .filter(item => item.status === true)
    .map((prev: any) => +prev.qty * +prev.value)
    .reduce((prev, current) => prev + current, 0)
    .toFixed(2)
    .replace('.', ',');

  return total;
}

function checkItemsSelected(items: ProviderItemsList[]): number {
  if (!items) {
    return 0;
  }

  const totalSelected = items?.filter(item => item.pivot.status);
  return totalSelected.length;
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
  const [items, SetItems] = useState<ItemsRequest[]>();
  const [elRefs, setElRefs] = useState<Array<any>>([]);
  const [somaItens, setSomaItens] = useState('0');
  const [totalSelected, setTotalSelected] = useState(0);
  const [loading, setLoading] = useState(true);

  const getDados = useCallback(async () => {
    try {
      const {data, status} = await showList(id);

      if (status === 200) {
        setLoading(false);

        if (data.itens) {
          const {itens} = data;
          if (itens) {
            SetItems(itens);
            createRefsInput(setElRefs, itens.length);
            if (itens) {
              setSomaItens(somaValoresItens(itens));
              setTotalSelected(checkItemsSelected(itens));
            }
          }
        }
      }
    } catch (erro: any) {
      console.error(erro.message);
      setLoading(false);
    }
  }, [id]);

  const handleDeleteItem = useCallback(
    async ({pivot}: any) => {
      const {data, status} = await removeItemToList({...pivot});
      SetItems(state => state?.filter(item => item.id !== pivot.itens_id));

      if (items) {
        setSomaItens(somaValoresItens(items));
        setTotalSelected(checkItemsSelected(items));
      }

      console.log(data, status);
    },
    [items],
  );

  const changeItem = useCallback(
    async (pivot: any) => {
      const copyItems = items?.map(item => {
        if (item.id === pivot.itens_id) {
          item.pivot = pivot;
        }
        return item;
      });
      await updateItems({body: pivot, ...pivot});
      SetItems(_ => copyItems);
      if (copyItems) {
        setSomaItens(somaValoresItens(copyItems));
        setTotalSelected(checkItemsSelected(copyItems));
      }
    },
    [items],
  );

  const handleCheckItem = useCallback(
    async (provider: ItemsRequest, index: number) => {
      try {
        let {pivot} = provider;
        !pivot.status ? elRefs[index].current.focus() : '';
        pivot.status = !pivot.status;

        changeItem(pivot);
      } catch (erro) {
        console.error(erro);
      }
    },
    [changeItem, elRefs],
  );

  const updateItem = useCallback(
    async (provider: ProviderItemsList) => {
      let {pivot} = provider;
      pivot.value = pivot.value.replace(',', '.');
      await updateItems({body: pivot, ...pivot});

      changeItem(pivot);
    },
    [changeItem],
  );

  const handleChange = useCallback(
    (value: string, pivot: any, key = '') => {
      const copyItem = [...(items || [])];
      pivot[key] = value;

      copyItem?.map(provider => {
        if (provider.id === pivot) {
          return (provider.pivot = pivot);
        }
      });
      SetItems(copyItem);
    },
    [items],
  );

  const leftSwipe = useCallback(
    (provider: any) => {
      const {pivot} = provider;
      return (
        <TextValues
          key={pivot.lista_id.toString()}
          defaultValue={pivot.qty.toString()}
          keyboardType="numeric"
          placeholder="0"
          value={pivot.qty.toString()}
          onBlur={() => updateItem(provider)}
          onChangeText={(value: string) => handleChange(value, pivot, 'qty')}
        />
      );
    },
    [handleChange, updateItem],
  );

  const rightSwipe = useCallback(
    (provider: any) => {
      return (
        <CenterView>
          <TouchableOpacity onPress={() => handleDeleteItem(provider)}>
            <IconTrash name="trash" size={18} style={{paddingLeft: 4}} />
          </TouchableOpacity>
        </CenterView>
      );
    },
    [handleDeleteItem],
  );

  useEffect(() => {
    getDados();
  }, [getDados]);

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
            <TouchableOpacity>
              <Icon name="ios-settings-outline" size={20} color="#fff" />
            </TouchableOpacity>
          }
        />
      }
      loadingComponent={<SkeletonListItem />}
      loading={loading}>
      <Container>
        <ListItens
          showsVerticalScrollIndicator={false}
          data={items || []}
          keyExtractor={(provider: any) => provider.id.toString()}
          removeClippedSubviews={false}
          ListFooterComponent={<View style={{marginBottom: 50}} />}
          renderItem={({item: provider, index}: any) => {
            return (
              <Swipeable
                renderLeftActions={_ => leftSwipe(provider)}
                renderRightActions={_ => rightSwipe(provider)}
                useNativeAnimations={true}>
                <GridItens>
                  <InputCheckbox
                    size={25}
                    fillColor="#01ac73"
                    unfillColor="#FFFFFF"
                    text={provider.name}
                    iconStyle={{borderColor: '#01ac73'}}
                    textStyle={{
                      fontSize: 17,
                      fontFamily: 'Exo-Regular',
                    }}
                    isChecked={provider.pivot.status}
                    onPress={() => handleCheckItem(provider, index)}
                  />

                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TextJ color="#808080" direction="row">
                      {provider.pivot.qty}
                    </TextJ>
                    <TextJ ml={2} fontSize={10} color="#808080">
                      ({provider.un}) x{' '}
                    </TextJ>
                    <TextValues
                      ref={elRefs[index]}
                      key={provider.id}
                      defaultValue={provider.pivot.value.toString()}
                      keyboardType="numeric"
                      placeholder="0,00"
                      value={
                        +provider.pivot.value === 0
                          ? ''
                          : String(provider.pivot.value)
                      }
                      onBlur={() => updateItem(provider)}
                      onChangeText={(value: string) =>
                        handleChange(value, provider.pivot, 'value')
                      }
                    />
                  </View>
                </GridItens>
              </Swipeable>
            );
          }}
          ListHeaderComponent={<RenderHeader totalSelected={totalSelected} />}
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
