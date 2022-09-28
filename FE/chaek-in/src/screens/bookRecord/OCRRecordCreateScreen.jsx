import React from 'react';
import { Alert, KeyboardAvoidingView, Text, ScrollView } from 'react-native';
import Axios from 'axios';
import { HOST } from '@env';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

const OCRRecordCreateScreen = ({ route, navigation }) => {
  const { accessToken } = useSelector((state) => state.main);
  const [text, onChangeText] = React.useState(`${route.params.OCRText}`);
  const [memoColor, setMemoColor] = React.useState('#F8DFAA');
  // const bookId = route.params.bookId;

  // 메모 작성(/api/v1/books/{bookId}/memos)
  const submitMemo = () => {
    if (accessToken) {
      const header = {
        Authorization: `Bearer ${accessToken}`,
      };
      const data = {
        content: text,
        color: memoColor,
      };
      Axios.post(`${HOST}/api/v1/books/1/memos`, data, {
        headers: header,
      })
        .then(function (response) {
          console.log(response);
          Alert.alert('저장되었습니다.');
        })
        .then(() => {
          navigation.navigate('RecordScreen');
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <Text>배경색</Text>
        <YellowPressable onPress={() => setMemoColor('#F8DFAA')}></YellowPressable>
        <GreenPressable onPress={() => setMemoColor('#A8CA47')}></GreenPressable>
        <BluePressable onPress={() => setMemoColor('#B1D8E8')}></BluePressable>
        <Text>내용</Text>
        <MemoInput
          multiline={true}
          numberOfLines={10}
          onChangeText={onChangeText}
          value={text}
          style={{ backgroundColor: memoColor }}
          placeholder={'나의 한 문장'}
        ></MemoInput>
        <ButtonContainer onPress={() => submitMemo()}>
          <Text>작성하기</Text>
        </ButtonContainer>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const MemoInput = styled.TextInput`
  width: 100%;
  height: 300px;
  background-color: #fff;
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

const YellowPressable = styled.Pressable`
  width: 30px;
  height: 30px;
  background-color: #f8dfaa;
  border-radius: 20px;
  margin: 10px 0px;
`;

const GreenPressable = styled.Pressable`
  width: 30px;
  height: 30px;
  background-color: #a8ca47;
  border-radius: 20px;
  margin: 10px 0px;
`;

const BluePressable = styled.Pressable`
  width: 30px;
  height: 30px;
  background-color: #b1d8e8;
  border-radius: 20px;
  margin: 10px 0px;
`;

export default OCRRecordCreateScreen;
