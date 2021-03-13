import styled from 'styled-components/native';

import {RectButton} from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  height: 60px;
  background-color: #ee7614;

  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

export const ButtonText = styled.Text`
  color: white;
  font-size: 20px;
  font-family: 'Exo-SemiBold';
`;
