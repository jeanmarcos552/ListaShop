import styled from 'styled-components/native';

import {RectButton} from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  height: 60px;
  background-color: #ff9000;
  justify-content: center;
  border-radius: 10px;
  flex-direction: column;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: white;
  font-size: 20px;
  font-family: 'Exo-SemiBold';
`;
