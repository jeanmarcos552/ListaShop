/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import moment from 'moment';

import {
  ContainerList,
  ItemList,
  List,
  ItemListText,
  ContainerText,
  Container,
  InfoNotification,
  TextRigthFooter,
  EmptyListText,
  HeaderText,
  Layout,
  Bold,
  Description,
  ButtomAlow,
  ButtomAlowText,
} from './style';
import {
  NavigationProp,
  ParamListBase,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {RefreshControl, View} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import api from '../../services/api';
import SkeletonListagem from './skeleton';

import Icons from 'react-native-vector-icons/Ionicons';
import HeaderSingle from '../../Layout/HeaderSingle';

export interface ProviderRequest {
  current_page: number;
  data: Array<ProviderItens>[];
}

export interface ProviderItens {
  id: number;
  description: string;
  user_send: {
    id: number;
    name: string;
    email: string;
  };
  user_receiver: {
    id: number;
    name: string;
    email: string;
  };
  created_at: string;
  lista: {
    id: number;
    name: string;
  };
}

export interface User {
  id: number;
  name: string;
  email: string;
}

const Notifications = () => {
  const navigate = useNavigation<NavigationProp<ParamListBase>>();
  const [notifications, setNotifications] = useState<ProviderRequest>(
    {} as ProviderRequest,
  );
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const getDados = useCallback(() => {
    api.get<ProviderRequest>('/notifications').then(res => {
      if (res.data) {
        setNotifications(res.data);
        setLoading(false);
      }
    });
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setLoading(true);
    api.get('/notifications').then(res => {
      setNotifications(res.data);
      setRefreshing(false);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    getDados();
  }, [getDados]);

  useFocusEffect(
    useCallback(() => {
      getDados();
    }, [getDados]),
  );

  const handleRefuse = useCallback((data: any) => {
    console.log(data);
  }, []);

  return (
    <>
      <HeaderSingle title="Listas" navigation={navigate} />

      <Layout>
        {loading ? (
          [0, 1, 2, 3].map(item => <SkeletonListagem key={item} />)
        ) : notifications.data && notifications.data.length > 0 ? (
          <Container>
            <List
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              data={notifications.data}
              renderItem={({item: provider}: any) => (
                <Swipeable>
                  <ContainerList>
                    <ItemList>
                      <ContainerText>
                        <ItemListText>{provider.lista.name}</ItemListText>
                      </ContainerText>
                    </ItemList>
                    <Description>{provider.description}</Description>
                    <InfoNotification>
                      <TextRigthFooter>
                        Enviado por: <Bold>{provider.user_send.name}</Bold>
                      </TextRigthFooter>
                      <TextRigthFooter>
                        {`${moment(provider.created_at).format(
                          'DD/MM',
                        )} às ${moment(provider.created_at).format('H:s')}`}
                      </TextRigthFooter>
                    </InfoNotification>
                    <ButtomAlow onPress={() => handleRefuse(provider)}>
                      <ButtomAlowText>Aceitar</ButtomAlowText>
                    </ButtomAlow>
                  </ContainerList>
                </Swipeable>
              )}
              ListHeaderComponent={() => (
                <HeaderText>Notificações Recebidas</HeaderText>
              )}
              keyExtractor={(provider: any) => provider.id.toString()}
            />
          </Container>
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icons name="notifications-off-sharp" size={80} color="#6d6d6ddd" />
            <EmptyListText>Ainda não existe nenhuma notificação</EmptyListText>
          </View>
        )}
      </Layout>
    </>
  );
};

export default Notifications;
