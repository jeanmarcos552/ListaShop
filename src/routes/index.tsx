import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgetPass from '../pages/ForgetPass';
import Tabs from '../pages/Tabs';
import Lista from '../pages/Lista/Listagem';
import ItensToList from '../pages/Lista/Listagem/ListItem';
import AddToList from '../pages/Lista/Listagem/AddToList';

const Auth = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: '#00BC7E'},
      }}
      initialRouteName="Tabs">
      <Auth.Screen name="SignIn" component={SignIn} />
      <Auth.Screen name="SignUp" component={SignUp} />
      <Auth.Screen name="ForgetPass" component={ForgetPass} />
      <Auth.Screen name="Tabs" component={Tabs} />
      <Auth.Screen name="Lista" component={Lista} />
      <Auth.Screen name="ItensToList" component={ItensToList} />
      <Auth.Screen name="AddToList" component={AddToList} />
    </Auth.Navigator>
  );
};

export default Routes;
