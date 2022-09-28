import React from 'react';
import { View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RecomNavigation from './RecomNavigation';
import HomeNavigation from './HomeNavigation';
import ReadScreen from '../screens/ReadScreen';
import RecordNavigation from './RecordNavigation';
import MeetingNavigation from './MeetingNav/MeetingNavigation';
import UserInfoNavigation from './UserinfoNavigation';
import RecordScreen from '../screens/bookRecord/RecordScreen';

const Tab = createBottomTabNavigator();

function TabNavigation() {
  return (
    // <NavigationContainer>
    <Tab.Navigator
      initialRouteName='Library'
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: '#010811',
        headerStyle: {
          backgroundColor: '#FCF9F0',
          shadowColor: '#FCF9F0',
          elevation: 0,
        },
        headerTitleStyle: {
          fontFamily: 'Medium',
        },
      }}
    >
      <Tab.Screen name='Library' component={HomeNavigation} options={{ headerShown: false, title: '서재' }} />
      <Tab.Screen
        name='Recommend'
        component={RecomNavigation}
        options={{
          title: '나를 위한 책',
        }}
      />
      <Tab.Screen
        name='Read'
        component={ReadScreen}
        options={{
          title: '책 읽기',
        }}
      />
      <Tab.Screen
        name='Meeting'
        component={MeetingNavigation}
        options={{
          title: '책크人',
        }}
      />
      {/* <Tab.Screen
        name='Record'
        component={RecordNavigation}
        options={{
          title: '나의 한 문장',
        }}
      /> */}
      <Tab.Screen name='Userinfo' component={UserInfoNavigation} options={{ headerShown: false }} />
    </Tab.Navigator>
    // </NavigationContainer>
  );
}

export default TabNavigation;
