import React, {useEffect, useReducer} from 'react';

import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {RefreshControl} from 'react-native';

import moment from 'moment';

import {ProgressBar} from 'react-native-paper';

import Empty from '../../Components/Empty';

import HeaderLayout from '../../Layout/Header';
import TemplateDefault from '../../Layout/Default';

import SkeletonListagem from './skeleton';
import FormLista from './Add';
import ShareLista from './AddToUser';

import {withTheme} from 'styled-components/native';
import {GlobalStyles} from '../../styles/global';

import {ItemsReques, ProviderItens} from '../../types/lista';

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
import {fetchData} from '../../store/actions/list/fetchData';
import {initalList, reducerList} from '../../store/reducers/list';

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
  const [{data, refreshing}, dispatch] = useReducer(reducerList, initalList);

  useEffect(() => {
    return fetchData(dispatch);
  }, []);

  function handleSeeIten(dado: ItemsReques) {
    navigate.navigate('ItensToList', {
      id: dado.id,
      title: dado.name,
    });
  }

  function DisplayIconsByStatus(provider: ProviderItens) {
    return (
      <IconText
        name={calcItensCheckt(provider) === 1 ? 'check-circle' : 'clock'}
        color={
          calcItensCheckt(provider) !== 1
            ? theme.colors.warning
            : theme.colors.success
        }
        size={18}
      />
    );
  }

  return (
    <GlobalStyles>
      <HeaderLayout />
      <TemplateDefault loadingComponent={<SkeletonListagem />} loading={!data}>
        <>
          <ShoppingList
            refreshControl={<RefreshControl refreshing={refreshing} />}
            data={data?.data}
            ListEmptyComponent={
              <Empty text="Você ainda não tem nenhuma lista :(" />
            }
            renderItem={({item: provider}: any) => (
              <ContainerList>
                <ItemList onPress={() => handleSeeIten(provider)}>
                  <ContainerText>
                    <ItemListText>{provider.name}</ItemListText>
                    <DisplayIconsByStatus {...provider} />
                  </ContainerText>
                  <ValueText>R$ {somaValoresItens(provider)}</ValueText>
                </ItemList>
                <ProgressBarView>
                  <ProgressBar
                    style={{height: 7, borderRadius: 5}}
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
