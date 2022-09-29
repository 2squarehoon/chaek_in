import React from 'react';
import { View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import BookDetailScreen from '../screens/BookDetailScreen';
import BookLogScreen from '../screens/BookLogScreen';

function LogoTitle() {
  return (
    <View>
      <Image style={{ width: 50, height: 50 }} source={require('../../assets/image/logo.png')} />
    </View>
  );
}

const HomeStack = createStackNavigator();

function HomeNavigation() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name='LibraryMain'
        component={HomeScreen}
        options={{
          // headerShown: false,
          headerTitle: (props) => <LogoTitle {...props} />,
          title: '서재',
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
      ></HomeStack.Screen>
      <HomeStack.Screen name='BookLogs' component={BookLogScreen}></HomeStack.Screen>
      <HomeStack.Screen name='BookDetail' component={BookDetailScreen}></HomeStack.Screen>
    </HomeStack.Navigator>
  );
}

export default HomeNavigation;
