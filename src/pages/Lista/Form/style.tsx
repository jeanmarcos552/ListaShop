import {Platform, Pressable} from 'react-native';
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
  bottom: 40px;
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
export const Modal = styled.Modal`
  border-radius: 20px;
  padding: 35px;
  align-items: center;
`;

export const PressableButton = styled(Pressable)`
  width: 80px;
  height: 80px;
  background-color: #eee8e8;
  border-radius: 100px;

  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: ${getBottomSpace() + 40}px;
`;

export const PressableButtonText = styled(Icon)``;
