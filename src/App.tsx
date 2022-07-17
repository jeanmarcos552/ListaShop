import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {
  Provider as PaperProvider,
  MD3Colors as Colors,
} from 'react-native-paper';

import {StatusBar, View} from 'react-native';
import AppProvider from './hooks';
import Routes from './routes';

const theme = {
  roundness: 2,
  version: 3,
  colors: {
    ...Colors,
    primary: '#01ac73',
    secondary: '#80a4ec',
    tertiary: '#013db4',
    gray: '#e6e4e4',
  },
};
export type ThemeOverride = typeof theme;

const App: React.FC = () => {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <StatusBar
          animated={true}
          backgroundColor={theme.colors.primary}
          barStyle="default"
          showHideTransition="slide"
        />
        <AppProvider>
          <View style={{flex: 1}}>
            <Routes />
          </View>
        </AppProvider>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
