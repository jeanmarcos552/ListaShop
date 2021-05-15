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
import {Swipeable} from 'react-native-gesture-handler';

interface PropsComponente {
  route: any;
  navigation: any;
}

const ItensToList: React.FC<PropsComponente> = ({route, navigation}) => {
  let {id, title} = route.params;

  let [items, SetItems] = useState<ProviderItens>({} as ProviderItens);
  const [elRefs, setElRefs] = useState<Array<any>>([]);

  useEffect(() => {
    if (id) {
      api.get<ProviderItens>(`/lista/${id}`).then((res) => {
        if (res.data) {
          const itens = res.data;
          SetItems(itens);
          setElRefs((el) =>
            Array(itens.itens.length)
              .fill(itens.itens.length)
              .map((_, i) => el[i] || createRef()),
          );
        }
      });
    }
  }, [id]);

  const handleCheckItem = (provider: ItemsReques, index: number) => {
    let {pivot} = provider;

    !pivot.status ? elRefs[index].current.focus() : '';

    pivot.status = !pivot.status;

    api
      .post('/updateItem', {...pivot})
      .then((_) => SetValuesItens(pivot.value, provider));
  };

  const updateValue = (provider: ItemsReques) => {
    api
      .post('/updateItem', {...provider.pivot})
      .then((res) => console.log(res));
  };

  const SetValuesItens = (value: string, id: any, key = 'value') => {
    let itens = items.itens.map((item: ItemsReques) => {
      if (id === item.id) {
        if (key === 'value') {
          item.pivot.value = value.replace(',', '.');
        } else {
          console.log(value, item.pivot.qty);
          // eslint-disable-next-line radix
          item.pivot.qty = isNaN(parseInt(value)) ? 1 : parseInt(value);
        }
      }
      return item;
    });
    SetItems({...items, itens});
  };

  const SetQtyItens = (provider: ItemsReques) => {
    api
      .post('/updateItem', {...provider.pivot})
      .then((res) => console.log(res));
  };

  function calcItensChecked(provider: ProviderItens) {
    let itensChecked = provider.itens?.filter(
      (item) => item.pivot.status === true,
    );
    return `${itensChecked.length} de ${items.itens.length}`;
  }

  const renderHeader = () => {
    return (
      <TitleContainer>
        <Title>Itens concluídos: </Title>
        {items.itens ? (
          <DisplayItensChecked>{calcItensChecked(items)}</DisplayItensChecked>
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
          {items.itens
            ? items.itens
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

  const leftSwipe = (progress: any, dragX: any, provider: ItemsReques) => {
    return (
      <TextValues
        key={provider.id}
        defaultValue={provider.pivot.qty.toString()}
        keyboardType="numeric"
        placeholder="0"
        value={provider.pivot.qty.toString()}
        onBlur={() => SetQtyItens(provider)}
        onChangeText={(value) => SetValuesItens(value, provider.id, 'qty')}
      />
    );
  };
  return (
    <>
      <HeaderSingle title={title} navigation={navigation} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}
        enabled
        style={{flex: 1}}>
        <Container>
          <ListItens
            data={items.itens}
            keyExtractor={(provider) => provider.id.toString()}
            style={{backgroundColor: '#fff'}}
            renderItem={({item: provider, index}) => {
              return (
                <Swipeable
                  renderLeftActions={(progress, dragX) =>
                    leftSwipe(progress, dragX, provider)
                  }>
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
                      onBlur={() => updateValue(provider)}
                      onChangeText={(value) => SetValuesItens(value, provider)}
                    />
                  </GridItens>
                </Swipeable>
              );
            }}
            ListHeaderComponent={renderHeader()}
          />
          {renderFooter()}
        </Container>
      </KeyboardAvoidingView>

      <FabButtom
        onPress={() => navigation.navigate('AddToList', {item: items})}>
        <Icon name="plus" size={40} color="#fff" />
      </FabButtom>
    </>
  );
};

export default ItensToList;
