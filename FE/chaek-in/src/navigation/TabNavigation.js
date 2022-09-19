import React from 'react'
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import HomeScreen from "../screens/HomeScreen";
import RecommendScreen from '../screens/RecommendScreen'
import MeetingScreen from '../screens/MeetingScreen'
import RecordScreen from '../screens/RecordScreen'
import HomeNavigation from './HomeNavigation'

const Tab = createBottomTabNavigator()

function TabNavigation () {
  return (
    // <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeNavigation} options={{ headerShown: false }} />
      <Tab.Screen name="Recommend" component={RecommendScreen} />
      <Tab.Screen name="Meeting" component={MeetingScreen} />
      <Tab.Screen name="Record" component={RecordScreen} />
    </Tab.Navigator>
    // </NavigationContainer>
  )
}

export default TabNavigation
