import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RecordScreen from '../screens/Record/RecordScreen';
import RecordCreateScreen from '../screens/Record/RecordCreateScreen';
import RecordDetailScreen from '../screens/Record/RecordDetailScreen';
import OCRScreen from '../screens/Record/OCRScreen';

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
