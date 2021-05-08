import React from 'react';

import {Header, HeaderText} from './style';

interface PropsHeader {
  user?: {name: string};
}

const HeaderLayout: React.FC<PropsHeader> = ({user}) => {
  return (
    <Header
      colors={['#01ac73', '#02865a']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <HeaderText>
        <HeaderText>Olá, {user?.name}</HeaderText>
      </HeaderText>
    </Header>
  );
};

export default HeaderLayout;
