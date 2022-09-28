import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserInfoScreen from '../screens/userinfo/UserInfoScreen';
import ChangeUserinfoScreen from '../screens/userinfo/ChangeUserinfoScreen';
import MyPageScreen from '../screens/userinfo/MyPageScreen';
import LibraryScreen from '../screens/userinfo/LibraryScreen';
import ReadBooksListScreen from '../screens/userinfo/ReadBooksListScreen';
import LikeBooksListScreen from '../screens/userinfo/LikeBooksListScreen';

const UserinfoStack = createStackNavigator();

function UserinfoNavigation() {
  return (
    <UserinfoStack.Navigator initialRouteName='MyPage'>
      <UserinfoStack.Screen
        name='MyPage'
        component={MyPageScreen}
        options={{ title: '마이 페이지' }}
      ></UserinfoStack.Screen>
      <UserinfoStack.Screen
        name='ChangeUserinfo'
        component={ChangeUserinfoScreen}
        options={{ title: '사용자 정보 수정' }}
      ></UserinfoStack.Screen>
      <UserinfoStack.Screen
        name='MyLibrary'
        component={LibraryScreen}
        options={{ title: '내 서재' }}
      ></UserinfoStack.Screen>
      <UserinfoStack.Screen
        name='ReadBooks'
        component={ReadBooksListScreen}
        options={{ title: '내가 읽은 책' }}
      ></UserinfoStack.Screen>
      <UserinfoStack.Screen
        name='LikeBooks'
        component={LikeBooksListScreen}
        options={{ title: '내가 찜한 책' }}
      ></UserinfoStack.Screen>
    </UserinfoStack.Navigator>
  );
}

export default UserinfoNavigation;
