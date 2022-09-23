import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OurRecomScreen from '../screens/recommendation/OurRecomScreen';
import CFScreen from '../screens/recommendation/CFScreen';
import CBFScreen from '../screens/recommendation/CBFScreen';

const RecomTab = createMaterialTopTabNavigator();

function MemoNavigation() {
  return (
    <RecomTab.Navigator initialRouteName='OurRecomScreen'>
      <RecomTab.Screen name='OurRecomScreen' component={OurRecomScreen}></RecomTab.Screen>
      <RecomTab.Screen name='CFScreen' component={CFScreen}></RecomTab.Screen>
      <RecomTab.Screen name='CBFScreen' component={CBFScreen}></RecomTab.Screen>
    </RecomTab.Navigator>
  );
}

export default MemoNavigation;
