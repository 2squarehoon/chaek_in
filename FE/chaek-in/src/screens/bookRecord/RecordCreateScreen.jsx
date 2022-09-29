import React from 'react';
import { Alert, KeyboardAvoidingView, Text, ScrollView } from 'react-native';
import Axios from 'axios';
import { HOST } from '@env';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

const RecordCreateScreen = ({ route, navigation }) => {
  const { accessToken } = useSelector((state) => state.main);
  const [text, onChangeText] = React.useState('');
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
    <KeyboardAvoidingView
      style={{
        backgroundColor: '#FCF9F0',
        flex: 1,
      }}
    >
      <ScrollView
        style={{
          backgroundColor: '#FCF9F0',
          flex: 1,
          margin: 20,
        }}
      >
        {/* 여기에 props로 받아온 책 ID의 책 제목을 넣으면 됩니다. */}
        <TitleView>
          <TitleText>책 제목</TitleText>
        </TitleView>
        <ColorView>
          <YellowPressable onPress={() => setMemoColor('#F8DFAA')}></YellowPressable>
          <GreenPressable onPress={() => setMemoColor('#85a676')}></GreenPressable>
          <BluePressable onPress={() => setMemoColor('#8AB5BF')}></BluePressable>
        </ColorView>

        <MemoInput
          multiline={true}
          numberOfLines={10}
          onChangeText={onChangeText}
          value={text}
          style={{ backgroundColor: memoColor, borderColor: 'black', borderWidth: 1 }}
          placeholder={'나의 한 문장'}
        ></MemoInput>
        <ButtonContainer onPress={() => submitMemo()}>
          <ButtonText>작성하기</ButtonText>
        </ButtonContainer>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const TitleText = styled.Text`
  font-family: 'Bold';
  font-size: 20px;
`;

const MemoInput = styled.TextInput`
  font-family: 'Medium';
  width: 100%;
  height: 300px;
  background-color: #fff;
  border-radius: 15px;
  padding: 15px;
  margin: 10px 0px;
`;

const ButtonContainer = styled.TouchableOpacity`
  background-color: #a8ca47;
  border-radius: 20px;
  border: 1px solid black;
  padding: 10px 0px;
  margin: 5px;
  justify-content: center;
  align-items: center;
  align-self: center;
  width: 40%;
`;

const ButtonText = styled.Text`
  font-family: 'Medium';
  font-size: 16px;
`;

const YellowPressable = styled.Pressable`
  width: 30px;
  height: 30px;
  background-color: #f8dfaa;
  border-radius: 20px;
  margin: 5px;
`;

const GreenPressable = styled.Pressable`
  width: 30px;
  height: 30px;
  background-color: #85a676;
  border-radius: 20px;
  margin: 5px;
`;

const BluePressable = styled.Pressable`
  width: 30px;
  height: 30px;
  background-color: #8ab5bf;
  border-radius: 20px;
  margin: 5px;
`;

const TitleView = styled.View`
  margin: 5px;
  flex-direction: row;
`;

const ColorView = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
`;

export default RecordCreateScreen;
