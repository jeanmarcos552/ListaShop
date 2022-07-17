import React, {useCallback, useEffect, useState} from 'react';
import moment from 'moment';

import FormLista from './Add';

import {ProgressBar, withTheme} from 'react-native-paper';

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
  useNavigation,
} from '@react-navigation/native';
import {Alert, RefreshControl, View} from 'react-native';
import HeaderLayout from '../../Layout/Header';
import SkeletonListagem from './skeleton';
import ShareLista from './AddToUser';
import Empty from '../../Components/Empty';
import {fetchIndexCategory} from '../../services/category';

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
  const fetchApi = useCallback(async () => {
    const {data, status} = await fetchIndexCategory();
    if (status === 200) {
      console.log(data);
      return data;
    }
    return Alert.alert(data, '');
  }, []);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  const navigate = useNavigation<NavigationProp<ParamListBase>>();
  const [lista] = useState<any>({
    current_page: 1,
    data: [
      {
        id: 2,
        name: 'Porto Seguro',
        ativo: true,
        created_at: '2022-07-17T15:49:10.000000Z',
        updated_at: '2022-07-17T15:49:10.000000Z',
        created_by: 3,
        category_id: 1,
        user: [
          {
            id: 3,
            name: 'Simone Lopes',
            email: 'jean.silva552@outlook.com',
            email_verified_at: null,
            created_at: '2022-07-16T22:34:43.000000Z',
            updated_at: '2022-07-16T22:34:43.000000Z',
            pivot: {
              lista_id: 2,
              user_id: 3,
            },
          },
        ],
        itens: [],
        pivot: {
          user_id: 3,
          lista_id: 2,
        },
      },
    ],
  });
  const [refreshing] = useState(false);
  const [loading] = useState(false);

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
    let itensChecked = provider?.itens?.filter(
      item => item.pivot.status === true,
    );
    return itensChecked.length / provider?.itens?.length || 0;
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
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      <HeaderLayout />
      <Container>
        {loading ? (
          [0, 1, 2, 3].map(item => <SkeletonListagem key={item} />)
        ) : (
          <>
            <ShoppingList
              refreshControl={<RefreshControl refreshing={refreshing} />}
              data={lista?.data}
              ListEmptyComponent={
                <Empty text="Você ainda não tem nenhuma lista :(" />
              }
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
                          calcItensCheckt(provider) !== 1 ? '#f0f' : '#000'
                        }
                        size={20}
                      />
                    </ContainerText>
                    <ValueText>R$ {somaValoresItens(provider)}</ValueText>
                  </ItemList>
                  <ProgressBarView>
                    <ProgressBar
                      progress={calcItensCheckt(provider)}
                      color="#f0f"
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
            <FormLista afterSave={() => null} />
          </>
        )}
      </Container>
    </View>
  );
};

export default withTheme(Lista);
