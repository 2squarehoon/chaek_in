import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, TextInput, Alert, Button, Keyboard } from 'react-native';
import styled from 'styled-components/native';
import SelectDropdown from 'react-native-select-dropdown';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

// import { HOST } from '@env';
// import { useDispatch } from 'react-redux';
// import { setAccessToken, setEmail, setNickname, setRefreshToken } from '../../redux/actions';

function GetGenderScreen({ navigation, route }) {
  const [gender, setGender] = useState('');
  // const nickname = route.params.nickname;
  // const email = route.params.email;
  // const dispatch = useDispatch();

  const goToRating = async () => {
    await navigation.navigate('RatingSkip', {
      email: route.params.email,
      nickname: route.params.nickname,
      job: route.params.job,
      age: route.params.age,
      gender: gender,
    });
  };
  // function Signin() {
  //   axios
  //     .post(`${HOST}/api/v1/members/me`, {
  //       identifier: email,
  //       nickname: nickname,
  //       job: route.params.job,
  //       age: route.params.age,
  //       gender: gender,
  //     })
  //     .then(function (response) {
  //       console.log(response.data);
  //       dispatch(setEmail(email));
  //       dispatch(setNickname(nickname));
  //       dispatch(setRefreshToken(response.data.refreshToken));
  //       dispatch(setAccessToken(response.data.accessToken));
  //       console.log('SecureStore 저장됨');
  //     })
  //     .catch(function (error) {
  //       if (error.response) {
  //         // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
  //         console.log(email);
  //         console.log(error.response.data);
  //         console.log(error.response.status);
  //         console.log(error.response.headers);
  //       } else if (error.request) {
  //         // 요청이 이루어 졌으나 응답을 받지 못했습니다.
  //         // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
  //         // Node.js의 http.ClientRequest 인스턴스입니다.
  //         console.log(error.request);
  //       } else {
  //         // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
  //         console.log('Error', error.message);
  //       }
  //       console.log(error.config);
  //     });
  // }

  return (
    <EntireContainer>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <TitleContainer>
          <TitleText>성별을 선택해주세요</TitleText>
          <TitleText> </TitleText>
        </TitleContainer>
        <FormContainer>
          <DropdownContainer>
            <SelectDropdown
              data={['남성', '여성']}
              defaultButtonText='성별을 선택해주세요'
              onSelect={(selectedItem, index) => {
                if (selectedItem == '남성') {
                  setGender('MALE');
                  goToRating();
                } else if (selectedItem == '여성') {
                  setGender('FEMALE');
                  goToRating();
                }
              }}
              buttonStyle={{
                width: 200,
                backgroundColor: '#ffffff',
                borderBottomWidth: 1,
                borderBottomColor: '#000000',
              }}
              rowStyle={{ backgroundColor: '#fcf9f0' }}
            />
          </DropdownContainer>
          {/* <UserinfoSubmit onPress={Signin}>
          <Text>회원가입</Text>
        </UserinfoSubmit> */}
        </FormContainer>
      </TouchableWithoutFeedback>
    </EntireContainer>
  );
}

const EntireContainer = styled.View`
  background-color: #fcf9f0;
`;

const TitleContainer = styled.View`
  margin: 5% 5% 18%;
`;

const TitleText = styled.Text`
  font-size: 35px;
`;

const FormContainer = styled.View`
border: 1px solid #000;
width: 90%;
height: 67%
border-radius: 15px;
margin-left:5%
background-color: #ffffff;
`;

const DropdownContainer = styled.View`
  margin: 5% 5%;
`;

export default GetGenderScreen;
