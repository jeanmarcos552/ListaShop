import React, {useCallback, useEffect, useState} from 'react';
import moment from 'moment';

import {withTheme} from 'styled-components/native';

import FormLista from './Add';

import {ProgressBar} from 'react-native-paper';

import {
  ContainerList,
  ItemList,
  ShoppingList,
  ValueText,
  ItemListText,
  ContainerText,
  IconText,
  ProgressBarView,
  FooterLoop,
  TextRigthFooter,
  ViewDeleteItem,
  TextDeleteItem,
} from './style';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {Alert, RefreshControl} from 'react-native';
import HeaderLayout from '../../Layout/Header';
import SkeletonListagem from './skeleton';
import ShareLista from './AddToUser';
import Empty from '../../Components/Empty';
import {GlobalStyles} from '../../styles/global';
import {indexList} from '../../services/lista';
import {ItemsReques, PayloadList, ProviderItens} from '../../types/lista';
import TemplateDefault from '../../Layout/Default';

function somaValoresItens(pivot: ProviderItens) {
  return pivot.itens
    .map((item: ItemsReques) => item.pivot)
    .map((prev: any) => +prev.qty * +prev.value)
    .reduce((prev, current) => prev + current, 0)
    .toFixed(2)
    .replace('.', ',');
}

function calcItensCheckt(provider: ProviderItens) {
  let itensChecked = provider?.itens?.filter(
    item => item.pivot.status === true,
  );
  return itensChecked.length / provider?.itens?.length || 0;
}

function Lista({theme}) {
  const navigate = useNavigation<NavigationProp<ParamListBase>>();
  const [list, setList] = useState<PayloadList>();
  const [refreshing] = useState(false);

  const fetchApi = useCallback(async () => {
    const {data, status} = await indexList();
    if (status === 200) {
      setList(data);
      return data;
    }
    return Alert.alert(String(data), '');
  }, []);

  function handleSeeIten(data: ItemsReques) {
    navigate.navigate('ItensToList', {
      id: data.id,
      title: data.name,
    });
  }

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  return (
    <GlobalStyles>
      <HeaderLayout />
      <TemplateDefault
        loadingComponent={<SkeletonListagem />}
        loading={!list?.data}>
        <>
          <ShoppingList
            refreshControl={<RefreshControl refreshing={refreshing} />}
            data={list?.data}
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
                        calcItensCheckt(provider) !== 1
                          ? theme.colors.warning
                          : theme.colors.success
                      }
                      size={18}
                    />
                  </ContainerText>
                  <ValueText>R$ {somaValoresItens(provider)}</ValueText>
                </ItemList>
                <ProgressBarView>
                  <ProgressBar
                    progress={calcItensCheckt(provider)}
                    color={theme.colors.primary}
                  />
                </ProgressBarView>
                <FooterLoop>
                  <TextRigthFooter>
                    {moment(provider.created_at).format('DD/MM')}
                  </TextRigthFooter>
                  <ViewDeleteItem>
                    <TextDeleteItem>Deletar</TextDeleteItem>
                  </ViewDeleteItem>

                  <ShareLista key={provider.id} provider={provider} />
                </FooterLoop>
              </ContainerList>
            )}
            keyExtractor={(provider: any) => provider.id.toString()}
          />
          <FormLista afterSave={() => null} />
        </>
      </TemplateDefault>
    </GlobalStyles>
  );
}

export default withTheme(Lista);
