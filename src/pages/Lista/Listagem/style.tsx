import {Platform, FlatList} from 'react-native';
import styled, {css} from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {Provider} from './index';
import LinearGradient from 'react-native-linear-gradient';

interface PropsProgress {
  width: number;
}

export const Container = styled.View`
  flex: 1;
  padding: ${Platform.OS === 'android' ? 150 : 40}px 10px;
`;

export const Header = styled(LinearGradient)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${24 + getStatusBarHeight()}px 10px 10px;
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
  align-items: center;
`;

export const Image = styled.Image`
  width: 50px;
  height: 60px;
  justify-content: center;
  align-items: center;
`;

export const ContainerList = styled.TouchableOpacity`
  margin-bottom: 15px;
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

export const ItemList = styled.Text`
  background-color: #fff;
  margin-bottom: 0px;
  padding: 20px 10px;
  border-radius: 18px;
  font-family: 'Exo-Regular';
  font-size: 22px;
  color: #353434;
`;
