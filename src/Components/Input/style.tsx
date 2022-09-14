import styled, {css} from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';
import {MainTheme} from '../../styles/global';

interface PropsInput {
  isFocus: boolean;
  isErrored: boolean;
  size: number;
}

export const Container = styled.View`
  ${(props: PropsInput) =>
    props.size &&
    css`
      width: ${props.size}%;
      margin-right: 5px;
    `};

  height: 50px;
  padding: 0 10px;
  background: #fff;
  border-radius: 10px;
  margin-bottom: 15px;
  border-width: 1px;
  border-color: #fff;

  align-items: center;
  flex-direction: row;

  ${(props: PropsInput) =>
    props.isErrored &&
    css`
      border-color: ${({theme}: MainTheme) => theme.colors.danger};
    `}

  ${(props: PropsInput) =>
    props.isFocus &&
    css`
      border-color: #ff9000;
    `}
`;

export const InputText = styled.TextInput`
  flex: 1;
  color: #ff9000;
  width: 100%;
  font-size: 14px;
  font-family: 'Exo-Regular';
`;

export const IconText = styled(Icon)`
  margin-right: 8px;
`;

// INPUT NUMBER

export const TextValues = styled.TextInput`
  font-family: 'Exo-SemiBold';
  height: 35px;
  background-color: #f5f5f5;
  padding: 2px;
  margin: 5px 1px;
  border-radius: 3px;
  width: 40px;
  text-align: center;
  color: #585858;
  font-size: 13px;
`;
