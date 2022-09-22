import React, { useEffect, useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { Text, View, Button, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GOOGLE_EXPO_CLIENT_ID, GOOGLE_ANDROID_CLIENT_ID, GOOGLE_WEB_CLIENT_ID } from '@env';
import Axios from 'axios';
import styled from 'styled-components/native';

WebBrowser.maybeCompleteAuthSession();

function LoginScreen() {
  const [gUser, setGUser] = useState(''); // 구글로부터 받아온 유저데이터
  const [reqError, setReqError] = useState('');
  // const [isLoding, setIsLoding] = useState(false);
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();

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
      // giveGoogleUser(authentication.accessToken);
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
      // storageData();
      setUserEmail(gUserReq.data.email);
    } catch (error) {
      console.log('GoogleUserReq error: ', error.response.data);
      setReqError(error.response.data);
    }
  };

  // const giveGoogleUser = async (accessToken) => {
  //   const giveUser = await Axios.post('your-backDB-apiURL', {
  //     //you can edit Data sturcture
  //     accessToken: accessToken,
  //     userInfo: {
  //       id: JSON.stringify(gUser.id),
  //       email: JSON.stringify(gUser.email),
  //       verified_email: JSON.stringify(gUser.verified_email),
  //       name: JSON.stringify(gUser.name),
  //       given_name: JSON.stringify(gUser.given_name),
  //       family_name: JSON.stringify(gUser.family_name),
  //       picture: JSON.stringify(gUser.picture),
  //       locale: JSON.stringify(gUser.locale),
  //       hd: JSON.stringify(gUser.hd),
  //     },
  //   })
  //     .then((response) => {
  //       console.log(response.status); //To check
  //       storageData(); //storageData to local DB
  //     })
  //     .catch(console.error)
  //     .finally(() => setIsLoding(false));
  // };

  // const storageData = async () => {
  //   await AsyncStorage.setItem(
  //     'User',
  //     JSON.stringify({
  //       id: gUser.id,
  //       name: gUser.name,
  //       email: gUser.email,
  //       picture: gUser.picture,
  //     }),
  //     () => {
  //       console.log('User Info Saved!');
  //     },
  //   );
  // };
  // const getUserName = async () => {
  //   try {
  //     AsyncStorage.getItem('User', (err, result) => {
  //       const UserInfo = JSON.parse(result);
  //       console.log(UserInfo);
  //       setUserName(UserInfo.email);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <LoginContainer>
      <Image
        source={require('../../../assets/image/logo.png')}
        style={{ width: '80%', height: '50%', marginLeft: '10%' }}
      />

      <MiddleContainer>
        <MiddleText>책으로</MiddleText>
        <MiddleText>연결되는</MiddleText>
        <MiddleText>우리,</MiddleText>
        <MiddleText> </MiddleText>
        <MiddleText>책크인</MiddleText>
      </MiddleContainer>
      <GoogleLogin
        disabled={!request}
        title='Login'
        onPress={() => {
          promptAsync();
        }}
      >
        <Text>Google로 로그인</Text>
      </GoogleLogin>
      {/* <View>
        <Text>이름 : {userName}</Text>
      </View>
      <View>
        <Button onPress={storageData} title='사용자정보저장'></Button>
      </View>

      <View>
        <Button onPress={getUserName} title='사용자이름'></Button>
      </View> */}
    </LoginContainer>
  );
}

const LoginContainer = styled.View`
  flex: 1;
  background-color: #b1d8e8;
  // justify-content: center;
  // align-items: center;
`;

const GoogleLogin = styled.TouchableOpacity`
  margin: 10% 20% 0;
  background-color: white;
  width: 60%;
  height: 10%;
  border-radius: 15px;
  justify-content: space-around;
  align-items: center;
`;

const MiddleContainer = styled.View`
  margin-left: 20%
  margin-right: auto
`;

const MiddleText = styled.Text`
  font-size: 20rem;
`;

export default LoginScreen;
