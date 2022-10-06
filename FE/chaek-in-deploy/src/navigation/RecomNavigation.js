import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RecomHomeScreen from '../screens/recommendation/RecomHomeScreen';
import SimilarPeopleScreen from '../screens/recommendation/SimilarPeopleScreen';
import SimilarBookRecomScreen from '../screens/recommendation/SimilarBookRecomScreen';
import BestSellerRecomScreen from '../screens/recommendation/BestSellerRecomScreen';
import BookSearchScreen from '../screens/recommendation/BookSearchScreen';
import { FontAwesome5 } from '@expo/vector-icons';

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
        }}
      ></BookRecomStack.Screen>
      <BookRecomStack.Screen
        name='SimilarBookRecom'
        component={SimilarBookRecomScreen}
        options={{
          title: '내가 좋아하는 책과 비슷한 책',
        }}
      ></BookRecomStack.Screen>
      <BookRecomStack.Screen
        name='BestSellerRecom'
        component={BestSellerRecomScreen}
        options={{
          title: '책크인 많이 한 책',
        }}
      ></BookRecomStack.Screen>
      <BookRecomStack.Screen
        name='BookSearch'
        component={BookSearchScreen}
        options={{ title: '책 검색하기' }}
      ></BookRecomStack.Screen>
    </BookRecomStack.Navigator>
  );
}

export default BookRecomNavigation;
