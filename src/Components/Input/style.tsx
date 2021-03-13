import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: white;
  border-radius: 10px;
  margin-bottom: 15px;

  align-items: center;
  flex-direction: row;
`;

export const InputText = styled.TextInput`
  flex: 1;
  color: #1ABD33;
  width: 100%;
  font-size: 16px;
  font-family: 'Exo-SemiBold';
`;


export const IconText = styled(Icon)`
   margin-right: 16px;
`;