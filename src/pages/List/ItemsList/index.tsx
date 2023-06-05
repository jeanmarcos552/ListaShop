import React, {useCallback, useEffect, useState} from 'react';
import {Animated, Text, TouchableOpacity, View} from 'react-native';

import {Container, ListItens, TextValorItemsText, InputCheckbox} from './style';
import {useFocusEffect} from '@react-navigation/native';
import SkeletonListItem from './skeleton';
import HeaderSingle from '../../../Layout/HeaderSingle';
import {ItemsRequest} from '../../../types/list';
import TemplateDefault from '../../../Layout/Default';
import {showList} from '../../../services/list';
import {updateItems} from '../../../services/list/list-itens';
import {RenderFooter} from './Footer';
import {RenderHeader} from './RenderHeader';

import {UpdateItem} from './UpdateItem';
import {money} from '../../../../Utils/Mask';
import {List} from 'react-native-paper';

export interface PropsComponente {
  route: any;
  navigation: any;
}

function somaItemsSelected(arrItems: ItemsRequest[]) {
  return parseFloat(
    arrItems
      .filter(item => item.pivot.status)
      .map(item => item.pivot)
      .map((prev: any) => +prev.qty * +prev.value)
      .reduce((prev, current) => prev + current, 0)
      .toFixed(2),
  );
}

const ItemsList: React.FC<PropsComponente> = ({route, navigation}) => {
  const {id, title} = route.params;
  const [itemsChecked, setItemsChecked] = useState<ItemsRequest[]>([]);
  const [items, setItems] = useState<ItemsRequest[]>([]);
  const [trashedItem, setTrashedItem] = useState(false);
  const [clicked, setClicked] = useState<ItemsRequest | null>();
  const [height] = useState(new Animated.Value(0));
  const [somaItemsChecked, setSomaItemsChecked] = useState(0);

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
            setSomaItemsChecked(somaItemsSelected(itens));
          }
        }
      }
    } catch (erro: any) {
      console.error(erro.message);
    }
  }, [id]);

  const handleCheckedItems = useCallback(async (provider: ItemsRequest) => {
    provider.pivot.status = !provider.pivot.status;

    await updateItems({body: provider.pivot, ...provider.pivot});

    setSomaItemsChecked(total => {
      if (provider.pivot.status) {
        return parseFloat(
          (total += provider.pivot.qty * +provider.pivot.value).toFixed(2),
        );
      }
      return parseFloat(
        (total -= provider.pivot.qty * +provider.pivot.value).toFixed(2),
      );
    });
  }, []);

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

  return (
    <TemplateDefault
      header={
        <HeaderSingle
          title={title}
          navigation={navigation}
          right={
            <>
              <TouchableOpacity onPress={() => setTrashedItem(!trashedItem)}>
                {/* <Icon name="md-trash-outline" size={20} color="#fff" /> */}
                <Text>icon</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{marginLeft: 5}}>
                <Text>icon</Text>
                {/* <Icon name="ios-settings-outline" size={20} color="#fff" /> */}
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
              <List.Item
                title={provider.name}
                description={`${provider.pivot.qty} - ${provider.un}`}
                left={() => (
                  <InputCheckbox
                    size={25}
                    fillColor="#01ac73"
                    unfillColor="#FFFFFF"
                    iconStyle={{borderColor: '#01ac73'}}
                    textStyle={{
                      fontSize: 17,
                      fontFamily: 'Exo-Regular',
                    }}
                    isChecked={provider.pivot.status}
                    onPress={() => handleCheckedItems(provider)}
                  />
                )}
                right={() => (
                  <TextValorItemsText>
                    {money(provider.pivot.value, true)}
                  </TextValorItemsText>
                )}
              />
            );
          }}
        />

        <RenderFooter
          total={somaItemsChecked}
          action={() =>
            navigation.navigate('AddItemsToList', {
              item: {id, title},
            })
          }
        />
      </Container>

      <UpdateItem
        height={height}
        dados={clicked}
        handleOff={handleOff}
        itemsChecked={itemsChecked}
        setItemsChecked={setItemsChecked}
      />
    </TemplateDefault>
  );
};

export default ItemsList;
