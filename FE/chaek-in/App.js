import React, { useState, useEffect } from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';

import * as SecureStore from 'expo-secure-store';
import TabNavigation from './src/navigation/TabNavigation';
import SigninNavigation from './src/navigation/SigninNavigation';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function App({ navigation }) {
  const [userToken, getUserToken] = useState(null);
  useEffect(() => {
    const getToken = async () => {
      let token;
      try {
        token = await SecureStore.getItemAsync('accessToken');
      } catch (e) {
        console.log(e);
      }
      await getUserToken(token);
    };
    getToken();
  }, []);
  return (
    // <View style={styles.container}>
    //   <LoginPage />
    //   <StatusBar style="auto" />
    // </View>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={TabNavigation} options={{ headerShown: false }}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
