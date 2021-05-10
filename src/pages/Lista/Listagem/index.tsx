import React, {useCallback, useEffect, useState} from 'react';

import FormLista from '../Add';

import {ProgressBar} from 'react-native-paper';

import {
  ContainerList,
  ItemList,
  ShoppingList,
  ValueText,
  ItemListText,
  ContainerText,
  ButtonDelete,
  Container,
  IconText,
} from './style';
import {useNavigation} from '@react-navigation/native';
import {Animated, View} from 'react-native';
import HeaderLayout from '../../../Layout/Header';
import {Swipeable, TouchableOpacity} from 'react-native-gesture-handler';
import api from '../../../services/api';

interface AuthUserProvider {
  user?: {name: string};
}
export interface ProviderRequest {
  current_page: number;
  data: Array<ProviderItens>[];
}

export interface ProviderItens {
  id: number;
  name: string;
  itens: Array<ItemsReques>;
  total: number;
}

export interface ItemsReques {
  id: number;
  name: string;
  pivot: {
    qty: number;
    value: number | string;
    status: boolean;
  };
  total: number;
}

const Lista = () => {
  const navigate = useNavigation();
  const [lista, setLista] = useState<ProviderRequest>({} as ProviderRequest);
  useEffect(() => {
    api.get('/lista').then((res) => setLista(res.data));
  }, []);

  const handleDelete = useCallback((data) => {
    console.log(data);
  }, []);

  const leftSwipe = (progress: any, dragX: any, provider: ProviderItens) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    return (
      <TouchableOpacity
        onPress={() => handleDelete(provider.id)}
        activeOpacity={0.6}>
        <ButtonDelete>
          <Animated.Text style={{color: '#fff', transform: [{scale: scale}]}}>
            Deletar
          </Animated.Text>
        </ButtonDelete>
      </TouchableOpacity>
    );
  };

  const handleSeeIten = useCallback(
    (data: any) => {
      navigate.navigate('ItensToList', {item: data.itens});
    },
    [navigate],
  );

  function calcItensCheckt(provider: ProviderItens) {
    let itensChecked = 0;
    provider.itens?.forEach((item) => {
      if (item.pivot.status) {
        itensChecked++;
      }
    });
    return itensChecked / provider.itens.length;
  }

  function somaValoresItens(pivot: ProviderItens) {
    return pivot.itens
      .map((item: ItemsReques) => item.pivot)
      .map((prev: any) => +prev.qty * +prev.value)
      .reduce((prev, current) => prev + current, 0)
      .toFixed(2)
      .replace('.', ',');
  }

  return (
    <>
      <HeaderLayout />

      <Container style={{flex: 1}}>
        <ShoppingList
          data={lista.data}
          renderItem={({item: provider}) => (
            <Swipeable
              renderLeftActions={(progress, dragX) =>
                leftSwipe(progress, dragX, provider)
              }>
              <ContainerList onPress={() => handleSeeIten(provider)}>
                <ItemList>
                  <ContainerText>
                    <ItemListText>{provider.name}</ItemListText>
                    <IconText
                      name={
                        calcItensCheckt(provider) === 1
                          ? 'check-circle'
                          : 'clock'
                      }
                      color={
                        calcItensCheckt(provider) !== 1 ? '#f0ac1b' : '#01ac73'
                      }
                      size={20}
                    />
                  </ContainerText>
                  <ValueText>R$ {somaValoresItens(provider)}</ValueText>
                </ItemList>
                <View
                  style={{paddingBottom: 10, paddingLeft: 4, paddingRight: 4}}>
                  <ProgressBar
                    progress={calcItensCheckt(provider)}
                    color={'#01ac73'}
                  />
                </View>
              </ContainerList>
            </Swipeable>
          )}
          keyExtractor={(provider) => provider.id.toString()}
        />
        <FormLista />
      </Container>
    </>
  );
};

export default Lista;
