import React from 'react';
import {useAuth} from '../../hooks/auth';
import Icon from 'react-native-vector-icons/Feather';

import {Header, HeaderText, Notificacao, NotificacaoTotal} from './style';

interface PropsHeader {
  user: {
    name: string;
    email: string;
  };
}

const HeaderLayout: React.FC = () => {
  const {user} = (useAuth() as unknown) as PropsHeader;
  return (
    <Header
      colors={['#01ac73', '#02865a']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <HeaderText>
        <HeaderText>Olá, {user.name}</HeaderText>
      </HeaderText>
      <Notificacao>
        <NotificacaoTotal>12</NotificacaoTotal>
        <Icon name="bell" size={25} color="#fff" />
      </Notificacao>
    </Header>
  );
};

export default HeaderLayout;
