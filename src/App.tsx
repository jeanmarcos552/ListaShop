import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {StatusBar} from 'react-native';
import AppProvider from './hooks';
import Routes from './routes';

import {ThemeProvider} from 'styled-components/native';
import light from './styles/themes/light';
import {Provider} from 'react-native-paper';

const App: React.FC = () => {
  return (
    <Provider>
      <ThemeProvider theme={light}>
        <NavigationContainer>
          <StatusBar
            animated={true}
            backgroundColor={light.colors.primary}
            barStyle="default"
            showHideTransition="slide"
          />
          <AppProvider>
            <Routes />
          </AppProvider>
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
