import styled from 'styled-components/native';
import React, { useState } from 'react';
import Axios from 'axios';
import { HOST } from '@env';
import { useDispatch, useSelector } from 'react-redux';
import {
  setAccessToken,
  setEmail,
  setNickname,
  setRefreshToken,
  setFakeAccessToken,
} from '../../redux/actions';

function FirstRatingSkipScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const nickname = route.params.nickname;
  const email = route.params.email;
  const job = route.params.job;
  const age = route.params.age;
  const gender = route.params.gender;

  // 그냥 일반적인 로그인
  function SkipSignin() {
    console.log(age);
    console.log(gender);
    Axios.post(`${HOST}/api/v1/members/me`, {
      identifier: email,
      nickname: nickname,
      job: job,
      age: age,
      gender: gender,
    })
      .then(function (response) {
        console.log(response.data);
        dispatch(setEmail(email));
        dispatch(setNickname(nickname));
        dispatch(setRefreshToken(response.data.refreshToken));
        dispatch(setAccessToken(response.data.accessToken));
        console.log('SecureStore 저장됨');
      })
      .catch(function (error) {
        if (error.response) {
          // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
          console.log(email);
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // 요청이 이루어 졌으나 응답을 받지 못했습니다.
          // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
          // Node.js의 http.ClientRequest 인스턴스입니다.
          console.log(error.request);
        } else {
          // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  }

  // 최상단에서 store 안의 accessToken의 유무로 분기하므로 로그인해서 accessToken을 받되 스토어에 넣어 상태관리를 하는 것은 다음 단계로 미룬다.
  async function Signin() {
    Axios.post(`${HOST}/api/v1/members/me`, {
      identifier: email,
      nickname: nickname,
      job: job,
      age: age,
      gender: gender,
    })
      .then(function (response) {
        console.log(response.data);
        dispatch(setFakeAccessToken(response.data.accessToken));
        dispatch(setEmail(email));
        dispatch(setNickname(nickname));
        dispatch(setRefreshToken(response.data.refreshToken));
        // dispatch(setAccessToken(response.data.accessToken));
        console.log('SecureStore 저장됨(AccessToken 빼고)');
      })
      .catch(function (error) {
        if (error.response) {
          // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
          console.log(email);
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // 요청이 이루어 졌으나 응답을 받지 못했습니다.
          // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
          // Node.js의 http.ClientRequest 인스턴스입니다.
          console.log(error.request);
        } else {
          // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  }

  const goToGetData = async () => {
    await Signin();
    await navigation.navigate('Rating');
  };

  return (
    <EntireContainer>
      <TitleContainer>
        <TitleText>{nickname}님이</TitleText>
        <TitleText>좋아하는 책이</TitleText>
        <TitleText>궁금해요!</TitleText>
      </TitleContainer>
      <MiddleContainer>
        <MiddleText>* {nickname}님의 책 선호 데이터는</MiddleText>
        <MiddleText>책 추천에 활용돼요.</MiddleText>
      </MiddleContainer>
      <NextButton onPress={goToGetData}>
        <ButtonText>평점 남기러 가기</ButtonText>
      </NextButton>
      <SkipButton onPress={SkipSignin}>
        <SkipText>SKIP하기</SkipText>
      </SkipButton>
    </EntireContainer>
  );
}

const EntireContainer = styled.View`
  background-color: #fcf9f0;
  flex: 1;
`;

const TitleContainer = styled.View`
  margin: 40% 10% 15%;
`;

const TitleText = styled.Text`
  font-size: 40px;
`;

const MiddleContainer = styled.View`
  margin-left: 10%;
  margin-bottom: 10%;
`;

const MiddleText = styled.Text`
  font-size: 25px;
  color: #979590;
`;

const NextButton = styled.TouchableOpacity`
  margin: 10% 20% 0;
  background-color: white;
  width: 60%;
  height: 10%;
  border-radius: 15px;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  border: 1px solid #000;
`;

const ButtonText = styled.Text`
  font-size: 20px;
`;

const SkipButton = styled.TouchableOpacity`
  margin: 20% 10% 0;
`;

const SkipText = styled.Text`
  font-size: 15px;
  color: #979590;
`;
export default FirstRatingSkipScreen;
