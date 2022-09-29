import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RecomNavigation from './RecomNavigation';
import HomeNavigation from './HomeNavigation';
import ReadScreen from '../screens/ReadScreen';
import RecordNavigation from './RecordNavigation';
import MeetingNavigation from './MeetingNav/MeetingNavigation';
import UserInfoNavigation from './UserinfoNavigation';
import RecordScreen from '../screens/bookRecord/RecordScreen';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function TabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName='Library'
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: '#B1D8E8',
          borderRadius: 15,
          height: 80,
          paddingLeft: 10,
          paddingRight: 10,
          borderColor: 'black',
          borderTopWidth: 1,
          borderStyle: 'solid',
          borderTopColor: 'black',
          borderWidth: 1,
          ...styles.shadow,
        },
        headerTitleAlign: 'center',
        headerTintColor: '#010811',
        headerStyle: {
          backgroundColor: '#FCF9F0',
          shadowColor: '#FCF9F0',
          elevation: 0,
        },
        headerTitleStyle: {
          fontFamily: 'Medium',
        },
      }}
    >
      <Tab.Screen
        name='Library'
        component={HomeNavigation}
        options={{
          headerShown: false,
          title: '서재',
          tabBarIcon: ({ focused }) => (
            <View>
              <MaterialIcons name='home' size={30} color={focused ? '#728EA6' : 'white'} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name='Recommend'
        component={RecomNavigation}
        options={{
          title: '나를 위한 책',
          tabBarIcon: ({ focused }) => (
            <View>
              <MaterialCommunityIcons
                name='file-question-outline'
                size={30}
                color={focused ? '#728EA6' : 'white'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name='Read'
        component={ReadScreen}
        options={{
          title: '책 읽기',
          tabBarIcon: ({ focused }) => (
            <View>
              <MaterialCommunityIcons name='barcode-scan' size={30} color={focused ? '#728EA6' : 'white'} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name='Meeting'
        component={MeetingNavigation}
        options={{
          title: '책크人',
          tabBarIcon: ({ focused }) => (
            <View>
              <Ionicons name='people-circle-outline' size={30} color={focused ? '#728EA6' : 'white'} />
            </View>
          ),
        }}
      />
      {/* 아래 두 스크린은 주석처리 해야 합니다. */}
      <Tab.Screen
        name='Record'
        component={RecordNavigation}
        options={{
          title: '나의 한 문장',
        }}
      />
      <Tab.Screen name='Userinfo' component={UserInfoNavigation} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default TabNavigation;
