import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OurRecomScreen from '../screens/recom/OurRecomScreen';
import CFScreen from '../screens/recom/CFScreen';
import CBFScreen from '../screens/recom/CBFScreen';

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
