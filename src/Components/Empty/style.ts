import styled from 'styled-components/native';
import Icons from 'react-native-vector-icons/AntDesign';

export const Container = styled.View`
  justify-items: center;
  justify-content: center;
  height: 100%;
  padding: 15px;
`;

export const CenterView = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 150px;
`;
export const Icon = styled(Icons)``;

export const Text = styled.Text`
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 18px;
  color: ${({theme}) => theme.colors.textSecondary};
  font-family: 'Exo-SemiBold';
`;
