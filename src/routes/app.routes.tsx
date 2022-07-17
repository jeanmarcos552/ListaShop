import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import Tabs from '../pages/Tabs';
import Lista from '../pages/Lista';
import ItensToList from '../pages/Lista/ListItem';
import AddToList from '../pages/Lista/AddToList';
import Notifications from '../pages/Notifications';

const App = createStackNavigator();

const AppRoutes: React.FC = () => {
  return (
    <App.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: '#fff'},
      }}
      initialRouteName="Tabs">
      <App.Screen name="Tabs" component={Tabs} />
      <App.Screen name="Lista" component={Lista} />
      <App.Screen name="ItensToList" component={ItensToList} />
      <App.Screen name="AddToList" component={AddToList} />
      <App.Screen name="Notifications" component={Notifications} />
    </App.Navigator>
  );
};

export default AppRoutes;
