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
  TextRightFooter,
  Bold,
  Description,
  ViewHeader,
  TextHeader,
} from './style';
import {
  NavigationProp,
  ParamListBase,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {Swipeable} from 'react-native-gesture-handler';
import SkeletonListagem from './skeleton';

import HeaderSingle from '../../Layout/HeaderSingle';
import {indexNotification} from '../../services/notification';
import {INotification} from '../../types/notifications';
import {storeUserList} from '../../services/list/list-user';
import TemplateDefault from '../../Layout/Default';
import Empty from '../../Components/Empty';
import {Alert, RefreshControl} from 'react-native';
import {Button} from 'react-native-paper';
import {useTheme} from 'styled-components';

export interface ProviderRequest {
  current_page: number;
  data: Array<ProviderItems>[];
}

export interface ProviderItems {
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
  const [notifications, setNotifications] = useState<INotification[]>();
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const getDados = useCallback(async () => {
    try {
      const {status, data} = await indexNotification();

      if (status !== 200) {
        throw new Error(String(data));
      }
      setNotifications(data.data);
    } catch (erro: any) {
      console.log(erro.message);
    }
  }, []);

  useEffect(() => {
    getDados();
  }, [getDados]);

  useFocusEffect(
    useCallback(() => {
      getDados();
    }, [getDados]),
  );

  // const handleRefuse = useCallback((data: any) => {
  //   console.log(data);
  // }, []);

  const handleAccept = useCallback(
    async (data: ProviderItems) => {
      try {
        setLoading(true);

        const {data: res, status} = await storeUserList({
          body: {
            lista: data.lista.id,
            user: data.user_receiver.email,
            notification_id: data.id,
          },
        }).finally(() => setLoading(false));

        if (status !== 200) {
          throw Error(`${res} (${status})`);
        }

        getDados();
        Alert.alert('Atenção', String(res));
      } catch (error: any) {
        Alert.alert('Atenção', error.message);
      }
    },
    [getDados],
  );

  return (
    <TemplateDefault
      header={<HeaderSingle title="Listas" navigation={navigate} />}
      loading={!notifications}
      loadingComponent={<SkeletonListagem />}>
      <Container>
        <List
          refreshControl={
            <RefreshControl refreshing={!notifications} onRefresh={getDados} />
          }
          ListEmptyComponent={
            <Empty text="Você ainda não tem nenhuma lista :(" />
          }
          data={notifications}
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
                  <TextRightFooter>
                    Enviado por: <Bold>{provider.user_send.name}</Bold>
                  </TextRightFooter>
                  <TextRightFooter>
                    {`${moment(provider.created_at).format(
                      'DD/MM',
                    )} às ${moment(provider.created_at).format('H:s')}`}
                  </TextRightFooter>
                </InfoNotification>
                <Button
                  mode="contained"
                  loading={loading}
                  buttonColor={theme.colors.secondary}
                  onPress={() => handleAccept(provider)}>
                  Aceitar
                </Button>
              </ContainerList>
            </Swipeable>
          )}
          ListHeaderComponent={
            <ViewHeader>
              <TextHeader>Notificações</TextHeader>
            </ViewHeader>
          }
          keyExtractor={(provider: any) => provider.id.toString()}
        />
      </Container>
    </TemplateDefault>
  );
};

export default Notifications;
