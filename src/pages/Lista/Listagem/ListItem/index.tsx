/* eslint-disable react-native/no-inline-styles */
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
import {ItemsReques, ProviderItens} from '..';
import api from '../../../../services/api';

interface PropsComponente {
  route: any;
  navigation: any;
}

const ItensToList: React.FC<PropsComponente> = ({route, navigation}) => {
  let {id} = route.params;

  let [itensChecked, SetItensChecked] = useState<ProviderItens>(
    {} as ProviderItens,
  );
  let [checked, SetChecked] = useState(0);
  const [elRefs, setElRefs] = useState<Array<any>>([]);

  useEffect(() => {
    api.get<ProviderItens>(`/lista/${id}`).then((res) => {
      if (res.data) {
        const itens = res.data[0];
        SetItensChecked(itens);
        setElRefs((el) =>
          Array(itens.itens.length)
            .fill(itens.itens.length.length)
            .map((_, i) => el[i] || createRef()),
        );
      }
    });
  }, [id]);

  const handleCheckItem = (provider: ItemsReques, index: number) => {
    elRefs[index].current.focus();

    // let newProvider = {...itensChecked};

    // let totalChecked = 0;
    // newProvider?.forEach((lista: ItemsReques) => {
    //   if (lista.id === provider.id) {
    //     provider.status = provider.status ? false : true;
    //   }
    //   if (lista.status) {
    //     totalChecked++;
    //   }
    // });
    // SetChecked(totalChecked);
  };

  const SetValuesItens = (text: string, {id}: any) => {
    let itens = itensChecked.itens.map((item) => {
      if (id === item.id) {
        item.pivot.value = text.replace(',', '.');
      }
      return item;
    });
    SetItensChecked({...itensChecked, itens});
  };

  const renderHeader = () => {
    return (
      <TitleContainer>
        <Title>Itens concluídos: </Title>
        {/* <DisplayItensChecked>
          {checked ? checked : 0}/{itensChecked?.total}
        </DisplayItensChecked> */}
      </TitleContainer>
    );
  };

  const renderFooter = () => {
    return (
      <TitleContainer>
        <TotalFooter>
          R$
          {itensChecked.itens
            ? itensChecked.itens
                .filter((item) => item.pivot.status === true)
                .map((item) =>
                  isNaN(parseFloat(item.pivot.value))
                    ? 0
                    : parseFloat(item.pivot.value),
                )
                .reduce((prev, current) => prev + current, 0)
                .toFixed(2)
                .replace('.', ',')
            : ''}
        </TotalFooter>
      </TitleContainer>
    );
  };

  return (
    <>
      <HeaderSingle title="jean" navigation={navigation} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}
        enabled
        style={{flex: 1}}>
        <Container>
          <ListItens
            data={itensChecked.itens}
            keyExtractor={(provider) => provider.id.toString()}
            renderItem={({item: provider, index}) => {
              return (
                <GridItens>
                  <InputCheckbox
                    size={25}
                    fillColor="#01ac73"
                    unfillColor="#FFFFFF"
                    text={provider.name}
                    iconStyle={{borderColor: '#01ac73'}}
                    textStyle={{
                      fontSize: 20,
                      fontFamily: 'Exo-Regular',
                    }}
                    isChecked={provider.pivot.status}
                    onPress={() => handleCheckItem(provider, index)}
                  />
                  <TextValues
                    ref={elRefs[index]}
                    key={provider.id}
                    defaultValue={provider.pivot.value.toString()}
                    keyboardType="numeric"
                    placeholder="0,00"
                    value={provider.pivot.value.toString()}
                    onChangeText={(text) => SetValuesItens(text, provider)}
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
