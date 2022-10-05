import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RecomNavigation from './RecomNavigation';
import HomeNavigation from './HomeNavigation';
import ReadScreen from '../screens/ReadScreen';
import RecordNavigation from './RecordNavigation';
import MeetingNavigation from './MeetingNavigation';
import UserInfoNavigation from './UserinfoNavigation';
import RecordScreen from '../screens/bookRecord/RecordScreen';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function TabNavigation({ navigation }) {
  return (
    <Tab.Navigator
      initialRouteName='Library'
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: '#B1D8E8',
          borderRadius: 15,
          height: 70,
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
          // headerRight: () => (
          //   <FontAwesome5
          //     name='user-circle'
          //     size={25}
          //     style={{ right: 20 }}
          //     color='#728EA6'
          //     onPress={() => navigation.navigate('MyPage')}
          //   />
          // ),
        }}
      />
      <Tab.Screen
        name='Recommend'
        component={RecomNavigation}
        options={{
          headerShown: false,
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
          // headerRight: () => (
          //   <FontAwesome5
          //     name='user-circle'
          //     size={25}
          //     style={{ right: 20 }}
          //     color='#728EA6'
          //     onPress={() => navigation.navigate('MyPage')}
          //   />
          // ),
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

      <Tab.Screen
        name='Meeting'
        component={MeetingNavigation}
        options={{
          headerShown: false,
          title: '책크人',
          tabBarIcon: ({ focused }) => (
            <View>
              <Ionicons name='people-circle-outline' size={30} color={focused ? '#728EA6' : 'white'} />
            </View>
          ),
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
      {/* 아래 두 스크린은 주석처리 해야 합니다. */}
      {/* <Tab.Screen
        name='Record'
        component={RecordNavigation}
        options={{
          title: '나의 한 문장',
        }}
      /> */}
      {/* <Tab.Screen name='Userinfo' component={UserInfoNavigation} options={{ headerShown: false }} /> */}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: 'white',
    shadowOffset: {
      width: 1,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 10,
  },
});

export default TabNavigation;
