import React from 'react';
import {View} from 'react-native';
import {Container, SvgBackdrop} from './style';
import {GlobalStyles} from '../../styles/global';

interface PropsDefault {
  loading: boolean;
  loadingComponent?: any;
  showBackground?: boolean;
  header?: React.ReactElement<any, any>;
  children: any;
}

const TemplateDefault: React.FC<PropsDefault> = ({
  header,
  children,
  loading,
  loadingComponent,
}) => {
  return (
    <GlobalStyles>
      {header && header}
      <Container>
        {loading && loadingComponent ? (
          loadingComponent
        ) : (
          <View style={{flex: 1}}>
            <View style={{zIndex: 999, flex: 1}}>{children}</View>
            <SvgBackdrop width="100%" />
          </View>
        )}
      </Container>
    </GlobalStyles>
  );
};

export default TemplateDefault;
