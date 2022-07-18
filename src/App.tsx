import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {StatusBar, Appearance} from 'react-native';
import AppProvider from './hooks';
import Routes from './routes';

import {ThemeProvider} from 'styled-components/native';
import light from './styles/themes/light';
import dark from './styles/themes/dark';

const App: React.FC = () => {
  const colorTheme = Appearance.getColorScheme();
  return (
    <ThemeProvider theme={colorTheme !== 'dark' ? dark : light}>
      <NavigationContainer>
        <StatusBar
          animated={true}
          backgroundColor={
            colorTheme !== 'light' ? light.colors.primary : dark.colors.primary
          }
          barStyle="default"
          showHideTransition="slide"
        />
        <AppProvider>
          <Routes />
        </AppProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
