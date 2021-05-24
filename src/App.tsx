import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';

import {StatusBar, View} from 'react-native';
import AppProvider from './hooks';
import Routes from './routes';

const App: React.FC = () => {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#fafafa',
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar barStyle="light-content" />
      <AppProvider>
        <View style={{flex: 1}}>
          <Routes />
        </View>
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;
