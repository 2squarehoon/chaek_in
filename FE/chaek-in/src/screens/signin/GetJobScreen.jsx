import React, { useState } from 'react';
import { Keyboard } from 'react-native';
import styled from 'styled-components/native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

function GetJobScreen({ navigation, route }) {
  const [text, onChangeText] = useState('');
  const goToAge = () => {
    navigation.navigate('Age', {
      email: route.params.email,
      sub: route.params.sub,
      nickname: route.params.nickname,
      job: text,
    });
  };

  return (
    <EntireContainer>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <TitleContainer>
          <TitleText>현재 직업이</TitleText>
          <TitleText>무엇인가요?</TitleText>
        </TitleContainer>
        <FormContainer>
          <UserinfoForm
            value={text}
            onChangeText={onChangeText}
            placeholder='직업을 입력하세요'
            returnKeyType='next'
            onSubmitEditing={goToAge}
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
  margin: 5% 5% 18%;
`;

const TitleText = styled.Text`
  font-size: 35px;
  font-family: 'Medium';
`;

const FormContainer = styled.View`
  border: 1px solid #000;
  width: 90%;
  height: 70%
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
  font-family: 'Light';
`;

export default GetJobScreen;
