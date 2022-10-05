import React, { useEffect, useState, useRef } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { Text, View, Button, Image, Alert } from 'react-native';
import { GOOGLE_EXPO_CLIENT_ID, GOOGLE_ANDROID_CLIENT_ID, GOOGLE_WEB_CLIENT_ID } from '@env';
import Axios from 'axios';
import styled from 'styled-components/native';
import { HOST } from '@env';
import { useDispatch } from 'react-redux';
import { setAccessToken, setEmail, setNickname, setRefreshToken, setUserId } from '../../redux/actions';
import * as Font from 'expo-font';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

WebBrowser.maybeCompleteAuthSession();

function LoginScreen({ navigation }) {
  // const [reqError, setReqError] = useState('');
  const [userEmail, setUserEmail] = useState();
  const [sub, setSub] = useState('');
  const [isFirst, setIsFirst] = useState('');
  const [nname, setNname] = useState('');
  const [aToken, setAToken] = useState('');
  const [rToken, setRToken] = useState('');
  const [id, setId] = useState('');

  const dispatch = useDispatch();

  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   expoClientId: GOOGLE_EXPO_CLIENT_ID,
  //   androidClientId: GOOGLE_ANDROID_CLIENT_ID,
  //   webClientId: GOOGLE_EXPO_CLIENT_ID,
  // });

  GoogleSignin.configure({
    webClientId: '1026812247328-n93fark827odru0250jd6p0ue5k73r03.apps.googleusercontent.com',
  });

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    console.log(user);
    return subscriber; // unsubscribe on unmount
  }, []);

  const onGoogleButtonPress = async () => {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
    // Alert.alert('로그인!');
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const user_sign_in = auth().signInWithCredential(googleCredential);
    user_sign_in
      .then((user) => {
        setSub(user.additionalUserInfo.profile.sub);
        setUserEmail(user.additionalUserInfo.profile.email);
        // Alert.alert(user.user.email);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(userEmail);
    // await requireBack(userEmail);
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await auth().signOut();
      setUser(null);
      // Alert.alert('로그아웃!');
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (response?.type === 'error') {
  //     const { error } = response;
  //     Alert.alert(error);
  //   }
  //   if (response?.type === 'success') {
  //     const { authentication } = response;
  //     // console.log(authentication);
  //     getGoogleUser(authentication.accessToken);
  //     // giveGoogleUser(authentication.accessToken);
  //   }
  // }, [response]);

  // 이메일 값이 갱신되면 백에 요청
  const mountedEmail = useRef(false);
  useEffect(() => {
    if (!mountedEmail.current) {
      mountedEmail.current = true;
    } else {
      requireBack(userEmail);
    }
  }, [userEmail]);

  // redux state에 저장
  const saveReduxState = () => {
    // Alert.alert('리덕스 저장');
    dispatch(setNickname(nname));
    dispatch(setEmail(userEmail));
    dispatch(setRefreshToken(rToken));
    dispatch(setUserId(id));
    dispatch(setAccessToken(aToken));
  };
  // isFirst 값이 갱신되면 실행, 처음 로그인이면 추가정보입력으로 이동, 아닐 시 redux-secureStore에 토큰, 정보들 저장
  useEffect(() => {
    if (isFirst) {
      navigation.navigate('Nickname', { email: userEmail, sub: sub });
    } else if (isFirst === false) {
      saveReduxState();
    }
  }, [isFirst]);

  // state에 저장된 email을 identifier로 써서 백에 데이터 조회
  const requireBack = async (mail) => {
    console.log(`${sub}_${mail}`);
    // console.log(id);
    const data = { id: mail, password: `${sub}_${mail}` };
    await Axios.post(`${HOST}/api/v1/members/login`, data)
      .then(function (response) {
        GoogleSignin.revokeAccess();
        auth().signOut();
        console.log(response.data);
        setNname(response.data.nickname);
        setAToken(response.data.accessToken);
        setRToken(response.data.refreshToken);
        setId(response.data.memberId);
        setIsFirst(response.data.isFirst);
        // Alert.alert('백으로 이메일 보내기');
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <LoginContainer>
      <ImageView>
        <Image
          source={require('../../../assets/image/logo.png')}
          style={{ width: '75%', marginLeft: '10%' }}
          resizeMode={'contain'}
        />
      </ImageView>

      <MiddleContainer>
        <MiddleText>책으로</MiddleText>
        <MiddleText>연결되는</MiddleText>
        <MiddleText>우리,</MiddleText>
        <MiddleText> </MiddleText>
        <MiddleText>책크인</MiddleText>
        {/* <MiddleText>{user.displayName}</MiddleText> */}
      </MiddleContainer>
      <GoogleSigninButton
        style={{ width: 250, height: 65, fontFamily: 'Medium', marginLeft: 'auto', marginRight: 'auto' }}
        onPress={onGoogleButtonPress}
      />
    </LoginContainer>
  );
}

const ImageView = styled.View`
  height: 30%;
`;

const LoginContainer = styled.View`
  flex: 1;
  background-color: #b1d8e8;
`;

const GoogleLogin = styled.TouchableOpacity`
  margin: 10% 20% 0;
  background-color: white;
  width: 60%;
  height: 9%;
  border-radius: 15px;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  border: 1px solid #000;
`;

const MiddleContainer = styled.View`
  margin-top: 40%;
  margin-left: 20%
  margin-right: auto
  margin-Bottom: 10%;
`;

const MiddleText = styled.Text`
  font-size: 20px;
  font-family: Light;
`;

const ButtonText = styled.Text`
  font-size: 16px;
  font-family: Medium;
`;

export default LoginScreen;
