import styled from 'styled-components/native';

export const Image = styled.Image`
  width: 40px;
  height: 40px;
`;

export const TabBarStyle = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 15px 20px;
  background-color: ${({theme}: any) => theme.colors.primary};
`;

export const IconsStyle = styled.Text`
  color: ${({focus, theme}) =>
    focus ? theme.colors.primary : theme.colors.background};
  ${({focus}) => (focus ? 'background-color: white;' : null)};
  border-radius: 30px;
  padding: 5px;
  overflow: hidden;
`;
