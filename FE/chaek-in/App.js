import React, { useState, useEffect } from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';
import TabNavigation from './src/navigation/TabNavigation';
import SigninNavigation from './src/navigation/SigninNavigation';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
// import { Provider } from 'react-redux';
// import { Store, Persistor } from './src/redux/store';
// import { useSelector, useDispatch } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import { setAccessToken, setEmail, setNickname, setRefreshToken } from './src/redux/actions';

const Stack = createStackNavigator();

// function AppInner({ navigation }) {
//   const { accessToken } = useSelector((state) => state.userReducer);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const getToken = async () => {
//       let nname;
//       let userEmail;
//       let rToken;
//       let aToken;
//       try {
//         nname = await SecureStore.getItemAsync('nickname');
//         userEmail = await SecureStore.getItemAsync('email');
//         rToken = await SecureStore.getItemAsync('refreshToken');
//         aToken = await SecureStore.getItemAsync('accessToken');
//       } catch (e) {
//         console.log(e);
//       }
//       dispatch(setNickname(nname));
//       dispatch(setEmail(userEmail));
//       dispatch(setRefreshToken(rToken));
//       dispatch(setAccessToken(aToken));
//     };
//     getToken();
//   }, [accessToken]);

//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         {accessToken == null ? (
//           <Stack.Screen
//             name='Signin'
//             component={SigninNavigation}
//             options={{ headerShown: false }}
//           ></Stack.Screen>
//         ) : (
//           <Stack.Screen name='Home' component={TabNavigation} options={{ headerShown: false }}></Stack.Screen>
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default function App() {
//   return (
//     <Provider store={Store}>
//       <PersistGate loading={null} persistor={Persistor}>
//         <AppInner />
//       </PersistGate>
//     </Provider>
//   );
// }

export default function App({ navigation }) {
  // const { nickname, email, accessToken, refreshToken } = useSelector((state) => state.userReducer);
  // const dispatch = useDispatch();

  // // const [userToken, getUserToken] = useState(null);
  // useEffect(() => {
  //   const getToken = async () => {
  //     let nname;
  //     let userEmail;
  //     let rToken;
  //     let aToken;
  //     try {
  //       nname = await SecureStore.getItemAsync('nickname');
  //       userEmail = await SecureStore.getItemAsync('email');
  //       rToken = await SecureStore.getItemAsync('refreshToken');
  //       aToken = await SecureStore.getItemAsync('accessToken');
  //     } catch (e) {
  //       console.log(e);
  //     }
  //     // await getUserToken(token);
  //     dispatch(setNickname(nname));
  //     dispatch(setEmail(userEmail));
  //     dispatch(setRefreshToken(rToken));
  //     dispatch(setAccessToken(aToken));
  //   };
  //   getToken();
  // }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={TabNavigation} options={{ headerShown: false }}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
