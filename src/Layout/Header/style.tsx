import styled from 'styled-components/native';

import LinearGradient from 'react-native-linear-gradient';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';

export const Header = styled(LinearGradient)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${20 + getStatusBarHeight()}px 10px 15px;
`;
export const HeaderText = styled.Text`
  font-size: 23px;
  font-family: 'Exo-SemiBold';
  color: #fff;
`;
