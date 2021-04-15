import React from 'react';
import {NavigationScreenProp} from 'react-navigation';

import {Header, HeaderText, Username} from './style';

interface PropsHeader {
  title: string;
  navigation: NavigationScreenProp<any, any>;
}
import Icon from 'react-native-vector-icons/Feather';

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
      <HeaderText>
        <Username>{title}</Username>
      </HeaderText>
    </Header>
  );
};

export default HeaderSingle;
