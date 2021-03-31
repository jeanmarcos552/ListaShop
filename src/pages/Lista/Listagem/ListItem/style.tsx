import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import {Form} from '@unform/mobile';

export const Header = styled(LinearGradient)`
  flex-direction: row;
  justify-content: space-between;
  padding: ${24 + getStatusBarHeight()}px 10px 10px;
  align-items: center;
`;

export const Container = styled.View`
  padding: 5px;
`;

export const HeaderText = styled.Text`
  margin-right: auto;
  font-size: 22px;
  padding: 10px 10px;
  font-family: 'Exo-SemiBold';
  color: #fff;
`;

export const Username = styled.Text``;

export const FormContainer = styled(Form)``;
