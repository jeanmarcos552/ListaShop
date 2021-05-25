import React from 'react';
import { useAuth } from '../../hooks/auth';

import { Header, HeaderText } from './style';

interface PropsHeader {
  user: {
    name: string;
    email: string;
  };
}

const HeaderLayout: React.FC = () => {
  const { user } = useAuth() as unknown as PropsHeader;
  return (
    <Header
      colors={['#01ac73', '#02865a']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}>
      <HeaderText>
        <HeaderText>Olá, {user.name}</HeaderText>
      </HeaderText>
    </Header>
  );
};

export default HeaderLayout;
