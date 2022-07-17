import React, {useCallback, useEffect, useState} from 'react';
import {useAuth} from '../../hooks/auth';
import Icon from 'react-native-vector-icons/Feather';

import {
  Header,
  HeaderText,
  Notificacao,
  NotificacaoTotal,
  ViewLeft,
} from './style';
import api from '../../services/api';

import Echo from 'laravel-echo/dist/echo';
import Socketio from 'socket.io-client';

import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

interface PropsHeader {
  token: string;
  user: {
    name: string;
    email: string;
  };
}
interface PropsComponent {
  title?: string;
}

const HeaderLayout: React.FC<PropsComponent> = ({title}) => {
  const {user, token} = useAuth() as unknown as PropsHeader;
  const [notifications, setNotifications] = useState([1]);
  const navigate = useNavigation<NavigationProp<ParamListBase>>();

  const getNotifications = useCallback(() => {
    api.get('/notifications').then(res => {
      if (res.data) {
        setNotifications(res.data.data);
      }
    });
  }, []);

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  useEffect(() => {
    let echo = new Echo({
      broadcaster: 'socket.io',
      key: 'ABCDEFG',
      cluster: 'mt1',
      forceTLS: false,
      wsHost: '192.168.100.23',
      wsPort: 6001,
      client: Socketio,
    });

    echo.private('user.3').listen('SendNotification', (event: any) => {
      console.log(event);
    });
  }, [token]);

  return (
    <Header>
      <HeaderText>
        <HeaderText>{title ? title : `Olá, ${user.name}`}</HeaderText>
      </HeaderText>
      <ViewLeft>
        <Notificacao onPress={() => navigate.navigate('Notifications')}>
          {notifications && notifications.length > 0 && (
            <NotificacaoTotal>{3}</NotificacaoTotal>
          )}
          <Icon name="bell" size={20} color="#fff" />
        </Notificacao>
        <Icon name="log-out" size={20} color="#fff" />
      </ViewLeft>
    </Header>
  );
};

export default HeaderLayout;
