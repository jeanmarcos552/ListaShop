import React, {createRef, useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import HeaderSingle from '../../../../Layout/HeaderSingle';

import {
  Container,
  FabButtom,
  TitleContainer,
  Title,
  DisplayItensChecked,
  InputCheckbox,
  TotalFooter,
  ListItens,
  GridItens,
  TextValues,
} from './style';

export interface Provider {
  id: number;
  total: number;
  data: [{key: string; name: string; value: number}];
  itens: Array<any>;
  totalChecked?: number;
}
interface ItensLista {
  key?: string;
  itens: Array<any[]>;
  status: boolean;
  value: string;
  current: any;
}

interface PropsComponente {
  route: any;
  navigation: any;
}

const ItensToList: React.FC<PropsComponente> = ({route, navigation}) => {
  let {item} = route.params;

  let [itensChecked, SetItensChecked] = useState<Provider>();
  let [checked, SetChecked] = useState(0);

  const [elRefs, setElRefs] = useState<Array<any>>([]);
  let arrLength: Array<any>[];
  arrLength = item.itens?.length + 1;

  useEffect(() => {
    SetItensChecked(item);
    SetChecked(
      item.itens?.filter((lista: ItensLista) => lista.status === true).length,
    );
  }, [item, itensChecked, checked]);

  useEffect(() => {
    setElRefs((el) =>
      Array(arrLength)
        .fill(arrLength)
        .map((_, i) => el[i] || createRef()),
    );
  }, [arrLength]);

  const handleCheckItem = (provider: ItensLista, index: number) => {
    elRefs[index].current.focus();

    let newProvider = {...itensChecked};
    let {itens} = newProvider;
    let totalChecked = 0;
    itens?.forEach((lista: ItensLista) => {
      if (lista.key === provider.key) {
        provider.status = provider.status ? false : true;
      }
      if (lista.status) {
        totalChecked++;
      }
    });
    SetChecked(totalChecked);
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

  const renderFooter = () => {
    return (
      <TitleContainer>
        <TotalFooter>
          R$
          {itensChecked?.itens
            .map((item) => parseFloat(item.value))
            .reduce((prev, current) => prev + current)
            .toFixed(2)
            .replace('.', ',')}
        </TotalFooter>
      </TitleContainer>
    );
  };

  return (
    <>
      <HeaderSingle title={item.title} navigation={navigation} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}
        enabled
        style={{flex: 1}}>
        <Container>
          <ListItens
            data={itensChecked?.itens}
            keyExtractor={(provider) => provider.key.toString()}
            renderItem={({item: provider, index}) => {
              return (
                <GridItens>
                  <InputCheckbox
                    size={18}
                    fillColor="#01ac73"
                    unfillColor="#FFFFFF"
                    text={provider.name}
                    iconStyle={{borderColor: '#01ac73'}}
                    textStyle={{fontFamily: 'Exo-SemiBold'}}
                    isChecked={provider.status}
                    onPress={() => handleCheckItem(provider, index)}
                  />
                  <TextValues
                    ref={elRefs[index]}
                    key={provider.key}
                    defaultValue={provider.value.toString()}
                    keyboardType="numeric"
                    placeholder="0,00"
                  />
                </GridItens>
              );
            }}
            ListHeaderComponent={renderHeader()}
          />
          {renderFooter()}
        </Container>
      </KeyboardAvoidingView>

      <FabButtom
        onPress={() => navigation.navigate('AddToList', {item: itensChecked})}>
        <Icon name="plus" size={40} color="#fff" />
      </FabButtom>
    </>
  );
};

export default ItensToList;
