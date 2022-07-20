import React, {useState} from 'react';
import {useAuth} from '../../hooks/auth';
import Icon from 'react-native-vector-icons/Feather';

import {
  Header,
  HeaderText,
  Notificacao,
  NotificacaoTotal,
  ViewLeft,
} from './style';

import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';

interface PropsComponent {
  title?: string;
}

const HeaderLayout: React.FC<PropsComponent> = ({title}) => {
  const {user, signOut} = useAuth();
  const [notifications] = useState([]);
  const navigate = useNavigation<NavigationProp<ParamListBase>>();

  return (
    <Header>
      <HeaderText>
        <HeaderText>{title ? title : `Olá, ${user.name}`}</HeaderText>
      </HeaderText>
      <ViewLeft>
        <Notificacao onPress={() => navigate.navigate('Notifications')}>
          {notifications && notifications?.length > 0 && (
            <NotificacaoTotal>{3}</NotificacaoTotal>
          )}
          <Icon name="bell" size={20} color="#fff" />
        </Notificacao>
        <TouchableOpacity onPress={signOut}>
          <Icon name="log-out" size={20} color="#fff" />
        </TouchableOpacity>
      </ViewLeft>
    </Header>
  );
};

export default HeaderLayout;
