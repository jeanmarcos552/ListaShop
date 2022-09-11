import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgetPass from '../pages/ForgetPass';
import {useTheme} from 'styled-components';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => {
  const theme = useTheme();
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: theme.colors.primary},
      }}
      initialRouteName="Tabs">
      <Auth.Screen name="SignIn" component={SignIn} />
      <Auth.Screen name="SignUp" component={SignUp} />
      <Auth.Screen name="ForgetPass" component={ForgetPass} />
    </Auth.Navigator>
  );
};

export default AuthRoutes;
