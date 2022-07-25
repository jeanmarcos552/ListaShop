import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';
import {MD2Colors as Colors} from 'react-native-paper';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Layout = styled.View`
  padding: 0px 15px;
  flex: 1;
  background-color: #edededdd;
`;

export const HeaderText = styled.Text`
  font-size: 21px;
  padding: 25px 0px 15px;
  font-family: 'Exo-SemiBold';
`;

export const ContainerList = styled.View`
  margin-bottom: 18px;
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
`;

export const List = styled(FlatList)`
  overflow: hidden;
  height: 100px;
`;

export const ItemList = styled.View`
  justify-content: space-between;
  flex: 1;
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
  background-color: ${Colors.red500};
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

export const InfoNotification = styled.View`
  justify-content: space-between;
  flex-direction: row;
  padding-top: 10px;
  padding-bottom: 5px;
  margin-bottom: 15px;
`;
export const TextRightFooter = styled.Text`
  font-family: 'Exo-Regular';
  color: #969595dd;
`;

export const EmptyListText = styled.Text`
  font-family: 'Exo-SemiBold';
  font-size: 28px;
  color: #6d6d6ddd;
  text-align: center;
  margin-top: 20px;
`;

export const Bold = styled.Text`
  color: #01ac73;
  font-family: 'Exo-SemiBold';
`;

export const Description = styled.Text`
  color: #6d6d6ddd;
  font-family: 'Exo-Regular';
  font-size: 14px;
`;

export const ButtomAlow = styled(RectButton)`
  height: 40px;
  background-color: ${Colors.orange600};
  justify-content: center;
  border-radius: 10px;
  flex-direction: column;
  align-items: center;
`;

export const ButtomAlowText = styled.Text`
  color: #fff;
  font-family: 'Exo-SemiBold';
  font-size: 15px;
`;

export const ViewHeader = styled.View`
  padding: 10px;
`;

export const TextHeader = styled.Text`
  font-size: 30px;
  font-family: 'Exo-SemiBold';
  color: ${({theme}) => theme.colors.secondary};
`;
