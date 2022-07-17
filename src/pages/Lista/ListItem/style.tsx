import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import {Form} from '@unform/mobile';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {FlatList} from 'react-native-gesture-handler';
import {MD2Colors as Colors} from 'react-native-paper';

export const Header = styled(LinearGradient)`
  flex-direction: row;
  justify-content: space-between;
  padding: ${10 + getStatusBarHeight()}px 10px 10px;
  align-items: center;
`;

export const Container = styled.View`
  padding: 20px;
  background-color: #fff;
  flex: 1;
`;

export const HeaderText = styled.Text`
  margin-right: auto;
  font-size: 18px;
  padding: 5px 10px;
  font-family: 'Exo-SemiBold';
  color: #fff;
`;

export const Username = styled.Text``;

export const FormContainer = styled(Form)`
  flex-direction: row;
  flex: 1;
  justify-content: center;
`;

export const FabButtom = styled.TouchableOpacity`
  background-color: #01ac73;
  border-radius: 100px;

  width: 35px;
  height: 35px;
  align-items: center;
  align-content: center;
  justify-content: center;
  box-shadow: 0px 0px 15px #5a5959;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  margin: 5px 0 15px;
  justify-content: center;
  align-content: center;
  align-items: center;
  justify-content: space-evenly;
`;
export const Title = styled.Text`
  font-size: 20px;
  color: #5a5959;
  font-family: 'Exo-SemiBold';
`;
export const DisplayItensChecked = styled.Text`
  font-size: 20px;
  color: #01ac73;
  font-family: 'Exo-Regular';
`;

export const InputCheckbox = styled(BouncyCheckbox)`
  margin-bottom: 10px;
  padding: 2px;
  align-items: flex-end;
  background-color: #fff;
  height: 45px;
  align-items: center;
`;

export const TotalFooter = styled.Text`
  font-size: 20px;
  color: #01ac73;
  font-family: 'Exo-SemiBold';
  align-items: flex-start;
`;

export const ListItens = styled(FlatList)`
  padding: 16px 0px;
`;

export const GridItens = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /* border-style: solid;
  border-bottom-width: 1px;
  border-color: #ebebeb;
  padding: 10px 0; */
`;

export const TextValues = styled.TextInput`
  font-family: 'Exo-SemiBold';
  height: 35px;
  background-color: #f5f5f5;
  padding: 5px;
  margin: 5px 0;
  border-radius: 3px;
  width: 50px;
  text-align: center;
  color: #585858;
  font-size: 15px;
  margin-right: 3px;
`;

export const ButtonDelete = styled.View`
  background-color: ${Colors.red500};
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 30px;
`;
