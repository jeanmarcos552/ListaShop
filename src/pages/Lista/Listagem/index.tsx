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
  Username,
  ValueText,
  ItemListText,
  ContainerText,
  IconText,
} from './style';
import {useNavigation} from '@react-navigation/native';
import {View} from 'react-native';

export interface Provider {
  id: string;
  title: string;
  icon: string;
}

const Lista = () => {
  const navigate = useNavigation();

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Compras. Bretas',
      icon: 'x-circle',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Tatico Garavelo',
      icon: 'check-circle',
    },
    {
      id: '58694a0de-3da1-471f-bd96-145571e29d72',
      title: 'Mateus supermecado.',
      icon: 'check-circle',
    },
    {
      id: '68694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Hugão',
      icon: 'check-circle',
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
    },
    {
      id: '58de694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
      icon: 'check-circle',
    },
  ];

  const handleSeeIten = useCallback(
    (data: any) => {
      navigate.navigate('ItensToList', {item: data});
    },
    [navigate],
  );

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

            <View>
              <ProgressBar progress={0.5} color={Colors.teal800} />
            </View>
          </ContainerList>
        )}
        keyExtractor={(provider) => provider.id}
      />
      <FormLista />
    </>
  );
};

export default Lista;
