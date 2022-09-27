import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/signin/LoginScreen';
import GetNicknameScreen from '../screens/signin/GetNicknameScreen';
import GetJobScreen from '../screens/signin/GetJobScreen';
import GetAgeScreen from '../screens/signin/GetAgeScreen';
import GetGenderScreen from '../screens/signin/GetGenderScreen';
import FirstRatingSkipScreen from '../screens/signin/FirstRatingSkipScreen';
import FirstRatingScreen from '../screens/signin/FirstRatingScreen';

const UserInfoStack = createStackNavigator();

function SigninNavigation() {
  return (
    <UserInfoStack.Navigator initialRouteName='Login'>
      <UserInfoStack.Screen
        name='Login'
        component={LoginScreen}
        options={{ headerShown: false }}
      ></UserInfoStack.Screen>
      <UserInfoStack.Screen
        name='Nickname'
        component={GetNicknameScreen}
        options={{ headerShown: false }}
      ></UserInfoStack.Screen>
      <UserInfoStack.Screen
        name='Job'
        component={GetJobScreen}
        options={{ title: '', headerStyle: { backgroundColor: '#fcf9f0' } }}
      ></UserInfoStack.Screen>
      <UserInfoStack.Screen
        name='Age'
        component={GetAgeScreen}
        options={{ title: '', headerStyle: { backgroundColor: '#fcf9f0' } }}
      ></UserInfoStack.Screen>
      <UserInfoStack.Screen
        name='Gender'
        component={GetGenderScreen}
        options={{ title: '', headerStyle: { backgroundColor: '#fcf9f0' } }}
      ></UserInfoStack.Screen>
      <UserInfoStack.Screen
        name='RatingSkip'
        component={FirstRatingSkipScreen}
        options={{ headerShown: false, title: '', headerStyle: { backgroundColor: '#fcf9f0' } }}
      ></UserInfoStack.Screen>
      <UserInfoStack.Screen
        name='Rating'
        component={FirstRatingScreen}
        options={{ headerShown: false, title: '', headerStyle: { backgroundColor: '#fcf9f0' } }}
      ></UserInfoStack.Screen>
    </UserInfoStack.Navigator>
  );
}

export default SigninNavigation;
