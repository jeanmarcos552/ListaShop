import {FlatList} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import styled, {css} from 'styled-components/native';

interface Provider {
  id: number;
  title: string;
}

interface PropsInput {
  isFocus: boolean;
  isErrored: boolean;
}

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const HeaderSearch = styled.View`
  padding: ${getStatusBarHeight() + 25}px 15px 0px;
  background-color: #01ac73;
`;

interface PropTextInputSugest {
  isFocus: boolean;
}
export const TextInputSugest = styled.View<PropsInput>`
  height: 50px;
  padding: 0 16px;
  background: #fff;
  border-radius: 10px;
  margin-bottom: 15px;
  border-width: 2px;
  border-color: #01ac73;

  ${(props: PropTextInputSugest) =>
    !props.isFocus &&
    css`
      border-color: #ff9000;
    `}

  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const InputText = styled.TextInput<PropsInput>`
  padding-left: 10px;
  width: 80%;
  font-family: 'Exo-Regular';
  font-size: 15px;
  color: #01ac73;

  ${(props: PropTextInputSugest) =>
    !props.isFocus &&
    css`
      color: #ff9000;
    `}
`;

export const ListResult = styled(FlatList as new () => FlatList<Provider>)``;

export const Item = styled.TouchableOpacity`
  padding: 10px 0px;
  border-style: solid;
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-color: #e8e8e8;
  padding: 15px;

  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

export const ItemText = styled.Text`
  font-size: 18px;
  font-family: 'Exo-Regular';
`;

export const HeaderList = styled.View`
  align-content: center;
  flex-direction: row;
  justify-content: center;
  padding: 15px 0px;
`;
export const HeaderListTitle = styled.Text`
  font-size: 15px;
  color: #7a7878;
  font-family: 'Exo-Regular';
`;
export const TitleBold = styled.Text`
  font-family: 'Exo-SemiBold';
`;

export const TextButton = styled.Text`
  color: #7a7878;
  font-family: 'Exo-SemiBold';
`;
