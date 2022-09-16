import React, {useCallback, useEffect, useState} from 'react';
import {Animated, Text, TouchableOpacity, View} from 'react-native';

import {
  Container,
  ListItens,
  GridItens,
  TextNameItems,
  TextQuantidadeItemsText,
  TextQuantidadeItemsView,
  TextValorItemsView,
  TextValorItemsText,
} from './style';
import {useFocusEffect} from '@react-navigation/native';
import SkeletonListItem from './skeleton';
import HeaderSingle from '../../../Layout/HeaderSingle';
import {ItemsRequest} from '../../../types/list';
import TemplateDefault from '../../../Layout/Default';
import {showList} from '../../../services/list';
// import {removeItemToList, updateItems} from '../../../services/list/list-itens';
import {ViewJ} from '../../../styles/global';
import {RenderFooter} from './Footer';
import {RenderHeader} from './RenderHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import {UpdateItem} from './UpdateItem';
import {Money} from '../../../../Utils/Mask';

export interface PropsComponente {
  route: any;
  navigation: any;
}
function itemIsChecked(obj: ItemsRequest, checkedList: ItemsRequest[]) {
  return checkedList.map(item => item.id).includes(obj.id);
}

function checkItemsSelected(items: ItemsRequest[]): ItemsRequest[] {
  const totalSelected = items?.filter(item => item.pivot.status);
  return totalSelected;
}

const ItemsList: React.FC<PropsComponente> = ({route, navigation}) => {
  const {id, title} = route.params;
  const [itemsChecked, setItemsChecked] = useState<ItemsRequest[]>([]);
  const [items, setItems] = useState<ItemsRequest[]>([]);
  const [trashedItem, setTrashedItem] = useState(false);
  const [clicked, setClicked] = useState<ItemsRequest | null>();
  const [height] = useState(new Animated.Value(0));

  const handleShow = useCallback(() => {
    Animated.timing(height, {
      toValue: 250,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [height]);

  const handleOff = useCallback(() => {
    Animated.timing(height, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();

    setTimeout(() => setClicked(null), 1000);
  }, [height]);

  const getDados = useCallback(async () => {
    try {
      const {data, status} = await showList(id);

      if (status === 200) {
        if (data.itens) {
          const {itens} = data;
          if (itens) {
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

  useFocusEffect(
    useCallback(() => {
      getDados();
    }, [getDados]),
  );

  useEffect(() => {
    if (clicked) {
      handleShow();
    }
  }, [clicked, handleShow]);

  console.log('renderizou');
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
          renderItem={({item: provider}) => {
            return (
              <GridItens onPress={() => handleCheckedItems(provider)}>
                <ViewJ direction="row" alignItems="center">
                  <TextQuantidadeItemsView
                    onPress={() => setClicked(provider)}
                    checked={itemIsChecked(provider, itemsChecked)}>
                    <TextQuantidadeItemsText
                      checked={itemIsChecked(provider, itemsChecked)}>
                      {provider.pivot.qty}
                    </TextQuantidadeItemsText>
                  </TextQuantidadeItemsView>
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
                <TextValorItemsView onPress={() => setClicked(provider)}>
                  <TextValorItemsText>
                    {Money(provider.pivot.value)}
                  </TextValorItemsText>
                </TextValorItemsView>
              </GridItens>
            );
          }}
        />

        <RenderFooter
          items={itemsChecked}
          action={() =>
            navigation.navigate('AddItemsToList', {
              item: {id, title},
            })
          }
        />
      </Container>
      {clicked && (
        <UpdateItem height={height} dados={clicked} handleOff={handleOff} />
      )}
    </TemplateDefault>
  );
};

export default ItemsList;
