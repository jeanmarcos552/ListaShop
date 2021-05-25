/* eslint-disable react-native/no-inline-styles */
import React, {createRef, useCallback, useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform, Text, View} from 'react-native';

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
import {Swipeable, TouchableOpacity} from 'react-native-gesture-handler';
import {useFocusEffect} from '@react-navigation/native';
import SkeletonListItem from './skeleton';

interface PropsComponente {
  route: any;
  navigation: any;
}

export interface ProviderItensLista {
  pivot: {
    qty: number;
    value: string;
    status: boolean;
    lista_id: number;
    itens_id: number;
  };
}

const ItensToList: React.FC<PropsComponente> = ({route, navigation}) => {
  let {id, title} = route.params;
  let [items, SetItems] = useState<ProviderItens>({} as ProviderItens);
  const [elRefs, setElRefs] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);
  const [itensSelected, setItensSelected] = useState(false);

  const getDados = useCallback(() => {
    api.get<ProviderItens>(`/lista/${id}`).then((res) => {
      if (res.data) {
        let itens = res.data;
        if (itens.itens) {
          SetItems(itens);
          setLoading(false);
          setElRefs((el) =>
            Array(itens.itens.length)
              .fill(itens.itens.length)
              .map((_, i) => el[i] || createRef()),
          );
        }
      }
    });
  }, [id, SetItems]);

  useEffect(() => {
    getDados();
  }, [id, getDados]);

  useFocusEffect(
    useCallback(() => {
      getDados();
    }, [getDados]),
  );

  const handleCheckItem = (provider: ItemsReques, index: number) => {
    let {pivot} = provider;

    !pivot.status ? elRefs[index].current.focus() : '';

    pivot.status = !pivot.status;

    api.post('/updateItem', {...pivot}).then((_) => getDados());
  };

  const updateItem = (provider: ProviderItensLista) => {
    const newPivot = {...provider.pivot};
    newPivot.value = newPivot.value.replace(',', '.');
    api.post('/updateItem', newPivot).then((_) => getDados());
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

  const showItens = async (show: boolean) => {
    if (show === false) {
      setItensSelected(false);
      let newItens = Object.assign({}, items);

      api.get(`/itensLista/${id}?status=false`).then((res) => {
        newItens.itens = res.data;
      });
      SetItems(newItens);
    } else {
      getDados();
      setItensSelected(true);
    }
  };

  const renderFooter = () => {
    return (
      <TitleContainer>
        <TouchableOpacity
          onPress={() => showItens(!itensSelected)}
          style={{backgroundColor: '#e7e4e4', borderRadius: 50, padding: 5}}>
          <Icon
            name={itensSelected ? 'check' : 'circle'}
            size={18}
            color="#01ac73"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => getDados()}
          style={{backgroundColor: '#e7e4e4', borderRadius: 50, padding: 5}}>
          <Icon name="rotate-ccw" size={18} color="#01ac73" />
        </TouchableOpacity>
        <TotalFooter>
          R$
          {somaValoresItens(items)}
        </TotalFooter>
      </TitleContainer>
    );
  };

  function handleChange(value: string, pivot: any, key = '') {
    pivot[key] = value;
    let newPivot = {...items};
    newPivot.itens.map((provider) => {
      if (provider.id === pivot) {
        return (provider.pivot = pivot);
      }
    });
    SetItems(newPivot);
  }

  function somaValoresItens(pivot: ProviderItens) {
    if (!pivot.itens) {
      return 0;
    }
    return pivot.itens
      .map((item: ItemsReques) => item.pivot)
      .filter((item) => item.status === true)
      .map((prev: any) => +prev.qty * +prev.value)
      .reduce((prev, current) => prev + current, 0)
      .toFixed(2)
      .replace('.', ',');
  }

  const leftSwipe = (provider: ItemsReques) => {
    let {pivot} = provider;
    return (
      <TextValues
        key={pivot.lista_id.toString()}
        defaultValue={pivot.qty.toString()}
        keyboardType="numeric"
        placeholder="0"
        value={pivot.qty.toString()}
        onBlur={() => updateItem(provider)}
        onChangeText={(value) => handleChange(value, pivot, 'qty')}
      />
    );
  };

  return (
    <>
      <HeaderSingle title={title} navigation={navigation} />
      {loading ? (
        <SkeletonListItem />
      ) : (
        <>
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
                    <Swipeable renderLeftActions={(_) => leftSwipe(provider)}>
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
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Text style={{color: '#808080'}}>
                            {provider.pivot.qty} x{' '}
                          </Text>
                          <TextValues
                            ref={elRefs[index]}
                            key={provider.id}
                            defaultValue={provider.pivot.value.toString()}
                            keyboardType="numeric"
                            placeholder="0,00"
                            value={provider.pivot.value.toString()}
                            onBlur={() => updateItem(provider)}
                            onChangeText={(value) =>
                              handleChange(value, provider.pivot, 'value')
                            }
                          />
                        </View>
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
            onPress={() =>
              navigation.navigate('AddToList', {
                item: {id, title},
              })
            }>
            <Icon name="plus" size={40} color="#fff" />
          </FabButtom>
        </>
      )}
    </>
  );
};

export default ItensToList;
