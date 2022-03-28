import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet} from 'react-native';
import Search from './Search/index';
import Clip from './Clip';

const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Search}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={
                  focused
                    ? require('../asset/icons/active-home.png')
                    : require('../asset/icons/home.png')
                }
                style={styles.icon}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Clip"
        component={Clip}
        options={{
          tabBarLabel: 'Clip',
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={
                  focused
                    ? require('../asset/icons/active-contents.png')
                    : require('../asset/icons/contents.png')
                }
                style={styles.icon}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});
