import React, { useState } from 'react';
import { Keyboard } from 'react-native';
import styled from 'styled-components/native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

function GetNicknameScreen({ navigation, route }) {
  const [text, onChangeText] = useState('');
  const goToJob = () => {
    navigation.navigate('Job', { email: route.params.email, sub: route.params.sub, nickname: text });
  };

  return (
    <EntireContainer>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <TitleContainer>
          <TitleText>책크인에서 사용하실 닉네임을 정해주세요</TitleText>
        </TitleContainer>
        <FormContainer>
          <UserinfoForm
            value={text}
            onChangeText={onChangeText}
            placeholder='닉네임을 입력하세요'
            returnKeyType='next'
            onSubmitEditing={goToJob}
            // maxLength='10'
          />
        </FormContainer>
      </TouchableWithoutFeedback>
    </EntireContainer>
  );
}

const EntireContainer = styled.View`
  background-color: #fcf9f0;
  flex: 1;
`;

const TitleContainer = styled.View`
  margin: 30% 5% 20%;
`;

const TitleText = styled.Text`
  font-size: 35px;
`;

const FormContainer = styled.View`
  border: 1px solid #000;
  width: 90%;
  height: 58%
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

export default GetNicknameScreen;
