import styled, {css} from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';

interface PropsInput {
  isFocus: boolean;
  isErrored: boolean;
  size: number;
}

export const Container = styled.View<PropsInput>`
  ${(props) =>
    props.size &&
    css`
      width: ${props.size}%;
      margin-right: 5px;
    `};

  height: 60px;
  padding: 0 16px;
  background: #fff;
  border-radius: 10px;
  margin-bottom: 15px;
  border-width: 2px;
  border-color: #fff;

  align-items: center;
  flex-direction: row;

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocus &&
    css`
      border-color: #ff9000;
    `}
`;

export const InputText = styled.TextInput`
  flex: 1;
  color: #ff9000;
  width: 100%;
  font-size: 16px;
  font-family: 'Exo-SemiBold';
`;

export const IconText = styled(Icon)`
  margin-right: 16px;
`;
