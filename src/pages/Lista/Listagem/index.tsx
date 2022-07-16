/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import moment from 'moment';

import FormLista from '../Add';

import {ProgressBar} from 'react-native-paper';

import {
  ContainerList,
  ItemList,
  ShoppingList,
  ValueText,
  ItemListText,
  ContainerText,
  Container,
  IconText,
  ProgressBarView,
  FooterLoop,
  TextRigthFooter,
} from './style';
import {
  NavigationProp,
  ParamListBase,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {RefreshControl, View} from 'react-native';
import HeaderLayout from '../../../Layout/Header';
import api from '../../../services/api';
import SkeletonListagem from './skeleton';
import ShareLista from './AddToUser';

export interface ProviderRequest {
  current_page: number;
  data: Array<ProviderItens>[];
}

export interface ProviderItens {
  id: number;
  name: string;
  itens: Array<ItemsReques>;
  total: number;
  info: {
    itens: number;
    user: number;
  };
}

export interface ItemsReques {
  id: number;
  name: string;
  itens: Array<any>;
  pivot: {
    qty: number;
    value: string;
    status: boolean;
    lista_id: number;
    itens_id: number;
  };
  total: number;
}

const Lista = () => {
  const navigate = useNavigation<NavigationProp<ParamListBase>>();
  const [lista, setLista] = useState<ProviderRequest>({} as ProviderRequest);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const getDados = useCallback(() => {
    api
      .get<ProviderRequest>('/lista')
      .then(res => {
        if (res.data) {
          setLista(res.data);
          setLoading(false);
        }
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setLoading(true);
    api.get('/lista').then(res => {
      setLista(res.data);
      setRefreshing(false);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    getDados();
  }, [getDados]);

  useFocusEffect(
    useCallback(() => {
      getDados();
    }, [getDados]),
  );

  // const handleDelete = useCallback(
  //   (data: string) => {
  //     api
  //       .delete(`/lista/${data}`)
  //       .then(_ => getDados())
  //       .catch(err => console.log(err));
  //   },
  //   [getDados],
  // );

  // const leftSwipe = (progress: any, dragX: any, provider: ProviderItens) => {
  //   const scale = dragX.interpolate({
  //     inputRange: [0, 100],
  //     outputRange: [0, 1],
  //     extrapolate: 'clamp',
  //   });
  //   return (
  //     <TouchableOpacity
  //       onPress={() => handleDelete(provider.id)}
  //       activeOpacity={0.6}>
  //       <ButtonDelete>
  //         <Animated.Text style={{color: '#fff', transform: [{scale: scale}]}}>
  //           Deletar
  //         </Animated.Text>
  //       </ButtonDelete>
  //     </TouchableOpacity>
  //   );
  // };

  const handleSeeIten = useCallback(
    (data: ItemsReques) => {
      navigate.navigate('ItensToList', {
        id: data.id,
        title: data.name,
      });
    },
    [navigate],
  );

  function calcItensCheckt(provider: ProviderItens) {
    let itensChecked = provider.itens?.filter(
      item => item.pivot.status === true,
    );
    return itensChecked.length / provider.itens.length;
  }

  function somaValoresItens(pivot: ProviderItens) {
    return pivot.itens
      .map((item: ItemsReques) => item.pivot)
      .map((prev: any) => +prev.qty * +prev.value)
      .reduce((prev, current) => prev + current, 0)
      .toFixed(2)
      .replace('.', ',');
  }

  return (
    <View style={{flex: 1, backgroundColor: '#edededdd'}}>
      <HeaderLayout title="" />

      <Container>
        {loading ? (
          [0, 1, 2, 3].map(item => <SkeletonListagem key={item} />)
        ) : (
          <>
            <ShoppingList
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              data={lista.data}
              renderItem={({item: provider}: any) => (
                <ContainerList>
                  <ItemList onPress={() => handleSeeIten(provider)}>
                    <ContainerText>
                      <ItemListText>{provider.name}</ItemListText>
                      <IconText
                        name={
                          calcItensCheckt(provider) === 1
                            ? 'check-circle'
                            : 'clock'
                        }
                        color={
                          calcItensCheckt(provider) !== 1
                            ? '#f0ac1b'
                            : '#01ac73'
                        }
                        size={20}
                      />
                    </ContainerText>
                    <ValueText>R$ {somaValoresItens(provider)}</ValueText>
                  </ItemList>
                  <ProgressBarView>
                    <ProgressBar
                      progress={calcItensCheckt(provider)}
                      color={'#01ac73'}
                    />
                  </ProgressBarView>
                  <FooterLoop>
                    <TextRigthFooter>
                      {moment(provider.created_at).format('DD/MM')}
                    </TextRigthFooter>

                    <ShareLista key={provider.id} provider={provider} />
                  </FooterLoop>
                </ContainerList>
              )}
              keyExtractor={(provider: any) => provider.id.toString()}
            />
            <FormLista afterSave={getDados} />
          </>
        )}
      </Container>
    </View>
  );
};

export default Lista;
