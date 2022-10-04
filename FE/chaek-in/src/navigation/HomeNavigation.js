import React from 'react';
import { View, Text, Image, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import BookDetailScreen from '../screens/BookDetailScreen';
import MyPageScreen from '../screens/userinfo/MyPageScreen';
import { FontAwesome5 } from '@expo/vector-icons';

function LogoTitle() {
  return (
    <View>
      <Image style={{ width: 50, height: 50 }} source={require('../../assets/image/logo.png')} />
    </View>
  );
}

const HomeStack = createStackNavigator();

function HomeNavigation({ navigation }) {
  return (
    <HomeStack.Navigator
      initialRouteName='LibraryMain'
      screenOptions={{
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
      <HomeStack.Screen
        name='LibraryMain'
        component={HomeScreen}
        options={{
          // headerShown: false,
          headerTitle: (props) => <LogoTitle {...props} />,
          title: '서재',
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
      ></HomeStack.Screen>
      <HomeStack.Screen
        name='BookDetail'
        component={BookDetailScreen}
        options={{
          title: '책 상세보기',
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
      ></HomeStack.Screen>
      <HomeStack.Screen
        name='MyPage'
        component={MyPageScreen}
        options={{ title: '마이페이지' }}
      ></HomeStack.Screen>
    </HomeStack.Navigator>
  );
}

export default HomeNavigation;
