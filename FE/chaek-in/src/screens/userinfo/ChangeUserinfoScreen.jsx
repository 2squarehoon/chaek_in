import { StyleSheet, Text, View, Alert, TextInput, Button, Keyboard } from 'react-native';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { HOST } from '@env';
import SelectDropdown from 'react-native-select-dropdown';
import styled from 'styled-components/native';
import { useSelector, useDispatch } from 'react-redux';
import { setNickname } from '../../redux/actions';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

function ChangeUserinfoScreen({ navigation, route }) {
  const { accessToken, nickname } = useSelector((state) => state.main);
  const dispatch = useDispatch();

  const [changeNickname, setChangeNickname] = useState(nickname);
  const [changeJob, setChangeJob] = useState(route.params.job);
  const [changeAge, setChangeAge] = useState(route.params.age);
  const [changeGender, setChangeGender] = useState(route.params.gender);

  const submitUserinfo = () => {
    if (accessToken) {
      const header = {
        Authorization: `Bearer ${accessToken}`,
      };
      Axios.patch(
        `${HOST}/api/v1/members/me`,
        {
          nickname: changeNickname,
          job: changeJob,
          age: changeAge,
          gender: changeGender,
        },
        {
          headers: header,
        },
      )
        .then(function (response) {
          dispatch(setNickname(changeNickname));
          console.log(response);
          Alert.alert('변경되었습니다.');
        })
        .then(() => {
          navigation.navigate('UserinfoMain');
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const getYears = (num, start = 1) => new Array(num).fill(0).map((_, i) => start + i);

  return (
    <ChangeUserinfoContainer>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <FormEntireContainer>
          <FormContainer>
            <KeyText>닉네임</KeyText>
            <ChangeInput value={changeNickname} onChangeText={setChangeNickname} />
          </FormContainer>
          <FormContainer>
            <KeyText>직업</KeyText>
            <ChangeInput value={changeJob} onChangeText={setChangeJob} />
          </FormContainer>
          <FormContainer>
            <KeyText>나이</KeyText>
            <SelectDropdown
              data={getYears(25, 1980)}
              // defaultValue='2000'
              onSelect={(selectedItem, index) => {
                console.log(selectedItem);
                setChangeAge(selectedItem);
              }}
              defaultButtonText='태어난 연도를 선택해주세요'
              buttonStyle={{
                width: 300,
                height: 40,
                backgroundColor: '#ffffff',
                borderWidth: 1,
                borderColor: '#000000',
                // border: '1px solid #000',
                borderRadius: 5,
              }}
              buttonTextStyle={{
                fontSize: 18,
                fontFamily: 'Light',
              }}
              rowStyle={{ backgroundColor: '#fcf9f0' }}
            />
          </FormContainer>
          <FormContainer>
            <KeyText>성별</KeyText>
            <SelectDropdown
              data={['남성', '여성']}
              onSelect={(selectedItem, index) => {
                if (index == 0) {
                  setChangeGender('MALE');
                } else {
                  setChangeGender('FEMALE');
                }
              }}
              defaultButtonText='성별을 선택해주세요'
              buttonStyle={{
                width: 300,
                height: 40,
                backgroundColor: '#ffffff',
                borderWidth: 1,
                borderColor: '#000000',
                // border: '1px solid #000',
                borderRadius: 5,
              }}
              buttonTextStyle={{
                fontSize: 18,
                fontFamily: 'Light',
              }}
              rowStyle={{ backgroundColor: '#fcf9f0' }}
            />
          </FormContainer>
        </FormEntireContainer>
        <SubmitButton onPress={submitUserinfo}>
          <KeyText>제출</KeyText>
        </SubmitButton>
      </TouchableWithoutFeedback>
    </ChangeUserinfoContainer>
  );
}

const ChangeUserinfoContainer = styled.View`
  background-color: #fcf9f0;
  flex: 1;
  justify-content: center
  align-items: center
`;

const ChangeInput = styled.TextInput`
  width: 300px;
  height: 40px;
  border: 1px solid #000;
  border-radius: 5px;
  font-size: 18px;
  font-family: Light;
  background-color: #ffffff;
`;

const KeyText = styled.Text`
  font-size: 18px;
  font-family: Medium;
  margin-bottom: 1%;
`;

const FormEntireContainer = styled.View`
  margin-bottom: 20%;
`;

const FormContainer = styled.View`
  margin: 3% 0%;
`;

const SubmitButton = styled.TouchableOpacity`
  background-color: #a8ca47;
  border: 1px solid black;
  border-radius: 18px;
  position: absolute;
  right: 5px;
  bottom: 20px;
  width: 50px;
  height: 50px;
  justify-content: space-around;
  align-items: center;
`;

export default ChangeUserinfoScreen;
