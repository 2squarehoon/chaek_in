import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import BookDetailScreen from '../screens/BookDetailScreen';
import BookLogScreen from '../screens/BookLogScreen';
import LoginScreen from '../screens/LoginScreen';

const HomeStack = createStackNavigator();

function HomeNavigation() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name='Library' component={HomeScreen} options={{ title: '서재' }}></HomeStack.Screen>
      <HomeStack.Screen name='BookLogs' component={BookLogScreen}></HomeStack.Screen>
      <HomeStack.Screen name='BookDetail' component={BookDetailScreen}></HomeStack.Screen>
      <HomeStack.Screen name='Login' component={LoginScreen}></HomeStack.Screen>
    </HomeStack.Navigator>
  );
}

export default HomeNavigation;
