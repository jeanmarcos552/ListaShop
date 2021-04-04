import React, {useCallback} from 'react';

import FormLista from '../Add';
import Foto from '../../../assets/img/foto.jpg';

import {ProgressBar, Colors, Avatar} from 'react-native-paper';

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
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Compras. Bretas',
      icon: 'x-circle',
      itens: [
        {key: 1, name: 'item 1', value: 23.9, status: false},
        {key: 2, name: 'item 2', value: 23.9, status: true},
        {key: 2, name: 'item 2', value: 23.9, status: true},
      ],
      total: 3,
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Tatico Garavelo',
      icon: 'check-circle',
      itens: [
        {key: 1, name: 'item 1', value: 23.9, status: true},
        {key: 2, name: 'item 2', value: 23.9, status: false},
      ],
      total: 2,
    },
    {
      id: '58694a0de-3da1-471f-bd96-145571e29d72',
      title: 'Mateus supermecado.',
      icon: 'check-circle',
      itens: [
        {key: 1, name: 'item 1', value: 23.9, status: false},
        {key: 2, name: 'item 2', value: 23.9, status: false},
      ],
      total: 2,
    },
    {
      id: '68694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Hugão',
      icon: 'check-circle',
      itens: [
        {key: 1, name: 'item 1', value: 23.9, status: false},
        {key: 2, name: 'item 2', value: 23.9, status: false},
      ],
      total: 2,
    },
    {
      id: '58690f-3da1-471f-bd96-145571e29d72',
      title: 'Store',
      icon: 'x-circle',
    },
    {
      id: '5869rr4a0f-3da1-471f-bd96-145571e29d72',
      title: 'Aveninda',
      icon: 'check-circle',
      itens: [
        {key: 1, name: 'item 1', value: 23.9, status: false},
        {key: 2, name: 'item 2', value: 23.9, status: false},
      ],
      total: 2,
    },
    {
      id: '58de694a0f-3da1-471f-bd96-145571e29d72',
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
    let itensChected = 0;
    provider.itens?.map((item) => {
      if (item.status) {
        itensChected++;
      }
    });

    return itensChected / provider.total;
  }

  return (
    <>
      <Header
        colors={['#01ac73', '#03faa8']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <HeaderText>
          <HeaderText>Minhas listas</HeaderText>
        </HeaderText>
        <Avatar.Image size={54} source={Foto} />
      </Header>

      <ShoppingList
        data={DATA}
        renderItem={({item: provider}) => (
          <ContainerList onPress={() => handleSeeIten(provider)}>
            <ItemList>
              <ContainerText>
                <ItemListText>{provider.title}</ItemListText>
                <IconText
                  name={provider.icon}
                  color={
                    provider.icon !== 'check-circle' ? '#e3134a' : '#01ac73'
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
