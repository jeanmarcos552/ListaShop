import styled from 'styled-components/native';

export const Container = styled.View`
  justify-items: center;
  justify-content: center;
  height: 75%;
  padding: 15px;
`;

export const CenterView = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 250px;
`;
export const Icon = styled.Text``;

export const Text = styled.Text`
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 18px;
  color: ${({theme}) => theme.colors.textSecondary};
  font-family: 'Exo-SemiBold';
`;
