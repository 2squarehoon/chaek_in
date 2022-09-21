import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

const RecordCreateScreen = () => {
  const [text, onChangeText] = React.useState('Useless Text');

  return (
    <View>
      <Text>제목</Text>
      <TitleInput value={text} onChangeText={onChangeText}></TitleInput>
      <Text>내용</Text>
      <TitleInput value={text} onChangeText={onChangeText}></TitleInput>
      <ButtonContainer>
        <Text>작성.</Text>
      </ButtonContainer>
    </View>
  );
};

const TitleInput = styled.TextInput`
  width: 100%;
  height: 50px;
  background-color: #fff;
  border: 1px solid #000;
  border-radius: 15px;
  padding: 10px;
  margin: 10px 0px;
`;

const ButtonContainer = styled.TouchableOpacity`
  background-color: #b1d8e8;
  border-radius: 15px;
  padding: 15px;
  margin: 10px 0px;
  justify-content: center;
  color: navy;
`;

export default RecordCreateScreen;
