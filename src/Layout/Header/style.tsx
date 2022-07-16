import styled from 'styled-components/native';

import LinearGradient from 'react-native-linear-gradient';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {Badge} from 'react-native-paper';
import {Platform} from 'react-native';

export const Header = styled(LinearGradient)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${Platform.OS === 'ios' ? 10 + getStatusBarHeight() : 0}px 10px 10px;
`;
export const HeaderText = styled.Text`
  font-size: 23px;
  font-family: 'Exo-SemiBold';
  color: #fff;
`;

export const Notificacao = styled.TouchableOpacity`
  position: relative;
`;

export const NotificacaoTotal = styled(Badge)`
  position: absolute;
  z-index: 99;
  top: -8px;
  right: -5px;
`;
