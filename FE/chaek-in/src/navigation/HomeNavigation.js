import React from 'react';
import { View, Text, Image, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import BookDetailScreen from '../screens/BookDetailScreen';
import MyPageScreen from '../screens/userinfo/MyPageScreen';
import { FontAwesome5 } from '@expo/vector-icons';
import ChangeUserinfoScreen from '../screens/userinfo/ChangeUserinfoScreen';
import LibraryScreen from '../screens/userinfo/LibraryScreen';
import ReadBooksListScreen from '../screens/userinfo/ReadBooksListScreen';
import LikeBooksListScreen from '../screens/userinfo/LikeBooksListScreen';
import RecordScreen from '../screens/bookRecord/RecordScreen';
import RecordCreateScreen from '../screens/bookRecord/RecordCreateScreen';
import OCRScreen from '../screens/bookRecord/OCRScreen';
import OCRRecordCreateScreen from '../screens/bookRecord/OCRRecordCreateScreen';

function LogoTitle() {
  return (
    <View>
      <Image style={{ width: 50, height: 50 }} source={require('../../assets/image/logo.png')} />
    </View>
  );
}

const HomeStack = createStackNavigator();

function HomeNavigation({ navigation }) {
  return (
    <HomeStack.Navigator
      initialRouteName='LibraryMain'
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
      <HomeStack.Screen
        name='LibraryMain'
        component={HomeScreen}
        options={{
          // headerShown: false,
          headerTitle: (props) => <LogoTitle {...props} />,
          title: '서재',
          headerRight: () => (
            <FontAwesome5
              name='user-circle'
              size={25}
              style={{ right: 20 }}
              color='#728EA6'
              onPress={() => navigation.navigate('MyPage')}
            />
          ),
        }}
      ></HomeStack.Screen>
      <HomeStack.Screen
        name='BookDetail'
        component={BookDetailScreen}
        options={{
          title: '책 상세보기',
          headerRight: () => (
            <FontAwesome5
              name='user-circle'
              size={25}
              style={{ right: 20 }}
              color='#728EA6'
              onPress={() => navigation.navigate('MyPage')}
            />
          ),
        }}
      ></HomeStack.Screen>
      <HomeStack.Screen
        name='MyPage'
        component={MyPageScreen}
        options={{ title: '마이페이지' }}
      ></HomeStack.Screen>
      <HomeStack.Screen
        name='MyLibrary'
        component={LibraryScreen}
        options={{ title: '내 서재' }}
      ></HomeStack.Screen>
      <HomeStack.Screen
        name='ReadBooks'
        component={ReadBooksListScreen}
        options={{ title: '내가 읽은 책' }}
      ></HomeStack.Screen>
      <HomeStack.Screen
        name='LikeBooks'
        component={LikeBooksListScreen}
        options={{ title: '내가 찜한 책' }}
      ></HomeStack.Screen>
      <HomeStack.Screen
        name='ChangeUserinfo'
        component={ChangeUserinfoScreen}
        options={{ title: '사용자 정보 수정' }}
      ></HomeStack.Screen>
      <HomeStack.Screen
        name='RecordScreen'
        component={RecordScreen}
        options={{ title: '나의 한 문장' }}
      ></HomeStack.Screen>
      <HomeStack.Screen
        name='RecordCreate'
        component={RecordCreateScreen}
        options={{ title: '메모 작성하기' }}
      ></HomeStack.Screen>
      <HomeStack.Screen
        name='OCRRecordCreate'
        component={OCRRecordCreateScreen}
        options={{ title: '나의 한 문장' }}
      ></HomeStack.Screen>
      <HomeStack.Screen
        name='OCR'
        component={OCRScreen}
        options={{ title: '나의 한 문장' }}
      ></HomeStack.Screen>
    </HomeStack.Navigator>
  );
}

export default HomeNavigation;
