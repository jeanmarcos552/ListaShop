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
  let [itemActive, SetItemActive] = useState({});
  const [elRefs, setElRefs] = useState<Array<any>>([]);

  useEffect(() => {
    api.get<ProviderItens>(`/lista/${id}`).then((res) => {
      if (res.data) {
        const itens = res.data;
        SetItensChecked(itens);
        setElRefs((el) =>
          Array(itens.itens.length)
            .fill(itens.itens.length)
            .map((_, i) => el[i] || createRef()),
        );
      }
    });
  }, [id]);

  const handleCheckItem = (provider: ItemsReques, index: number) => {
    let {pivot} = provider;

    !pivot.status ? elRefs[index].current.focus() : '';

    pivot.status = !pivot.status;

    const obj = {
      lista_id: pivot.lista_id,
      itens_id: pivot.itens_id,
      itens: {
        status: pivot.status,
      },
    };
    api.post('/updateItem', obj);
  };

  const updateValue = () => {
    api.post('/updateItem', itemActive);
  };

  const SetValuesItens = (text: string, {id}: any) => {
    let obj = {};
    let itens = itensChecked.itens.map((item: ItemsReques) => {
      if (id === item.id) {
        item.pivot.value = text.replace(',', '.');

        obj = {
          lista_id: item.pivot.lista_id,
          itens_id: item.pivot.itens_id,
          itens: {
            value: item.pivot.value,
          },
        };
      }
      return item;
    });
    SetItemActive(obj);
    SetItensChecked({...itensChecked, itens});
  };

  const renderHeader = () => {
    return (
      <TitleContainer>
        <Title>Itens concluídos: </Title>
        {itensChecked.itens ? (
          <DisplayItensChecked>
            {checked ? checked : 0}/{itensChecked.itens.length}
          </DisplayItensChecked>
        ) : (
          <DisplayItensChecked>0</DisplayItensChecked>
        )}
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
                    onBlur={updateValue}
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
