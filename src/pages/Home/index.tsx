import React, {useState, useCallback} from 'react';
import {SafeAreaView, StyleSheet, View, StatusBar, Text} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';

import {SwipeListView} from 'react-native-swipe-list-view';

import Header from '../../Layout/Header';

const Home = () => {
  const openClick = useCallback((data) => {
    console.log(data);
  }, []);
  return (
    <>
      <Header name="Jean" />

      <SafeAreaView>
        <SwipeListView
          data={Array(20)
            .fill("")
            .map((_, i) => ({ key: `${i}`, text: `item #${i}` }))}
          renderItem={(data) => (
            <TouchableHighlight onPress={openClick(data)} style={{backgroundColor: '#fff'}}>
              <View>
                <Text>I am {data.item.text} in a SwipeListView</Text>
              </View>
            </TouchableHighlight>
          )}
          renderHiddenItem={(data, rowMap) => (
            <View>
              <Text>Left</Text>
              <Text>Right</Text>
            </View>
          )}
          leftOpenValue={75}
          rightOpenValue={-75}
        />
      </SafeAreaView>
    </>
  );
};

export default Home;
