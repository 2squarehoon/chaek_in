import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import styled from 'styled-components/native';

function GetAgeScreen({ navigation, route }) {
  const [text, onChangeText] = useState('');
  const goToGender = (e) => {
    navigation.navigate('Gender', {
      email: route.params.email,
      nickname: route.params.nickname,
      job: route.params.job,
      age: text,
    });
  };

  return (
    <View>
      <Text>나이를 입력해주세요</Text>
      <FormContainer>
        <UserinfoForm onChangeText={onChangeText} placeholder='나이를 입력하세요' keyboardType='number-pad' />
        <UserinfoSubmit onPress={goToGender}>
          <Text>입력</Text>
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

export default GetAgeScreen;
