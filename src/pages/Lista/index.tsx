import React from 'react';

import FormLista from './Form';
import Foto from '../../assets/img/foto.jpg';
import {ScrollView} from 'react-native';

import {ProgressBar, Colors, Avatar} from 'react-native-paper';

import {
  ContainerList,
  Header,
  HeaderText,
  ItemList,
  ShoppingList,
  Username,
} from './style';

export interface Provider {
  id: string;
  title: string;
}

const Lista = () => {
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Compras. Bretas',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Tatico Garavelo',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Diegão',
    },
    {
      id: '58694a0de-3da1-471f-bd96-145571e29d72',
      title: 'Mateus supermecado.',
    },
    {
      id: '68694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Hugão',
    },
    {
      id: '58690f-3da1-471f-bd96-145571e29d72',
      title: 'Store',
    },
    {
      id: '5869rr4a0f-3da1-471f-bd96-145571e29d72',
      title: 'Aveninda',
    },
    {
      id: '58de694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];
  return (
    <>
      <Header
        colors={['#01ac73', '#03faa8']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <HeaderText>
          <Username>Minhas listas</Username>
        </HeaderText>
        <Avatar.Image size={54} source={Foto} />
      </Header>

      <ShoppingList
        data={DATA}
        renderItem={({item: provider}) => (
          <ContainerList>
            <ItemList>{provider.title}</ItemList>
            <ProgressBar progress={0.5} color={Colors.teal800} />
          </ContainerList>
        )}
        keyExtractor={(provider) => provider.id}
      />

      <FormLista />
    </>
  );
};

export default Lista;
