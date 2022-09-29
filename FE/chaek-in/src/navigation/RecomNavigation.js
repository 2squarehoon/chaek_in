import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CFScreen from '../screens/recommendation/SimilarPeopleScreen';
import CBFScreen from '../screens/recommendation/SimilarBookRecomScreen';

const RecomTab = createMaterialTopTabNavigator();

function MemoNavigation() {
  return (
    <RecomTab.Navigator initialRouteName='OurRecomScreen'>
      <RecomTab.Screen name='CFScreen' component={CFScreen}></RecomTab.Screen>
      <RecomTab.Screen name='CBFScreen' component={CBFScreen}></RecomTab.Screen>
    </RecomTab.Navigator>
  );
}

export default MemoNavigation;
