import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
import BookDetailScreen from '../screens/BookDetailScreen'
import BookLogScreen from '../screens/BookLogScreen'

const HomeStack = createStackNavigator()

function HomeNavigation () {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="library" component={HomeScreen} options={{ title: '서재' }}></HomeStack.Screen>
      <HomeStack.Screen name="BookLogs" component={BookLogScreen}></HomeStack.Screen>
      <HomeStack.Screen name="BookDetail" component={BookDetailScreen}></HomeStack.Screen>
    </HomeStack.Navigator>
  )
}

export default HomeNavigation
