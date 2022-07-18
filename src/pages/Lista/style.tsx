import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';

export const Container = styled.SafeAreaView`
  flex: 1;
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

export const ContainerList = styled.View`
  margin: 10px 10px;
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  border: 1px;
  border-color: #e6e4e4;
`;

export const ShoppingList = styled(FlatList)`
  overflow: hidden;
  height: 100px;
`;

export const ItemList = styled.TouchableOpacity`
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

export const ContainerText = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ItemListText = styled.Text`
  margin-bottom: 10px;
  border-radius: 16px;
  font-family: 'Exo-Regular';
  font-size: 18px;
  color: #353434;
  align-items: center;
  align-content: center;
`;

export const ValueText = styled.Text`
  font-family: 'Exo-SemiBold';
  justify-content: center;
  font-size: 15px;
  color: #5a5858;
  margin-bottom: 10px;
`;

export const IconText = styled(Icon)`
  border-radius: 100px;
  padding: 3px;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

export const ButtonDelete = styled.View`
  background-color: red;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 80px;
  overflow: hidden;
  flex-direction: row;
`;

export const ProgressBarView = styled.View`
  padding-bottom: 10px;
`;

export const FooterLoop = styled.View`
  justify-content: space-between;
  flex-direction: row;
  padding: 10px;
`;
export const TextRigthFooter = styled.Text`
  font-family: 'Exo-Regular';
  color: #969595dd;
`;
