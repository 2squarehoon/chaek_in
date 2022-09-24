import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import styled from 'styled-components/native';

function GetNicknameScreen({ navigation, route }) {
  // useEffect(() => {
  //   console.log(route.params.email);
  // }, []);
  const [text, onChangeText] = useState('');
  const mail = route.params.email;
  const goToJob = (e) => {
    navigation.navigate('Job', { email: route.params.email, nickname: text });
  };

  return (
    <View>
      <Text>책크인에서 사용하실 닉네임을 정해주세요</Text>
      <Text>{mail}</Text>
      <FormContainer>
        <UserinfoForm onChangeText={onChangeText} placeholder='닉네임을 입력하세요' />
        <UserinfoSubmit onPress={goToJob}>
          <Text>입력</Text>
        </UserinfoSubmit>
      </FormContainer>
    </View>
  );
}

const FormContainer = styled.View`
  // margin-top: 50%;
  width: 100%;
  // flex: 2;
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

export default GetNicknameScreen;
