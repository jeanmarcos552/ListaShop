import {Platform} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: ${Platform.OS === 'ios' ? 10 + getStatusBarHeight() : 0}px 10px 5px;
  align-items: center;
  background-color: #01ac73;
`;

export const HeaderText = styled.Text`
  margin-right: auto;
  font-size: 18px;
  padding: 5px 10px;
  font-family: 'Exo-SemiBold';
  color: #fff;
`;

export const Username = styled.Text``;
