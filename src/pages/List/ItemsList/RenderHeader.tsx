import React from 'react';
import {ViewJ} from '../../../styles/global';
import {DisplayItensChecked, Title} from './style';

export function RenderHeader({totalSelected}) {
  return (
    <ViewJ direction="row" mb={5}>
      <Title>Itens concluídos: </Title>
      <DisplayItensChecked>{totalSelected}</DisplayItensChecked>
    </ViewJ>
  );
}
