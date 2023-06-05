import {Animated} from 'react-native';

import styled from 'styled-components/native';

export const UpdateItemContainer = styled(Animated.View)`
  position: absolute;
  left: 1px;
  right: 1px;
  bottom: -30px;
  background-color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 10px;
  border: 1px;
  border-style: solid;
  border-width: 1px;
  border-color: #969292;
  display: flex;
`;

export const ViewContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ViewQuantidade = styled.View`
  flex-direction: row;
  /* align-items: center; */
  justify-content: space-between;
`;

export const QuantidadeSymbol = styled.Text``;

export const ViewPreco = styled.View``;

export const TextStyle = styled.Text`
  font-size: 25px;
  font-family: 'Exo-SemiBold';
  min-width: 30px;
  text-align: center;
`;

export const TextTitle = styled.Text`
  font-size: 25px;
  font-family: 'Exo-SemiBold';
  text-align: center;
  margin-bottom: 10px;
`;

export const TextValue = styled.TextInput`
  font-size: 25px;
  font-family: 'Exo-SemiBold';
  text-align: center;
  background-color: #f5f5f5;
  width: 100%;
  flex: 1;
  border-radius: 8px;
  margin-left: 8px;
`;
