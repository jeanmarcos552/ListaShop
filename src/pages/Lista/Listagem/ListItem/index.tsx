import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, KeyboardAvoidingView, Platform, View} from 'react-native';
import {Avatar} from 'react-native-paper';

import Foto from '../../../../assets/img/foto.jpg';

import Icon from 'react-native-vector-icons/Feather';

import {
  Container,
  Header,
  HeaderText,
  Username,
  FabButtom,
  TitleContainer,
  Title,
  DisplayItensChecked,
  InputCheckbox,
} from './style';

export interface Provider {
  total: number;
  data: [{key: string; name: string; value: number}];
  itens: Array<any>;
  totalChecked?: number;
}
interface ItensLista {
  key?: string;
  itens: Array<any[]>;
  status: boolean;
}

const ItensToList: React.FC = ({route, navigation}) => {
  let {item} = route.params;

  let [itensChecked, SetItensChecked] = useState<Provider>();
  let [checked, SetChecked] = useState(0);

  useEffect(() => {
    SetItensChecked(item);
    let newChecked = 0;

    item.itens?.forEach((lista: ItensLista) => {
      if (lista.status) {
        newChecked++;
      }
    });

    SetChecked(newChecked);
  }, [item, itensChecked, checked]);

  const handleCheckItem = (provider: ItensLista) => {
    let newProvider = {...itensChecked};
    let {itens} = newProvider;
    let totalChecked = 0;
    itens?.forEach((lista: ItensLista) => {
      if (lista.key === provider.key) {
        provider.status = provider.status ? false : true;
        // newProvider.itens[key] = provider;
      }

      if (lista.status) {
        totalChecked++;
      }
    });
    SetChecked(totalChecked);
    // SetItensChecked(newProvider);
  };

  const renderHeader = () => {
    return (
      <TitleContainer>
        <Title>Itens concluídos: </Title>
        <DisplayItensChecked>
          {checked ? checked : 0}/{itensChecked?.total}
        </DisplayItensChecked>
      </TitleContainer>
    );
  };

  return (
    <>
      <Header
        colors={['#01ac73', '#03faa8']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <Icon
          name="arrow-left"
          size={20}
          color="#fff"
          onPress={() => navigation.goBack()}
        />
        <HeaderText>
          <Username>{item.title}</Username>
        </HeaderText>
        <Avatar.Image size={54} source={Foto} />
      </Header>

      <Container>
        <FlatList
          data={itensChecked?.itens}
          renderItem={({item: provider}) => (
            <InputCheckbox
              size={18}
              fillColor="#01ac73"
              unfillColor="#FFFFFF"
              text={provider.name}
              iconStyle={{borderColor: '#01ac73'}}
              textStyle={{fontFamily: 'Exo-SemiBold'}}
              isChecked={provider.status}
              onPress={() => handleCheckItem(provider)}
            />
          )}
          ListHeaderComponent={renderHeader()}
          keyExtractor={(provider) => provider.key.toString()}
        />
      </Container>
      <FabButtom onPress={() => console.log()}>
        <Icon name="plus" size={40} color="#fff" />
      </FabButtom>
    </>
  );
};

export default ItensToList;
