import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import {Form} from '@unform/mobile';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {FlatList} from 'react-native-gesture-handler';
import {MD2Colors as Colors} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';

export const Header = styled(LinearGradient)`
  flex-direction: row;
  justify-content: space-between;
  padding: ${10 + getStatusBarHeight()}px 10px 10px;
  align-items: center;
`;

export const Container = styled.View`
  padding: 0 10px;
  background-color: #fff;
  flex: 1;
  height: 100%;
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
  margin: 0 0 15px;
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
  font-family: 'Exo-SemiBold';
`;

export const InputCheckbox = styled(BouncyCheckbox)`
  margin-bottom: 10px;
  padding: 2px;
  align-items: flex-end;
  height: 45px;
  align-items: center;
`;

export const TotalFooter = styled.Text`
  font-size: 20px;
  color: #01ac73;
  font-family: 'Exo-SemiBold';
  align-items: flex-start;
`;

export const ListItens = styled.FlatList`
  padding: 16px 0px;
` as unknown as FlatList;

export const GridItens = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

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

export const ButtonDelete = styled.View`
  background-color: ${Colors.red500};
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 30px;
`;

export const IconTrash = styled(Icon)`
  color: ${({theme}) => theme.colors.danger};
`;

export const ButtonSalvarLista = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  background: #01ac73;
  border-radius: 50px;
  padding: 2px 20px;
`;
