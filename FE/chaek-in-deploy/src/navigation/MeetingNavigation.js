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
import { useSelector } from 'react-redux';
import { FontAwesome5 } from '@expo/vector-icons';

const MeetingStack = createStackNavigator();

function MeetingNavigation({ navigation }) {
  const { nickname } = useSelector((state) => state.main);

  return (
    <MeetingStack.Navigator
      initialRouteName='MeetingHome'
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
      <MeetingStack.Screen
        name='MeetingCreate'
        component={MeetingCreateScreen}
        options={{
          title: '모임 시작하기',
        }}
      />
      <MeetingStack.Screen
        name='MeetingHome'
        component={MeetingHomeScreen}
        options={{
          title: '책크人',
          headerStyle: {
            backgroundColor: '#FCF9F0',
          },
          headerTitleStyle: {
            fontFamily: 'Medium',
            fontSize: 16,
          },
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
      ></MeetingStack.Screen>
      <MeetingStack.Screen
        name='MeetingAll'
        component={MeetingAllScreen}
        options={{
          title: '모임 전체 보기',
          headerStyle: {
            backgroundColor: '#FCF9F0',
          },
          headerTitleStyle: {
            fontFamily: 'Medium',
            fontSize: 16,
          },
        }}
      ></MeetingStack.Screen>
      <MeetingStack.Screen
        name='MeetingMyBook'
        component={MeetingMyBookScreen}
        options={{
          title: '최근 읽은 책',
          headerStyle: {
            backgroundColor: '#FCF9F0',
          },
          headerTitleStyle: {
            fontFamily: 'Medium',
            fontSize: 16,
          },
        }}
      ></MeetingStack.Screen>
      <MeetingStack.Screen
        name='MeetingOpposite'
        component={MeetingOppositeScreen}
        options={{
          title: '이런 책도 같이 읽어 봐요',
          headerStyle: {
            backgroundColor: '#FCF9F0',
          },
          headerTitleStyle: {
            fontFamily: 'Medium',
            fontSize: 16,
          },
        }}
      ></MeetingStack.Screen>
      <MeetingStack.Screen
        name='MeetingSimilar'
        component={MeetingSimilarScreen}
        options={{
          title: `${nickname}님과 비슷한 분들이 만든 모임`,
          headerStyle: {
            backgroundColor: '#FCF9F0',
          },
          headerTitleStyle: {
            fontFamily: 'Medium',
            fontSize: 14,
          },
        }}
      ></MeetingStack.Screen>
      <MeetingStack.Screen
        name='MeetingChallenge'
        component={MeetingChallengeScreen}
        options={{
          title: '도전! 완독 모임',
          headerStyle: {
            backgroundColor: '#FCF9F0',
          },
          headerTitleStyle: {
            fontFamily: 'Medium',
            fontSize: 16,
          },
        }}
      ></MeetingStack.Screen>
      <MeetingStack.Screen
        name='MeetingDetail'
        component={MeetingDetailScreen}
        options={{
          title: '모임 상세보기',
          headerStyle: {
            backgroundColor: '#FCF9F0',
          },
          headerTitleStyle: {
            fontFamily: 'Medium',
            fontSize: 16,
          },
        }}
      ></MeetingStack.Screen>
    </MeetingStack.Navigator>
  );
}

export default MeetingNavigation;
