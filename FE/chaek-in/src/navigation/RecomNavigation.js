import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RecomHomeScreen from '../screens/recommendation/RecomHomeScreen';
import SimilarPeopleScreen from '../screens/recommendation/SimilarPeopleScreen';
import SimilarBookRecomScreen from '../screens/recommendation/SimilarBookRecomScreen';
import MeetingDetailScreen from '../screens/meeting/MeetingDetailScreen';
import BestSellerRecomScreen from '../screens/recommendation/BestSellerRecomScreen';
import { FontAwesome5 } from '@expo/vector-icons';
import ChangeUserinfoScreen from '../screens/userinfo/ChangeUserinfoScreen';
import LibraryScreen from '../screens/userinfo/LibraryScreen';
import ReadBooksListScreen from '../screens/userinfo/ReadBooksListScreen';
import LikeBooksListScreen from '../screens/userinfo/LikeBooksListScreen';
import RecordScreen from '../screens/bookRecord/RecordScreen';
import RecordCreateScreen from '../screens/bookRecord/RecordCreateScreen';
import OCRScreen from '../screens/bookRecord/OCRScreen';
import OCRRecordCreateScreen from '../screens/bookRecord/OCRRecordCreateScreen';
import BookDetailScreen from '../screens/BookDetailScreen';
import MyPageScreen from '../screens/userinfo/MyPageScreen';

const BookRecomStack = createStackNavigator();

function BookRecomNavigation({ navigation }) {
  return (
    <BookRecomStack.Navigator
      initialRouteName='RecomHome'
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
          fontSize: 16,
        },
      }}
    >
      <BookRecomStack.Screen
        name='RecomHome'
        component={RecomHomeScreen}
        options={{
          title: '나를 위한 책',
          // headerStyle: {
          //   backgroundColor: '#F8DFAA',
          // },
          // headerTitleStyle: {
          //   fontFamily: 'Medium',
          //   fontSize: 16,
          // },
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
      />
      <BookRecomStack.Screen
        name='SimilarPeople'
        component={SimilarPeopleScreen}
        options={{
          title: '나와 비슷한 사람들이 좋아하는 책',
          // headerStyle: {
          //   backgroundColor: '#F8DFAA',
          // },
          // headerTitleStyle: {
          //   fontFamily: 'Medium',
          //   fontSize: 16,
          // },
        }}
      ></BookRecomStack.Screen>
      <BookRecomStack.Screen
        name='SimilarBookRecom'
        component={SimilarBookRecomScreen}
        options={{
          title: '내가 좋아하는 책과 비슷한 책',
          // headerStyle: {
          //   backgroundColor: '#F8DFAA',
          // },
          // headerTitleStyle: {
          //   fontFamily: 'Medium',
          //   fontSize: 16,
          // },
        }}
      ></BookRecomStack.Screen>
      <BookRecomStack.Screen
        name='BestSellerRecom'
        component={BestSellerRecomScreen}
        options={{
          title: '책크인 많이 한 책',
          // headerStyle: {
          //   backgroundColor: '#F8DFAA',
          // },
          // headerTitleStyle: {
          //   fontFamily: 'Medium',
          //   fontSize: 16,
          // },
        }}
      ></BookRecomStack.Screen>
      <BookRecomStack.Screen
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
      ></BookRecomStack.Screen>
      <BookRecomStack.Screen
        name='MyPage'
        component={MyPageScreen}
        options={{ title: '마이페이지' }}
      ></BookRecomStack.Screen>
      <BookRecomStack.Screen
        name='MyLibrary'
        component={LibraryScreen}
        options={{ title: '내 서재' }}
      ></BookRecomStack.Screen>
      <BookRecomStack.Screen
        name='ReadBooks'
        component={ReadBooksListScreen}
        options={{ title: '내가 읽은 책' }}
      ></BookRecomStack.Screen>
      <BookRecomStack.Screen
        name='LikeBooks'
        component={LikeBooksListScreen}
        options={{ title: '내가 찜한 책' }}
      ></BookRecomStack.Screen>
      <BookRecomStack.Screen
        name='ChangeUserinfo'
        component={ChangeUserinfoScreen}
        options={{ title: '사용자 정보 수정' }}
      ></BookRecomStack.Screen>
      <BookRecomStack.Screen
        name='RecordScreen'
        component={RecordScreen}
        options={{ title: '나의 한 문장' }}
      ></BookRecomStack.Screen>
      <BookRecomStack.Screen
        name='RecordCreate'
        component={RecordCreateScreen}
        options={{ title: '메모 작성하기' }}
      ></BookRecomStack.Screen>
      <BookRecomStack.Screen
        name='OCRRecordCreate'
        component={OCRRecordCreateScreen}
        options={{ title: 'OCR 기록하기' }}
      ></BookRecomStack.Screen>
      <BookRecomStack.Screen
        name='OCR'
        component={OCRScreen}
        options={{ title: 'OCR 찍기' }}
      ></BookRecomStack.Screen>
    </BookRecomStack.Navigator>
  );
}

export default BookRecomNavigation;
