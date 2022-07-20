import React, {createRef, useCallback, useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform, Text, View} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

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
import {Swipeable, TouchableOpacity} from 'react-native-gesture-handler';
import {useFocusEffect} from '@react-navigation/native';
import SkeletonListItem from './skeleton';
import api from '../../../services/api';
import HeaderSingle from '../../../Layout/HeaderSingle';
import {
  FiltroItensList,
  ItemsRequest,
  ProviderItemsList,
} from '../../../types/list';
import TemplateDefault from '../../../Layout/Default';
import {showList} from '../../../services/lista';

interface PropsComponente {
  route: any;
  navigation: any;
}

const ItensToList: React.FC<PropsComponente> = ({route, navigation}) => {
  let {id, title} = route.params;
  let [items, SetItems] = useState<ItemsRequest[]>();
  const [elRefs, setElRefs] = useState<Array<any>>([]);
  let [filter, setFilter] = useState<FiltroItensList>();
  let [somaItens, setSomaItens] = useState('0');

  const getDados = useCallback(async () => {
    try {
      const {data, status} = await showList(id);

      if (status === 200) {
        somaValoresItens(data);

        if (data.itens) {
          const {itens} = data;
          if (itens) {
            SetItems(itens);

            setElRefs(el =>
              Array(itens.length)
                .fill(itens.length)
                .map((_, i) => el[i] || createRef()),
            );
          }
        }
      } else {
        SetItems([]);
      }
    } catch (erro) {
      console.log(erro.message);
    }
  }, [id]);

  useEffect(() => {
    getDados();
  }, [getDados]);

  useFocusEffect(
    useCallback(() => {
      getDados();
    }, [getDados]),
  );

  const handleCheckItem = useCallback(
    async (provider: ItemsRequest, index: number) => {
      let {pivot} = provider;

      !pivot.status ? elRefs[index].current.focus() : '';

      pivot.status = !pivot.status;

      api
        .put(`/updateItem/${pivot.lista_id}/${pivot.itens_id}`, {...pivot})
        .then(_ => {
          if (!pivot.status) {
            getDados();
          }
        });
    },
    [elRefs, getDados],
  );

  const updateItem = (provider: ProviderItemsList) => {
    const newPivot = {...provider.pivot};
    newPivot.value = newPivot.value.replace(',', '.');
    api
      .put(`/updateItem/${newPivot.lista_id}/${newPivot.itens_id}`, newPivot)
      .then(_ => getDados());
  };

  const renderHeader = () => {
    return (
      <TitleContainer>
        <Title>Itens concluídos: </Title>
        <DisplayItensChecked>0</DisplayItensChecked>
      </TitleContainer>
    );
  };

  const renderFooter = () => {
    return (
      <TitleContainer>
        <TouchableOpacity
          onPress={() => setFilter({...filter, itens: !filter?.itens})}
          style={{backgroundColor: '#e7e4e4', borderRadius: 50, padding: 5}}>
          <Icon
            name={filter?.itens ? 'check' : 'circle'}
            size={20}
            color="#01ac73"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFilter({...filter, itens: false})}
          style={{backgroundColor: '#e7e4e4', borderRadius: 50, padding: 5}}>
          <Icon name="rotate-ccw" size={20} color="#01ac73" />
        </TouchableOpacity>
        <TotalFooter>
          R$
          {somaItens}
        </TotalFooter>
        <FabButtom
          onPress={() =>
            navigation.navigate('AddToList', {
              item: {id, title},
            })
          }>
          <Icon name="plus" size={30} color="#fff" />
        </FabButtom>
      </TitleContainer>
    );
  };

  const handleChange = useCallback(
    (value: string, pivot: any, key = '') => {
      if (!items?.length) {
        return;
      }

      const copyItem = [...items];
      pivot[key] = value;

      copyItem?.map(provider => {
        if (provider.id === pivot) {
          return (provider.pivot = pivot);
        }
      });
      SetItems(copyItem);
    },
    [items],
  );

  function somaValoresItens(pivot: any) {
    if (!pivot) {
      return 0;
    }

    const total = pivot.itens
      .map((item: ItemsRequest) => item.pivot)
      .filter(item => item.status === true)
      .map((prev: any) => +prev.qty * +prev.value)
      .reduce((prev, current) => prev + current, 0)
      .toFixed(2)
      .replace('.', ',');
    setSomaItens(total);
  }

  const leftSwipe = (provider: ItemsRequest) => {
    let {pivot} = provider;
    return (
      <TextValues
        key={pivot.lista_id.toString()}
        defaultValue={pivot.qty.toString()}
        keyboardType="numeric"
        placeholder="0"
        value={pivot.qty.toString()}
        onBlur={() => updateItem(provider)}
        onChangeText={(value: string) => handleChange(value, pivot, 'qty')}
      />
    );
  };

  return (
    <>
      <HeaderSingle title={title} navigation={navigation} />
      <TemplateDefault loadingComponent={<SkeletonListItem />} loading={false}>
        <>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'android' ? 'height' : 'padding'}
            enabled
            style={{flex: 1}}>
            <Container>
              <ListItens
                data={items || []}
                keyExtractor={(provider: any) => provider.id.toString()}
                style={{backgroundColor: '#fff'}}
                renderItem={({item: provider, index}: any) => {
                  return (
                    <Swipeable renderLeftActions={_ => leftSwipe(provider)}>
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
                            onChangeText={(value: string) =>
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
        </>
      </TemplateDefault>
    </>
  );
};

export default ItensToList;
