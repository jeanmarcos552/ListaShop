import {Platform, Pressable, Text} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import Icon from 'react-native-vector-icons/Ionicons';
import styled, {css} from 'styled-components/native';

interface PropsGrid {
  xs: number;
}

export const Title = styled.Text`
  font-family: 'Exo-SemiBold';
  color: #fff;
  font-size: 24px;
  margin: 60px 0 20px;
  text-align: center;
`;

export const Container = styled.View`
  flex: 1;
  margin-top: 50px;
  justify-content: center;
  align-items: center;
  background-color: #01ac73;

  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const Grid = styled.View<PropsGrid>`
  flex-direction: column;
  flex-flow: column;
  ${(props) =>
    props.xs &&
    css`
      width: ${props.xs}%;
    `}
`;

export const Row = styled.View`
  flex-direction: column;
`;

export const FabButtom = styled.TouchableOpacity`
  position: absolute;
  bottom: ${getBottomSpace() + 22}px;
  right: 20px;
  background-color: #ff9000;
  border-radius: 100px;

  width: 55px;
  height: 55px;
  align-items: center;
  align-content: center;
  justify-content: center;
  box-shadow: 0px 0px 15px #5a5959;
`;
export const Modal = styled.Modal`
  border-radius: 20px;
  padding: 35px;
  align-items: center;
`;

export const ButtonCreate = styled(RectButton)`
  border-width: 2px;
  border-style: solid;
  border-color: #ff9000;
  background-color: #ff9000;

  border-radius: 20px;
  flex: 1;
  height: 50px;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
`;

export const ButtonCreateText = styled.Text`
  color: #fff;
  font-size: 18px;
`;

export const FooterButtons = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
`;

export const PressableButton = styled(Pressable)`
  border-radius: 20px;
  border-width: 2px;
  border-style: solid;
  border-color: #fff;

  flex: 1;
  height: 48px;
  align-items: center;
  justify-content: center;
`;

export const PressableButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
`;
