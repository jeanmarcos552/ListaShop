import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

export const Header = styled(LinearGradient)`
  flex-direction: row;
  justify-content: space-between;
  padding: ${10 + getStatusBarHeight()}px 10px 10px;
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
