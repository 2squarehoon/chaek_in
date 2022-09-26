import React, { useState } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, TextInput, Alert, Button } from 'react-native';
import styled from 'styled-components/native';
import SelectDropdown from 'react-native-select-dropdown';
import { HOST } from '@env';
import { useDispatch } from 'react-redux';
import { setAccessToken, setEmail, setNickname, setRefreshToken } from '../../redux/actions';

function GetGenderScreen({ navigation, route }) {
  const [gender, setGender] = useState('');
  const nickname = route.params.nickname;
  const email = route.params.email;
  const dispatch = useDispatch();
  function Signin() {
    axios
      .post(`${HOST}/api/v1/members/me`, {
        identifier: email,
        nickname: nickname,
        job: route.params.job,
        age: route.params.age,
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

  return (
    <View>
      <Text>성별을 선택해주세요</Text>
      <FormContainer>
        <SelectDropdown
          data={['남성', '여성']}
          onSelect={(selectedItem, index) => {
            if (index == 0) {
              setGender('MALE');
            } else {
              setGender('FEMALE');
            }
          }}
        />
        <UserinfoSubmit onPress={Signin}>
          <Text>회원가입</Text>
        </UserinfoSubmit>
      </FormContainer>
    </View>
  );
}

const FormContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const UserinfoForm = styled.TextInput`
  width: 60%;
  height: 100%;
  border: 1px solid #000;
  border-radius: 5px;
  margin-left: 5%;
`;

const UserinfoSubmit = styled.TouchableOpacity`
  background-color: #b1d8e8;
  width: 20%;
  border-radius: 15px;
  padding: 15px;
  margin-right: 5%;
  justify-content: center;
  align-items: center;
  color: navy;
`;

export default GetGenderScreen;
