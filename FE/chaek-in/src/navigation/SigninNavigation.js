import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/signin/LoginScreen';
import GetNicknameScreen from '../screens/signin/GetNicknameScreen';
import GetJobScreen from '../screens/signin/GetJobScreen';
import GetAgeScreen from '../screens/signin/GetAgeScreen';
import GetGenderScreen from '../screens/signin/GetGenderScreen';

const UserInfoStack = createStackNavigator();

function SigninNavigation() {
  return (
    <UserInfoStack.Navigator initialRouteName='Login'>
      <UserInfoStack.Screen
        name='Login'
        component={LoginScreen}
        screenOptions={{ headerShown: false }}
      ></UserInfoStack.Screen>
      <UserInfoStack.Screen
        name='Nickname'
        component={GetNicknameScreen}
        screenOptions={{ headerShown: false }}
      ></UserInfoStack.Screen>
      <UserInfoStack.Screen
        name='Job'
        component={GetJobScreen}
        screenOptions={{ headerShown: false }}
      ></UserInfoStack.Screen>
      <UserInfoStack.Screen
        name='Age'
        component={GetAgeScreen}
        screenOptions={{ headerShown: false }}
      ></UserInfoStack.Screen>
      <UserInfoStack.Screen
        name='Gender'
        component={GetGenderScreen}
        screenOptions={{ headerShown: false }}
      ></UserInfoStack.Screen>
    </UserInfoStack.Navigator>
  );
}

export default SigninNavigation;
