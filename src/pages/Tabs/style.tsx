import styled from 'styled-components/native';
import Icons from 'react-native-vector-icons/AntDesign';

export const Image = styled.Image`
  width: 40px;
  height: 40px;
`;

export const TabBarStyle = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 15px 20px;
  background-color: ${({theme}: any) => theme.colors.background};
`;

export const IconsStyle = styled<any>(Icons)`
  color: ${({focus, theme}) =>
    focus ? theme.colors.primary : theme.colors.textSecondary};
`;
