import {Platform} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const Title = styled.Text`
  font-family: 'Exo-Regular';
  color: #fff;
  font-size: 24px;
  margin: 60px 0 20px;
`;

export const BackToLogin = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px 0 ${16 + getBottomSpace()}px;

  border-top-width: 1px;
  border-color: #029e6a;
  background: #029e6a;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

export const BackToLoginText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-family: 'Exo-SemiBold';
`;

export const Image = styled.BackgroundImage`
  width: 60%;
  height: 45px;
`;
