import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RecomHomeScreen from '../screens/recommendation/RecomHomeScreen';
import SimilarPeopleScreen from '../screens/recommendation/SimilarPeopleScreen';
import SimilarBookRecomScreen from '../screens/recommendation/SimilarBookRecomScreen';

const BookRecomStack = createStackNavigator();

function BookRecomNavigation() {
  return (
    <BookRecomStack.Navigator initialRouteName='RecomHome' screenOptions={{ headerShown: false }}>
      <BookRecomStack.Screen name='RecomHome' component={RecomHomeScreen} />
      <BookRecomStack.Screen name='SimilarPeople' component={SimilarPeopleScreen}></BookRecomStack.Screen>
      <BookRecomStack.Screen
        name='SimilarBookRecom'
        component={SimilarBookRecomScreen}
      ></BookRecomStack.Screen>
    </BookRecomStack.Navigator>
  );
}

export default BookRecomNavigation;
