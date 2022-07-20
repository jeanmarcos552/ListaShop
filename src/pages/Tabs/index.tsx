import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import List from '../List';
import {Configurations} from '../Configurations';
import {TouchableWithoutFeedback} from 'react-native';
import {IconsStyle, TabBarStyle} from './style';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      tabBar={({state, descriptors, navigation}: any) => {
        return (
          <TabBarStyle>
            {state.routes.map((route, index) => {
              const {options} = descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.name;

              let iconName = 'bars';
              if (label === 'Settings') {
                iconName = 'setting';
              }
              const isFocused = state.index === index;

              const onPress = () => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  // The `merge: true` option makes sure that the params inside the tab screen are preserved
                  navigation.navigate({name: route.name, merge: true});
                }
              };

              return (
                <TouchableWithoutFeedback key={index} onPress={onPress}>
                  <IconsStyle name={iconName} size={25} focus={isFocused} />
                </TouchableWithoutFeedback>
              );
            })}
          </TabBarStyle>
        );
      }}
      screenOptions={() => ({
        headerShown: false,
        tabBarShowLabel: false,
      })}
      initialRouteName="List">
      <Tab.Screen name="List" component={List} />
      <Tab.Screen name="Settings" component={Configurations} />
    </Tab.Navigator>
  );
};

export default Tabs;
