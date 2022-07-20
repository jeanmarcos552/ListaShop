import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const ViewHeader = styled.View`
  padding: 10px;
`;

export const TextHeader = styled.Text`
  font-size: 30px;
  font-family: 'Exo-SemiBold';
  color: ${({theme}) => theme.colors.secondary};
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
  margin: 5px;
  background-color: ${({theme}) => theme.colors.background};
  padding: 15px;
  border-radius: 8px;

  border-width: 1px;
  border-color: ${({theme}) => theme.colors.border};

  box-shadow: 20px 25px 25px black;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 3px;
  elevation: 2;
`;

export const ShoppingList = styled(FlatList)`
  overflow: hidden;
  height: 100px;
  position: relative;
`;

export const ItemList = styled.TouchableOpacity`
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

export const ContainerText = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ItemListText = styled.Text`
  border-radius: 16px;
  font-family: 'Exo-Regular';
  font-size: 18px;
  color: ${({theme}) => theme.colors.text};
  align-items: center;
  align-content: center;
`;

export const ValueText = styled.Text`
  font-family: 'Exo-SemiBold';
  justify-content: center;
  font-size: 15px;
  color: ${({theme}) => theme.colors.text};
`;

export const IconText = styled(Icon)`
  border-radius: 100px;
  padding: 0px 10px;
  align-items: center;
  justify-content: center;
`;

export const ProgressBarView = styled.View`
  padding-bottom: 10px;
  margin-top: 10px;
`;

export const FooterLoop = styled.View`
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
`;
export const TextRigthFooter = styled.Text`
  font-family: 'Exo-Regular';
  color: #969595dd;
`;

export const ViewDeleteItem = styled.TouchableOpacity`
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  height: 20px;
`;

export const TextDeleteItem = styled(Icon)`
  color: ${({theme}) => theme.colors.danger};
  padding: 0px 10px;
`;

export const ViewAction = styled.View`
  align-items: center;
  flex-direction: row;
`;

export const ContainerDialogo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px 30px;
`;
