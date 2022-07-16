import React from 'react';

import {Header, HeaderText, Username} from './style';

interface PropsHeader {
  title: string;
  navigation: NavigationProp<ParamListBase>;
}
import Icon from 'react-native-vector-icons/Feather';
import {ParamListBase} from '@react-navigation/routers';
import {NavigationProp} from '@react-navigation/native';

const HeaderSingle: React.FC<PropsHeader> = ({title, navigation}) => {
  return (
    <Header
      colors={['#01ac73', '#02865a']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <Icon
        name="arrow-left"
        size={20}
        color="#fff"
        onPress={() => navigation.goBack()}
      />
      <HeaderText onPress={() => navigation.goBack()}>
        <Username>{title}</Username>
      </HeaderText>
    </Header>
  );
};

export default HeaderSingle;
