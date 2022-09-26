import React, { useEffect, useState, useRef } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { Text, View, Button, Image } from 'react-native';
import { GOOGLE_EXPO_CLIENT_ID, GOOGLE_ANDROID_CLIENT_ID, GOOGLE_WEB_CLIENT_ID } from '@env';
import Axios from 'axios';
import styled from 'styled-components/native';
import { HOST } from '@env';
// import EncryptedStorage from 'react-native-encrypted-storage';
import * as SecureStore from 'expo-secure-store';
import { useSelector, useDispatch } from 'react-redux';
import { setAccessToken, setEmail, setNickname, setRefreshToken } from '../../redux/actions';

WebBrowser.maybeCompleteAuthSession();

function LoginScreen({ navigation }) {
  const [reqError, setReqError] = useState('');
  const [userEmail, setUserEmail] = useState();
  const [isFirst, setIsFirst] = useState('');
  const [nname, setNname] = useState('');
  const [aToken, setAToken] = useState('');
  const [rToken, setRToken] = useState('');

  const { nickname, email, accessToken, refreshToken } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

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

  // 이메일 값이 갱신되면 백에 요청
  const mountedEmail = useRef(false);
  useEffect(() => {
    if (!mountedEmail.current) {
      mountedEmail.current = true;
    } else {
      requireBack(userEmail);
    }
  }, [userEmail]);

  async function save(key, value) {
    await SecureStore.setItemAsync(key, value, {});
  }

  const saveStore = async () => {
    save('accessToken', aToken);
    save('identifier', userEmail);
    save('nickname', nname);
    save('refreshToken', rToken);
    await console.log('SecureStore 저장됨');
  };

  // redux state에 저장
  const saveReduxState = () => {
    dispatch(setNickname(nname));
    dispatch(setEmail(userEmail));
    dispatch(setRefreshToken(rToken));
    dispatch(setAccessToken(aToken));
  };
  // isFirst 값이 갱신되면 실행, 처음 로그인이면 추가정보입력으로 이동, 아닐 시 SecureStore에 토큰, 정보들 저장
  useEffect(() => {
    if (isFirst) {
      navigation.navigate('Nickname', { email: userEmail });
    } else if (isFirst === false) {
      saveStore();
      saveReduxState();
    }
  }, [isFirst]);

  // 구글에 요청해서 email만 받아와서 state에 저장
  const getGoogleUser = async (accessToken) => {
    try {
      await Axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then(function (response) {
          setUserEmail(response.data.email);
        })
        .catch(function (error) {
          console.log(error);
        });
      // console.log(gUserReq.data);
      // setGUser(gUserReq.data);
      // storageData();
    } catch (error) {
      console.log('GoogleUserReq error: ', error.response.data);
      setReqError(error.response.data);
    }
  };
  // state에 저장된 email을 identifier로 써서 백에 데이터 조회
  const requireBack = async (mail) => {
    await Axios.get(`${HOST}/api/v1/members/login?identifier=${mail}`)
      .then(function (response) {
        console.log(response.data);
        setNname(response.data.nickname);
        setAToken(response.data.accessToken);
        setRToken(response.data.refreshToken);
        setIsFirst(response.data.isFirst);
      })
      .catch(function (error) {
        console.log(error);
      });
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
    </LoginContainer>
  );
}

const LoginContainer = styled.View`
  flex: 1;
  background-color: #b1d8e8;
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
