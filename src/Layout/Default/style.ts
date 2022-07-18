import styled from 'styled-components/native';
import {Backdrop} from '../../Icons';

export const Container = styled.View`
  height: 100%;
  flex: 1;
  position: relative;
`;

export const SvgBackdrop = styled(Backdrop)`
  position: absolute;
  height: 120px;
  bottom: -30px;
  z-index: 1;
`;
