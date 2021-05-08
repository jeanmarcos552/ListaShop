import React, {useState, useCallback} from 'react';
import {SafeAreaView, StyleSheet, View, StatusBar, Text} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';

import {SwipeListView} from 'react-native-swipe-list-view';
import {useAuth} from '../../hooks/auth';

import Header from '../../Layout/Header';
interface UserProps {
  name: string;
  email: string;
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
