import {Platform} from 'react-native';
import {baseProps} from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';
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
  background-color: #1abd33;

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
  bottom: 50px;
  right: 40px;
  background-color: #ff9000;
  border-radius: 100px;

  width: 80px;
  height: 80px;
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
