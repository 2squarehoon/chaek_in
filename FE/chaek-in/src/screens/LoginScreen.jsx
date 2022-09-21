import React, { useEffect, useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GOOGLE_EXPO_CLIENT_ID, GOOGLE_ANDROID_CLIENT_ID, GOOGLE_WEB_CLIENT_ID } from '@env';
import Axios from 'axios';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [gUser, setGUser] = useState(''); // 구글로부터 받아온 유저데이터
  const [reqError, setReqError] = useState('');
  const [isLoding, setIsLoding] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: GOOGLE_EXPO_CLIENT_ID,
    androidClientId: GOOGLE_ANDROID_CLIENT_ID,
    webClientId: GOOGLE_WEB_CLIENT_ID,
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      console.log(authentication);
      getGoogleUser(authentication.accessToken);
      giveGoogleUser(authentication.accessToken);
    }
  }, [response]);

  const getGoogleUser = async (accessToken) => {
    try {
      let gUserReq = await Axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log(gUserReq.data);
      setGUser(gUserReq.data);
    } catch (error) {
      console.log('GoogleUserReq error: ', error.response.data);
      setReqError(error.response.data);
    }
  };

  const giveGoogleUser = async (accessToken) => {
    const giveUser = await Axios.post('your-backDB-apiURL', {
      //you can edit Data sturcture
      accessToken: accessToken,
      userInfo: {
        id: JSON.stringify(gUser.id),
        email: JSON.stringify(gUser.email),
        verified_email: JSON.stringify(gUser.verified_email),
        name: JSON.stringify(gUser.name),
        given_name: JSON.stringify(gUser.given_name),
        family_name: JSON.stringify(gUser.family_name),
        picture: JSON.stringify(gUser.picture),
        locale: JSON.stringify(gUser.locale),
        hd: JSON.stringify(gUser.hd),
      },
    })
      .then((response) => {
        console.log(response.status); //To check
        storageData(); //storageData to local DB
      })
      .catch(console.error)
      .finally(() => setIsLoding(false));
  };

  const storageData = async () => {
    await AsyncStorage.setItem(
      'User',
      JSON.stringify({
        id: gUser.id,
        email: gUser.email,
        picture: gUser.picture,
      }),
      () => {
        console.log('User Info Saved!');
      },
    );
  };

  return (
    <Button
      disabled={!request}
      title='Login'
      onPress={() => {
        promptAsync();
      }}
    />
  );
}
