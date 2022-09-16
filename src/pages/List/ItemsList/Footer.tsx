import React, {RefObject, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {FabButtom, TitleContainer, TotalFooter} from './style';
import Icon from 'react-native-vector-icons/Feather';
import {
  FiltroItensList,
  ItemsRequest,
  ProviderItemsList,
} from '../../../types/list';
import {Text} from 'react-native';
import {FormHandles} from '@unform/core';

export interface PropsRenderFooter {
  items: ItemsRequest[];
  action: Function;
  form?: RefObject<FormHandles>;
}

function somaValoresItens(items: ProviderItemsList[]) {
  if (!items) {
    return 0;
  }

  return parseFloat(
    items
      .map(item => item.pivot)
      .map((prev: any) => +prev.qty * +prev.value)
      .reduce((prev, current) => prev + current, 0)
      .toFixed(2)
      .replace('.', ','),
  );
}

export function RenderFooter({items, action, form}: PropsRenderFooter) {
  const [filter, setFilter] = useState<FiltroItensList>();

  return (
    <TitleContainer>
      <TouchableOpacity
        onPress={() => form?.current?.submitForm()}
        style={{backgroundColor: '#e7e4e4', borderRadius: 50, padding: 5}}>
        {/* <Icon
          name={filter?.itens ? 'check' : 'circle'}
          size={20}
          color="#01ac73"
        /> */}
        <Text>Salvar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setFilter({...filter, itens: false})}
        style={{backgroundColor: '#e7e4e4', borderRadius: 50, padding: 5}}>
        <Icon name="rotate-ccw" size={20} color="#01ac73" />
      </TouchableOpacity>
      <TotalFooter>
        R$
        {somaValoresItens(items)}
      </TotalFooter>
      <FabButtom onPress={() => action()}>
        <Icon name="plus" size={30} color="#fff" />
      </FabButtom>
    </TitleContainer>
  );
}
