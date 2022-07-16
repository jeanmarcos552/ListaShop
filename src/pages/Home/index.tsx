import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {useAuth} from '../../hooks/auth';

import Header from '../../Layout/Header';

interface PropsHeader {
  user: {name: string};
}

const Home = () => {
  const {user} = useAuth();

  return (
    <>
      <Header user={user} />

      <SafeAreaView>
        <Text>Home</Text>
      </SafeAreaView>
    </>
  );
};

export default Home;
