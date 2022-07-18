import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icons from 'react-native-vector-icons/AntDesign';

import Lista from '../Lista';
import {Configurations} from '../Configurations';
import {TouchableOpacity, View} from 'react-native';

const Tab = createBottomTabNavigator();

function MyTabBar({state, descriptors, navigation}: any) {
  return (
    <View
      style={{
        flexDirection: 'row',
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        let iconName = 'bars';
        switch (label) {
          case 'Settings':
            iconName = 'setting';
            break;
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

        const onLongPress = () => {
          console.log('de');
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1, backgroundColor: '#000', padding: 10}}>
            <Icons
              name={iconName}
              size={25}
              color={isFocused ? '#673ab7' : '#222'}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Tabs = () => {
  return (
    <Tab.Navigator
      backBehavior="initialRoute"
      tabBar={props => <MyTabBar {...props} />}
      initialRouteName="Lista"
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Home" component={Lista} />
      <Tab.Screen name="Lista" component={Lista} />
      <Tab.Screen name="Settings" component={Configurations} />
    </Tab.Navigator>
  );
};

export default Tabs;
