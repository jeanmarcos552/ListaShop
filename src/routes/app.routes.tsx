import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import Tabs from '../pages/Tabs';
import List from '../pages/List';
import ItemsList from '../pages/List/ItemsList';
import AddItemsToList from '../pages/List/AddItemsToList';
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
      <App.Screen name="List" component={List} />
      <App.Screen name="ItemsList" component={ItemsList} />
      <App.Screen name="AddItemsToList" component={AddItemsToList} />
      <App.Screen name="Notifications" component={Notifications} />
    </App.Navigator>
  );
};

export default AppRoutes;
