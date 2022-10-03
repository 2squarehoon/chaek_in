import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChangeUserinfoScreen from '../screens/userinfo/ChangeUserinfoScreen';
import MyPageScreen from '../screens/userinfo/MyPageScreen';
import LibraryScreen from '../screens/userinfo/LibraryScreen';
import ReadBooksListScreen from '../screens/userinfo/ReadBooksListScreen';
import LikeBooksListScreen from '../screens/userinfo/LikeBooksListScreen';
import BookDetailScreen from '../screens/BookDetailScreen';

const UserinfoStack = createStackNavigator();

function UserinfoNavigation() {
  return (
    <UserinfoStack.Navigator
      initialRouteName='MyPage'
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
      <UserinfoStack.Screen
        name='MyPage'
        component={MyPageScreen}
        options={{ title: '마이페이지' }}
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
      <UserinfoStack.Screen
        name='BookDetail'
        component={BookDetailScreen}
        options={{ title: '책 상세보기' }}
      ></UserinfoStack.Screen>
    </UserinfoStack.Navigator>
  );
}

export default UserinfoNavigation;
