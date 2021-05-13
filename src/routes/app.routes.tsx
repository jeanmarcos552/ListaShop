import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import Tabs from '../pages/Tabs';
import Lista from '../pages/Lista/Listagem';
import ItensToList from '../pages/Lista/Listagem/ListItem';
import AddToList from '../pages/Lista/Listagem/AddToList';

const App = createStackNavigator();

const AppRoutes: React.FC = () => {
  return (
    <App.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: '#00BC7E'},
      }}
      initialRouteName="Tabs">
      <App.Screen name="Tabs" component={Tabs} />
      <App.Screen name="Lista" component={Lista} />
      <App.Screen name="ItensToList" component={ItensToList} />
      <App.Screen name="AddToList" component={AddToList} />
    </App.Navigator>
  );
};

export default AppRoutes;
