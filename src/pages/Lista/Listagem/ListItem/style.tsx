import {getBottomSpace, getStatusBarHeight} from 'react-native-iphone-x-helper';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import {Form} from '@unform/mobile';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

export const Header = styled(LinearGradient)`
  flex-direction: row;
  justify-content: space-between;
  padding: ${24 + getStatusBarHeight()}px 10px 10px;
  align-items: center;
`;

export const Container = styled.View`
  padding: 20px;
  background-color: #fff;
  flex: 1;
`;

export const HeaderText = styled.Text`
  margin-right: auto;
  font-size: 22px;
  padding: 10px 10px;
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
  position: absolute;
  bottom: ${getBottomSpace() + 80}px;
  right: 20px;
  background-color: #ff9000;
  border-radius: 100px;

  width: 60px;
  height: 60px;
  align-items: center;
  align-content: center;
  justify-content: center;
  box-shadow: 0px 0px 15px #5a5959;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  margin: 10px 0 30px;
  justify-content: center;
`;
export const Title = styled.Text`
  font-size: 25px;
  color: #5a5959;
  font-family: 'Exo-SemiBold';
`;
export const DisplayItensChecked = styled.Text`
  font-size: 25px;
  color: #01ac73;
  font-family: 'Exo-Regular';
`;

export const InputCheckbox = styled(BouncyCheckbox)`
  margin-bottom: 10px;
  padding: 2px;
`;
