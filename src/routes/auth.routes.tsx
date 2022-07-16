import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgetPass from '../pages/ForgetPass';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => {
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
    </Auth.Navigator>
  );
};

export default AuthRoutes;
