import React, {useCallback, useEffect, useReducer, useState} from 'react';

import {
  NavigationProp,
  ParamListBase,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {Alert, RefreshControl, View} from 'react-native';

import moment from 'moment';

import {Button, ProgressBar} from 'react-native-paper';

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
  ViewAction,
  ViewHeader,
  TextHeader,
  ContainerDialogo,
} from './style';

import {fetchData} from '../../store/actions/list/fetchData';
import {initalList, reducerList} from '../../store/reducers/list';
import DialogComponent from '../../Components/Dialog';
import {removeList} from '../../store/actions/list/removeList';

function somaValoresItens(pivot: ProviderItens) {
  if (!pivot) {
    return 0;
  }
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

const Lista = ({theme}) => {
  const navigate = useNavigation<NavigationProp<ParamListBase>>();
  const [{data, refreshing, itemToDelete}, dispatch] = useReducer(
    reducerList,
    initalList,
  );
  const [dialogo, setDialogo] = useState(false);

  useEffect(() => {
    fetchData(dispatch);
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

  const handleDelete = useCallback(async () => {
    const resp = await removeList(dispatch, itemToDelete);
    Alert.alert('Atenção', String(resp));
  }, [itemToDelete]);

  useEffect(() => {
    setDialogo(!!itemToDelete);
  }, [itemToDelete]);

  useFocusEffect(
    useCallback(() => {
      fetchData(dispatch);
    }, []),
  );

  return (
    <GlobalStyles>
      <HeaderLayout />
      <TemplateDefault
        loadingComponent={<SkeletonListagem />}
        loading={!data.data}>
        <>
          <DialogComponent
            setVisible={setDialogo}
            visible={dialogo}
            title="Deletar essa lista?">
            <ContainerDialogo>
              <Button
                mode="outlined"
                onPress={() => dispatch({type: 'DELETE_LIST', payload: null})}>
                Não
              </Button>
              <Button
                mode="contained"
                buttonColor={theme.colors.danger}
                onPress={handleDelete}>
                Sim
              </Button>
            </ContainerDialogo>
          </DialogComponent>

          <ShoppingList
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} />}
            data={data?.data}
            ListEmptyComponent={
              <Empty text="Você ainda não tem nenhuma lista :(" />
            }
            ListFooterComponent={<View style={{marginBottom: 80}} />}
            ListHeaderComponent={
              <ViewHeader>
                <TextHeader>Listas</TextHeader>
              </ViewHeader>
            }
            renderItem={({item: provider}: any) => (
              <ContainerList>
                <ItemList onPress={() => handleSeeIten(provider)}>
                  <ContainerText>
                    <ItemListText>
                      {provider.name} - {provider.id}{' '}
                    </ItemListText>
                    <DisplayIconsByStatus {...provider} theme={theme} />
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
                  <ViewAction>
                    <ViewDeleteItem
                      onPress={() =>
                        dispatch({type: 'DELETE_LIST', payload: provider.id})
                      }>
                      <TextDeleteItem name="trash" size={18} />
                    </ViewDeleteItem>

                    <ShareLista key={provider.id} provider={provider} />
                  </ViewAction>
                </FooterLoop>
              </ContainerList>
            )}
            keyExtractor={(provider: any) => provider.id.toString()}
          />
          <FormLista dispatch={dispatch} />
        </>
      </TemplateDefault>
    </GlobalStyles>
  );
};

export default withTheme(Lista);
