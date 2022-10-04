import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RecomHomeScreen from '../screens/recommendation/RecomHomeScreen';
import SimilarPeopleScreen from '../screens/recommendation/SimilarPeopleScreen';
import SimilarBookRecomScreen from '../screens/recommendation/SimilarBookRecomScreen';
import MeetingDetailScreen from '../screens/meeting/MeetingDetailScreen';
import BestSellerRecomScreen from '../screens/recommendation/BestSellerRecomScreen';

const BookRecomStack = createStackNavigator();

function BookRecomNavigation() {
  return (
    <BookRecomStack.Navigator initialRouteName='RecomHome'>
      <BookRecomStack.Screen
        name='RecomHome'
        component={RecomHomeScreen}
        options={{
          title: '홈',
          headerStyle: {
            backgroundColor: '#F8DFAA',
          },
          headerTitleStyle: {
            fontFamily: 'Medium',
            fontSize: 16,
          },
        }}
      />
      <BookRecomStack.Screen
        name='SimilarPeople'
        component={SimilarPeopleScreen}
        options={{
          title: '나와 비슷한 사람들이 좋아하는 책',
          headerStyle: {
            backgroundColor: '#F8DFAA',
          },
          headerTitleStyle: {
            fontFamily: 'Medium',
            fontSize: 16,
          },
        }}
      ></BookRecomStack.Screen>
      <BookRecomStack.Screen
        name='SimilarBookRecom'
        component={SimilarBookRecomScreen}
        options={{
          title: '내가 좋아하는 책과 비슷한 책',
          headerStyle: {
            backgroundColor: '#F8DFAA',
          },
          headerTitleStyle: {
            fontFamily: 'Medium',
            fontSize: 16,
          },
        }}
      ></BookRecomStack.Screen>
      <BookRecomStack.Screen
        name='BestSellerRecom'
        component={BestSellerRecomScreen}
        options={{
          title: '책크인 많이 한 책',
          headerStyle: {
            backgroundColor: '#F8DFAA',
          },
          headerTitleStyle: {
            fontFamily: 'Medium',
            fontSize: 16,
          },
        }}
      ></BookRecomStack.Screen>
    </BookRecomStack.Navigator>
  );
}

export default BookRecomNavigation;
