import React, { useCallback } from 'react';

import FormLista from '../Add';

import { ProgressBar } from 'react-native-paper';

import {
  ContainerList,
  ItemList,
  ShoppingList,
  ValueText,
  ItemListText,
  ContainerText,
  IconText,
  ButtonDelete,
  Container,
} from './style';
import { useNavigation } from '@react-navigation/native';
import { Animated, FlatList, Text, View } from 'react-native';
import HeaderLayout from '../../../Layout/Header';
import { Swipeable, TouchableOpacity } from 'react-native-gesture-handler';

export interface Provider {
  id: string;
  title: string;
  icon: string;
  itens?: Array<ProviderItens>;
  total: number;
}

export interface ProviderItens {
  key: number;
  name: string;
  status: boolean;
  value: number;
}

const Lista = () => {
  const navigate = useNavigation();

  const DATA: Array<Provider> = [
    {
      id: '1',
      title: 'Compras. Bretas',
      icon: 'clock',
      itens: [
        { key: 1, name: 'item 1', value: 10.9, status: true },
        { key: 2, name: 'item 2', value: 19.9, status: true },
        { key: 55, name: 'item 2', value: 2.9, status: true },
      ],
      total: 3,
    },
    {
      id: '2',
      title: 'Tatico Garavelo',
      icon: 'check-circle',
      itens: [
        { key: 1, name: 'item 1', value: 23.9, status: true },
        { key: 2, name: 'item 2', value: 23.9, status: false },
      ],
      total: 2,
    },
    {
      id: '3',
      title: 'Mateus supermecado.',
      icon: 'check-circle',
      itens: [
        { key: 1, name: 'item 1', value: 23.9, status: true },
        { key: 2, name: 'item 2', value: 23.9, status: true },
        { key: 3, name: 'item 2', value: 23.9, status: true },
        { key: 4, name: 'item 2', value: 23.9, status: true },
        { key: 5, name: 'item 2', value: 23.9, status: true },
      ],
      total: 5,
    },
    {
      id: '4',
      title: 'Hugão',
      icon: 'check-circle',
      itens: [
        { key: 1, name: 'item 1', value: 23.9, status: false },
        { key: 2, name: 'item 2', value: 23.9, status: false },
      ],
      total: 2,
    },
    {
      id: '5',
      title: 'Aveninda',
      icon: 'check-circle',
      itens: [
        { key: 1, name: 'item 1', value: 23.9, status: false },
        { key: 2, name: 'item 2', value: 23.9, status: false },
      ],
      total: 2,
    },
    {
      id: '6',
      title: 'Third Item',
      icon: 'check-circle',
      itens: [
        { key: 1, name: 'item 1', value: 23.9, status: false },
        { key: 2, name: 'item 2', value: 23.9, status: false },
      ],
      total: 2,
    },
  ];

  const handleDelete = useCallback((data) => {
    console.log(data);
  }, []);

  const leftSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    return (
      <TouchableOpacity onPress={handleDelete} activeOpacity={0.6}>
        <ButtonDelete >
          <Animated.Text style={{ color: '#fff', transform: [{ scale: scale }] }}>
            Delete
        </Animated.Text>
        </ButtonDelete>
      </TouchableOpacity>
    );
  };

  const handleSeeIten = useCallback(
    (data: any) => {
      navigate.navigate('ItensToList', { item: data });
    },
    [navigate],
  );

  function calcItensCheckt(provider: Provider) {
    let itensChecked = 0;
    provider.itens?.forEach((item) => {
      if (item.status) {
        itensChecked++;
      }
    });
    return itensChecked / provider.total;
  }

  return (
    <>
      <HeaderLayout name="Jean" />

      <Container style={{ flex: 1 }}>
        <ShoppingList
          data={DATA}
          renderItem={({ item: provider }) => (
            <Swipeable renderLeftActions={leftSwipe}>
              <ContainerList onPress={() => handleSeeIten(provider)}>
                <ItemList>
                  <ContainerText>
                    <ItemListText>{provider.title}</ItemListText>
                    <IconText
                      name={
                        calcItensCheckt(provider) === 1 ? 'check-circle' : 'clock'
                      }
                      color={
                        calcItensCheckt(provider) !== 1 ? '#f0ac1b' : '#01ac73'
                      }
                      size={20}
                    />
                  </ContainerText>
                  <ValueText>R$ 299,90</ValueText>
                </ItemList>
                <View style={{ paddingBottom: 10, paddingLeft: 4, paddingRight: 4 }}>
                  <ProgressBar
                    progress={calcItensCheckt(provider)}
                    color={'#01ac73'}
                  />
                </View>
              </ContainerList>
            </Swipeable>
          )}
        />
        <FormLista />
      </Container>
    </>
  );
};

export default Lista;
