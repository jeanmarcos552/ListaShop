import React, {RefObject, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {FabButtom, TitleContainer, TotalFooter} from './style';

import {FiltroItensList} from '../../../types/list';
import {FormHandles} from '@unform/core';
import {Money} from '../../../../Utils/Mask';
import {Text} from 'react-native';

export interface PropsRenderFooter {
  total: number;
  action: Function;
  form?: RefObject<FormHandles>;
}

export function RenderFooter({total, action}: PropsRenderFooter) {
  const [filter, setFilter] = useState<FiltroItensList>();

  return (
    <TitleContainer>
      <TouchableOpacity
        onPress={() => setFilter({...filter, itens: true})}
        style={{backgroundColor: '#e7e4e4', borderRadius: 50, padding: 5}}>
        {/* <Icon
          name={filter?.itens ? 'check' : 'circle'}
          size={20}
          color="#01ac73"
        /> */}
        <Text>icon</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setFilter({...filter, itens: false})}
        style={{backgroundColor: '#e7e4e4', borderRadius: 50, padding: 5}}>
        {/* <Icon name="rotate-ccw" size={20} color="#01ac73" /> */}
      </TouchableOpacity>
      <TotalFooter>
        R$
        {Money(total.toString())}
      </TotalFooter>
      <FabButtom onPress={() => action()}>
        {/* <Icon name="plus" size={30} color="#fff" /> */}
        <Text>icon</Text>
      </FabButtom>
    </TitleContainer>
  );
}
