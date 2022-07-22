import React from 'react';

import {Header, HeaderText, Username} from './style';

interface PropsHeader {
  title: string;
  navigation: NavigationProp<ParamListBase>;
  right?: React.ComponentProps<any>;
}
import Icon from 'react-native-vector-icons/Feather';
import {ParamListBase} from '@react-navigation/routers';
import {NavigationProp} from '@react-navigation/native';

const HeaderSingle: React.FC<PropsHeader> = ({title, navigation, right}) => {
  return (
    <Header>
      <Icon
        name="arrow-left"
        size={20}
        color="#fff"
        onPress={() => navigation.goBack()}
      />
      <HeaderText onPress={() => navigation.goBack()}>
        <Username>{title}</Username>
      </HeaderText>
      {right && right}
    </Header>
  );
};

export default HeaderSingle;
