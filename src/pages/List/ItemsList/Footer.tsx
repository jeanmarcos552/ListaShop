import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {FabButtom, TitleContainer, TotalFooter} from './style';
import Icon from 'react-native-vector-icons/Feather';
import {FiltroItensList} from '../../../types/list';

export interface PropsRenderFooter {
  sumItems: string;
  action: Function;
}
export function RenderFooter({sumItems, action}: PropsRenderFooter) {
  const [filter, setFilter] = useState<FiltroItensList>();

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
        {sumItems}
      </TotalFooter>
      <FabButtom onPress={() => action()}>
        <Icon name="plus" size={30} color="#fff" />
      </FabButtom>
    </TitleContainer>
  );
}
