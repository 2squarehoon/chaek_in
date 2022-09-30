import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MeetingHomeScreen from '../screens/meeting/MeetingHomeScreen';
import MeetingAllScreen from '../screens/meeting/MeetingAllScreen';
import MeetingMyBookScreen from '../screens/meeting/MeetingMyBookScreen';
import MeetingOppositeScreen from '../screens/meeting/MeetingOppositeScreen';
import MeetingSimilarScreen from '../screens/meeting/MeetingSimilarScreen';
import MeetingChallengeScreen from '../screens/meeting/MeetingChallengeScreen';
import MeetingCreateScreen from '../screens/meeting/MeetingCreateScreen';
import MeetingDetailScreen from '../screens/meeting/MeetingDetailScreen';

const MeetingStack = createStackNavigator();

function MeetingNavigation() {
  return (
    <MeetingStack.Navigator initialRouteName='MeetingHome' screenOptions={{ headerShown: false }}>
      <MeetingStack.Screen name='MeetingCreate' component={MeetingCreateScreen} />
      <MeetingStack.Screen name='MeetingHome' component={MeetingHomeScreen}></MeetingStack.Screen>
      <MeetingStack.Screen name='MeetingAll' component={MeetingAllScreen}></MeetingStack.Screen>
      <MeetingStack.Screen name='MeetingMyBook' component={MeetingMyBookScreen}></MeetingStack.Screen>
      <MeetingStack.Screen name='MeetingOpposite' component={MeetingOppositeScreen}></MeetingStack.Screen>
      <MeetingStack.Screen name='MeetingSimilar' component={MeetingSimilarScreen}></MeetingStack.Screen>
      <MeetingStack.Screen name='MeetingChallenge' component={MeetingChallengeScreen}></MeetingStack.Screen>
      <MeetingStack.Screen name='MeetingDetail' component={MeetingDetailScreen}></MeetingStack.Screen>
    </MeetingStack.Navigator>
  );
}

export default MeetingNavigation;
