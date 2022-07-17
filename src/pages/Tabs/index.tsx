import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icons from 'react-native-vector-icons/AntDesign';

import Lista from '../Lista';
import {Configurations} from '../Configurations';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName: any;
          switch (route.name) {
            case 'Lista':
              iconName = focused ? 'bars' : 'bars';
              break;
            case 'Settings':
              iconName = focused ? 'setting' : 'setting';
              break;
          }
          return <Icons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarShowLabel: false,
      })}
      initialRouteName="Lista">
      <Tab.Screen name="Lista" component={Lista} />
      <Tab.Screen name="Settings" component={Configurations} />
    </Tab.Navigator>
  );
};

export default Tabs;
