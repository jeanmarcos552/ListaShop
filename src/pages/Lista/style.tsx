import {Platform, FlatList} from 'react-native';
import styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {Provider} from './index';

export const Container = styled.View`
  flex: 1;
  padding: ${Platform.OS === 'android' ? 150 : 40}px 10px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #1abd33;
  padding: ${24 + getStatusBarHeight()}px 10px 0px;
`;
export const HeaderText = styled.Text`
  font-size: 22px;
  padding: 10px 0;
  font-family: 'Exo-Regular';
  color: #fff;
`;
export const Username = styled.Text`
  color: #fff;
  font-family: 'Exo-SemiBold';
  font-size: 22px;
`;

export const Image = styled.Image`
  width: 50px;
  height: 60px;
  justify-content: center;
  align-items: center;
`;

export const Avatar = styled.Image`
  border-radius: 100px;
  width: 80px;
  height: 80px;
`;

export const ShoppingList = styled(
  FlatList as new () => FlatList<Provider>,
).attrs({
  contentContainerStyle: {
    paddingTop: 32,
    paddingBottom: 16,
    paddingHorizontal: 11,
  },
})``;
