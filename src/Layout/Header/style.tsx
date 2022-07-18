import styled from 'styled-components/native';

import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {Badge} from 'react-native-paper';
import {Platform} from 'react-native';

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${Platform.OS === 'ios' ? 5 + getStatusBarHeight() : 5}px 10px 5px;
  background-color: #01ac73;
`;
export const HeaderText = styled.Text`
  font-size: 18px;
  font-family: 'Exo-SemiBold';
  color: #fff;
`;

export const Notificacao = styled.TouchableOpacity`
  position: relative;
  margin-right: 10px;
`;

export const NotificacaoTotal = styled(Badge)`
  position: absolute;
  z-index: 99;
  top: -8px;
  right: -5px;
  background-color: red;
  color: white;
`;

export const ViewLeft = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;
