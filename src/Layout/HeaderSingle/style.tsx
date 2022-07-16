import {Platform} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

export const Header = styled(LinearGradient)`
  flex-direction: row;
  justify-content: space-between;
  padding: ${Platform.OS === 'ios' ? 10 + getStatusBarHeight() : 10}px 10px 10px;
  align-items: center;
`;

export const HeaderText = styled.Text`
  margin-right: auto;
  font-size: 18px;
  padding: 5px 10px;
  font-family: 'Exo-SemiBold';
  color: #fff;
`;

export const Username = styled.Text``;
