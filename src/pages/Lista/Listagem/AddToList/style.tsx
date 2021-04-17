import {FlatList} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

interface Provider {
  id: number;
  title: string;
}

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const HeaderSearch = styled.View`
  padding: ${getStatusBarHeight() + 25}px 15px 0px;
`;

export const TextInputSugest = styled.View`
  height: 48px;
  padding: 0 16px;
  background: #fff;
  border-radius: 10px;
  margin-bottom: 15px;
  border-width: 2px;
  border-color: #f3f2f2;

  align-items: center;
  flex-direction: row;
`;

export const InputText = styled.TextInput`
  padding-left: 10px;
`;

export const ListResult = styled(FlatList as new () => FlatList<Provider>)``;

export const Item = styled.TouchableOpacity`
  padding: 10px 0px;
  border-style: solid;
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
