import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserInfoScreen from '../screens/userinfo/UserInfoScreen';
import ChangeUserinfoScreen from '../screens/userinfo/ChangeUserinfoScreen';

const UserinfoStack = createStackNavigator();

function UserinfoNavigation() {
  return (
    <UserinfoStack.Navigator>
      <UserinfoStack.Screen
        name='UserinfoMain'
        component={UserInfoScreen}
        options={{ title: '사용자 정보' }}
      ></UserinfoStack.Screen>
      <UserinfoStack.Screen name='ChangeUserinfo' component={ChangeUserinfoScreen}></UserinfoStack.Screen>
    </UserinfoStack.Navigator>
  );
}

export default UserinfoNavigation;
