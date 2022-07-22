import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  padding: 10px 0px;
  border-style: solid;
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-color: #e8e8e8;
  padding: 15px;
  justify-content: space-evenly;
  flex-direction: row;
  align-items: center;
`;

export const Text = styled.Text`
  color: #013db4;
  font-family: 'Exo-Regular';
`;

export const IconPlus = styled(Icon)`
  color: #013db4;
`;

export const TextBold = styled.Text`
  color: #013db4;
  font-family: 'Exo-SemiBold';
  text-decoration: underline;
  font-size: 15px;
`;

type PropCssUnidade = {
  active: boolean;
};

export const ContainerUnidade = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 5px;
`;

export const TextUnidade = styled.Text<PropCssUnidade>`
  color: ${props => (props.active ? '#01ac73' : '#013DB4')};
`;
