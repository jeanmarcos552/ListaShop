import {Appearance, Platform} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import styled, {css} from 'styled-components/native';

const colorTheme = Appearance.getColorScheme();

export const Title = styled.Text`
  font-family: 'Exo-SemiBold';
  color: #fff;
  font-size: 24px;
  margin: 60px 0 20px;
  text-align: center;
`;

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}: any) => theme.colors.primary};

  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;

interface PropGrid {
  xs: string;
}
export const Grid = styled.View<PropGrid>`
  flex-direction: column;
  flex-flow: column;
  ${props =>
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
  background-color: ${({theme}: any) => theme.colors.tertiary};
  border-radius: 100px;

  width: 55px;
  height: 55px;
  align-items: center;
  align-content: center;
  justify-content: center;
  box-shadow: 0px 0px 15px #5a5959;
  z-index: 9999;
`;
export const Modal = styled.Modal`
  border-radius: 20px;
  padding: 35px;
  align-items: center;
  background-color: ${({theme}: any) => theme.colors.primary};
`;

export const ButtonCreate = styled.TouchableOpacity`
  border-width: 2px;
  border-style: solid;
  border-color: ${({theme}) => theme.colors.secondary};
  background-color: ${({theme}) => theme.colors.secondary};

  border-radius: 20px;
  flex: 1;
  height: 50px;
  align-items: center;
  justify-content: center;
  margin-left: 15px;
`;

export const ButtonCreateText = styled.Text`
  color: #fff;
  font-size: 18px;
`;

export const FooterButtons = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
`;

export const PressableButton = styled.TouchableOpacity`
  border-radius: 20px;
  border-width: 2px;
  border-style: solid;
  border-color: white;

  flex: 1;
  height: 48px;
  align-items: center;
  justify-content: center;
`;

export const PressableButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
`;

export const IconsStyle = styled.Text`
  color: ${({theme}) => (colorTheme === 'dark' ? theme.colors.text : '#fff')};
`;

export const IconCheck = styled.Text`
  color: #01ac73;
`;
