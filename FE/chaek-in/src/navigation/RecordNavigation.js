import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RecordScreen from '../screens/bookRecord/RecordScreen';
import RecordCreateScreen from '../screens/bookRecord/RecordCreateScreen';
import RecordDetailScreen from '../screens/bookRecord/RecordDetailScreen';
import OCRScreen from '../screens/bookRecord/OCRScreen';

const RecordStack = createStackNavigator();

function RecordNavigation() {
  return (
    <RecordStack.Navigator initialRouteName='RecordScreen'>
      <RecordStack.Screen name='RecordScreen' component={RecordScreen}></RecordStack.Screen>
      <RecordStack.Screen name='RecordCreate' component={RecordCreateScreen}></RecordStack.Screen>
      <RecordStack.Screen name='RecordDetail' component={RecordDetailScreen}></RecordStack.Screen>
      <RecordStack.Screen name='OCR' component={OCRScreen}></RecordStack.Screen>
    </RecordStack.Navigator>
  );
}

export default RecordNavigation;
