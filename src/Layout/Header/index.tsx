import React, {useCallback, useEffect, useState} from 'react';
import {useAuth} from '../../hooks/auth';
import Icon from 'react-native-vector-icons/Feather';

import {Header, HeaderText, Notificacao, NotificacaoTotal} from './style';
import api from '../../services/api';
import {Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

interface PropsHeader {
  user: {
    name: string;
    email: string;
  };
}

interface ProviderNotification {
  id: string;
  description: string;
  user_send: object;
  user_receiver: object;
  lista: object;
}

const HeaderLayout: React.FC = ({title}) => {
  const {user} = (useAuth() as unknown) as PropsHeader;
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigation();

  const getNotifications = useCallback(() => {
    api.get('/notifications').then((res) => {
      if (res.data) {
        setNotifications(res.data.data);
      }
    });
  }, []);

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  return (
    <Header
      colors={['#01ac73', '#02865a']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <HeaderText>
        <HeaderText>{!title ? `Olá, ${user.name}` : title}</HeaderText>
      </HeaderText>
      <Notificacao onPress={() => navigate.navigate('Notifications')}>
        {notifications && notifications.length > 0 ? (
          <NotificacaoTotal>{notifications.length}</NotificacaoTotal>
        ) : (
          <Text />
        )}
        <Icon name="bell" size={25} color="#fff" />
      </Notificacao>
    </Header>
  );
};

export default HeaderLayout;
