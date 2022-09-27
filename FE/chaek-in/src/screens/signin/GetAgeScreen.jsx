import React, { useState } from 'react';
import { StyleSheet, Text, View, Keyboard } from 'react-native';
import styled from 'styled-components/native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

function GetAgeScreen({ navigation, route }) {
  const [text, onChangeText] = useState('');
  const goToGender = () => {
    navigation.navigate('Gender', {
      email: route.params.email,
      nickname: route.params.nickname,
      job: route.params.job,
      age: text,
    });
  };

  return (
    <EntireContainer>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <TitleContainer>
          <TitleText>나이를 입력해주세요</TitleText>
          <TitleText> </TitleText>
        </TitleContainer>
        <FormContainer>
          <UserinfoForm
            value={text}
            onChangeText={onChangeText}
            placeholder='나이를 입력하세요'
            returnKeyType='next'
            onSubmitEditing={goToGender}
            // maxLength='3'
            keyboardType='number-pad'
          />
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
  font-size: 40px;
`;

const FormContainer = styled.View`
border: 1px solid #000;
width: 90%;
height: 67%
border-radius: 15px;
margin-left:5%
background-color: #ffffff;
`;

const UserinfoForm = styled.TextInput`
  width: 60%;
  height: 10%;
  margin-top: 10%;
  margin-left: 10%;
  border-bottom-color: #000000;
  border-bottom-width: 1px;
  font-size: 20px;
`;

export default GetAgeScreen;
