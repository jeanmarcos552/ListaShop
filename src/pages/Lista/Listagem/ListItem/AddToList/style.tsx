import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import styled, {css} from 'styled-components/native';



export const Container = styled.View`
  flex: 1;
  padding: ${getStatusBarHeight()}px 15px;
`;

export const TextInputSugest = styled.View`
  height: 60px;
  padding: 0 16px;
  background: #fff;
  border-radius: 10px;
  margin-bottom: 15px;
  border-width: 2px;
  border-color: #fff;

  align-items: center;
  flex-direction: row;
`;

export const InputText = styled.TextInput`
  padding-left: 10px;
`;
