import React, { useEffect, useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { Text, View, Button, Image } from 'react-native';
import { GOOGLE_EXPO_CLIENT_ID, GOOGLE_ANDROID_CLIENT_ID, GOOGLE_WEB_CLIENT_ID } from '@env';
import Axios from 'axios';
import styled from 'styled-components/native';
import { HOST } from '@env';
// import EncryptedStorage from 'react-native-encrypted-storage';
import * as SecureStore from 'expo-secure-store';

WebBrowser.maybeCompleteAuthSession();

function LoginScreen({ navigation }) {
  const [gUser, setGUser] = useState(''); // 구글로부터 받아온 유저데이터
  const [reqError, setReqError] = useState('');
  // const [isLoding, setIsLoding] = useState(false);
  const [userEmail, setUserEmail] = useState();
  const [isFirst, setIsFirst] = useState('');
  const [nname, setNickname] = useState('');
  const [aToken, setAccessToken] = useState('');
  const [rToken, setRefreshToken] = useState('');

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: GOOGLE_EXPO_CLIENT_ID,
    androidClientId: GOOGLE_ANDROID_CLIENT_ID,
    webClientId: GOOGLE_WEB_CLIENT_ID,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      // console.log(authentication);
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
      })
        .then(function (response) {
          setUserEmail(response.data.email);
          console.log(userEmail);
        })
        .then(function () {
          Axios.get(`${HOST}/api/v1/members/login?identifier=${userEmail}`)
            .then(function (response) {
              console.log(response.data);
              setIsFirst(response.data.isFirst);
              setNickname(response.data.nickname);
              setAccessToken(response.data.accessToken);
              setRefreshToken(response.data.refreshToken);
            })
            .then(async function () {
              if (isFirst === false) {
                await SecureStore.setItemAsync('identifier', userEmail);
                await SecureStore.setItemAsync('nickname', nname);
                await SecureStore.setItemAsync('accessToken', aToken);
                await SecureStore.setItemAsync('refreshToken', rToken);
                console.log('SecureStore 저장됨');
              } else {
                goToNickname();
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        });
      // console.log(gUserReq.data);
      // setGUser(gUserReq.data);
      // storageData();
    } catch (error) {
      console.log('GoogleUserReq error: ', error.response.data);
      setReqError(error.response.data);
    }
  };
  const goToNickname = (e) => {
    navigation.navigate('Nickname', { email: userEmail });
  };
  const getNickname = async () => {
    const getnick = await SecureStore.getItemAsync('identifier');
    console.log(getnick);
  };

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
      <View>
        <Button onPress={getNickname} title='닉네임'></Button>
      </View>
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
  font-size: 20px;
`;

export default LoginScreen;
