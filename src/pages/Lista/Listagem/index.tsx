import React, {useCallback, useEffect, useState} from 'react';

import FormLista from '../Add';
import Foto from '../../../assets/img/foto.jpg';

import {ProgressBar, Avatar} from 'react-native-paper';

import {
  ContainerList,
  Header,
  HeaderText,
  ItemList,
  ShoppingList,
  ValueText,
  ItemListText,
  ContainerText,
  IconText,
} from './style';
import {useNavigation} from '@react-navigation/native';
import {Text, View} from 'react-native';

export interface Provider {
  id: string;
  title: string;
  icon: string;
  itens?: [
    {
      name: string;
      status: boolean;
      value: number;
    },
  ];
  total: number;
}

export interface ProviderItens {
  name: string;
  status: boolean;
  value: number;
}

const Lista = () => {
  const navigate = useNavigation();

  const DATA = [
    {
      id: '1',
      title: 'Compras. Bretas',
      icon: 'clock',
      itens: [
        {key: 1, name: 'item 1', value: 10.9, status: true},
        {key: 2, name: 'item 2', value: 19.9, status: true},
        {key: 3, name: 'item 2', value: 2.9, status: true},
      ],
      total: 3,
    },
    {
      id: '2',
      title: 'Tatico Garavelo',
      icon: 'check-circle',
      itens: [
        {key: 1, name: 'item 1', value: 23.9, status: true},
        {key: 2, name: 'item 2', value: 23.9, status: false},
      ],
      total: 2,
    },
    {
      id: '3',
      title: 'Mateus supermecado.',
      icon: 'check-circle',
      itens: [
        {key: 1, name: 'item 1', value: 23.9, status: true},
        {key: 2, name: 'item 2', value: 23.9, status: true},
        {key: 3, name: 'item 2', value: 23.9, status: true},
        {key: 4, name: 'item 2', value: 23.9, status: true},
        {key: 5, name: 'item 2', value: 23.9, status: true},
      ],
      total: 5,
    },
    {
      id: '4',
      title: 'Hugão',
      icon: 'check-circle',
      itens: [
        {key: 1, name: 'item 1', value: 23.9, status: false},
        {key: 2, name: 'item 2', value: 23.9, status: false},
      ],
      total: 2,
    },
    {
      id: '5',
      title: 'Aveninda',
      icon: 'check-circle',
      itens: [
        {key: 1, name: 'item 1', value: 23.9, status: false},
        {key: 2, name: 'item 2', value: 23.9, status: false},
      ],
      total: 2,
    },
    {
      id: '6',
      title: 'Third Item',
      icon: 'check-circle',
      itens: [
        {key: 1, name: 'item 1', value: 23.9, status: false},
        {key: 2, name: 'item 2', value: 23.9, status: false},
      ],
      total: 2,
    },
  ];

  const handleSeeIten = useCallback(
    (data: any) => {
      navigate.navigate('ItensToList', {item: data});
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
      <Header
        colors={['#01ac73', '#03faa8']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <HeaderText>
          <HeaderText>Olá, Jean</HeaderText>
        </HeaderText>
      </Header>

      <ShoppingList
        data={DATA}
        renderItem={({item: provider}) => (
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
            <View style={{padding: 5}}>
              <ProgressBar
                progress={calcItensCheckt(provider)}
                color={'#01ac73'}
              />
            </View>
            <Text />
          </ContainerList>
        )}
        keyExtractor={(provider) => provider.id}
      />
      <FormLista />
    </>
  );
};

export default Lista;
