import { StyleSheet, Text, View, Alert, TextInput, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import TabNavigation from './src/navigation/TabNavigation';
import SigninNavigation from './src/navigation/SigninNavigation';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Store, Persistor } from './src/redux/store';
import { useSelector, Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import styled from 'styled-components/native';
import { useFonts } from 'expo-font';
import * as Location from 'expo-location';

const Stack = createStackNavigator();

function AppInner({ navigation }) {
  const [fontsLoaded] = useFonts({
    Light: require('../../../S07P22A107/FE/chaek-in/assets/font/Light.ttf'),
    Medium: require('../../../S07P22A107/FE/chaek-in/assets/font/Medium.ttf'),
    Bold: require('../../../S07P22A107/FE/chaek-in/assets/font/Bold.ttf'),
  });
  const { accessToken } = useSelector((state) => state.main);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {accessToken === '' ? (
          <Stack.Screen
            name='Signin'
            component={SigninNavigation}
            options={{ headerShown: false }}
          ></Stack.Screen>
        ) : (
          <Stack.Screen name='Home' component={TabNavigation} options={{ headerShown: false }}></Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={Store}>
      <PersistGate persistor={Persistor}>
        <AppInner />
      </PersistGate>
    </Provider>
  );
}
