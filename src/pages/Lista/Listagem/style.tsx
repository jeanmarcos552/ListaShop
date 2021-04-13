import {Platform, FlatList} from 'react-native';
import styled from 'styled-components/native';
import {getStatusBarHeight, getBottomSpace} from 'react-native-iphone-x-helper';
import {Provider} from './index';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  flex: 1;
  padding: ${Platform.OS === 'android' ? 150 : 40}px 10px;
`;

export const Header = styled(LinearGradient)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${20 + getStatusBarHeight()}px 10px 10px;
`;
export const HeaderText = styled.Text`
  font-size: 21px;
  font-family: 'Exo-SemiBold';
  color: #fff;
`;

export const ContainerList = styled.TouchableOpacity`
  margin: 10px 5px 10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 2px 10px #e4e4e4;
`;

export const ShoppingList = styled(FlatList as new () => FlatList<Provider>)`
  padding-bottom: 16px;
`;

export const ItemList = styled.View`
  justify-content: space-between;
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding-right: 10px;
`;

export const ContainerText = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ItemListText = styled.Text`
  margin-bottom: 0px;
  padding: 20px 10px;
  border-radius: 16px;
  font-family: 'Exo-Regular';
  font-size: 18px;
  color: #353434;
`;

export const ValueText = styled.Text`
  font-family: 'Exo-SemiBold';
  justify-content: center;
  font-size: 15px;
  color: #5a5858;
`;

export const IconText = styled(Icon)`
  border-radius: 100px;
  padding: 3px;
`;
