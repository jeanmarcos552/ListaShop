import styled from 'styled-components/native';

export const GlobalStyles = styled.View`
  background-color: ${({theme}) => theme.colors.background};
  flex: 1;
  height: 100%;
`;

export const CenterView = styled.View`
  justify-content: center;
  align-items: center;
`;

interface PropCenter {
  direction?: 'row' | 'column';
  justifyContent?:
    | 'center'
    | 'baseline'
    | 'flex-end'
    | 'flex-start'
    | 'space-around';
  ml?: number;
  mb?: number;
  mr?: number;
  mt?: number;
  alignItems?: 'center' | 'flex-start' | 'flex-end';
}
export const ViewJ = styled.View<PropCenter>`
  justify-content: ${props =>
    props.justifyContent ? props.justifyContent : 'center'};
  align-items: center;
  flex-direction: ${props => (props.direction ? props.direction : 'column')};
  margin-left: ${props => (props.ml ? props.ml : 0)}px;
  margin-right: ${props => (props.mr ? props.mr : 0)}px;
  margin-bottom: ${props => (props.mb ? props.mb : 0)}px;
  margin-top: ${props => (props.mt ? props.mt : 0)}px;
  align-items: ${props => (props.alignItems ? props.alignItems : 'flex-start')};
`;

interface PropText extends PropCenter {
  color?: string;
  fontSize?: number;
}

export const TextJ = styled.Text<PropText>`
  justify-content: ${props =>
    props.justifyContent ? props.justifyContent : 'center'};
  flex-direction: ${props => (props.direction ? props.direction : 'column')};
  margin-left: ${props => (props.ml ? props.ml : 0)}px;
  margin-right: ${props => (props.mr ? props.mr : 0)}px;
  margin-bottom: ${props => (props.mb ? props.mb : 0)}px;
  color: ${({color, theme}) => (color ? color : theme.colors.text)};
  font-size: ${props => (props.fontSize ? props.fontSize : 15)}px;
  align-items: ${props => (props.alignItems ? props.alignItems : 'flex-start')};
`;
