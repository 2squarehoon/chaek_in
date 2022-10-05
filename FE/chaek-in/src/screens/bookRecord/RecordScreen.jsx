import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components/native';
import Axios from 'axios';
import { HOST } from '@env';
import { useSelector } from 'react-redux';

function RecordScreen({ route, navigation }) {
  const { accessToken } = useSelector((state) => state.main);
  const bookId = route.params.bookId;
  const title = route.params.title;
  const [memoList, setMemoList] = useState([]);
  // 내가 쓴 메모 목록 useEffect로 불러오면 끝
  useEffect(() => {
    Axios.get(`${HOST}/api/v1/books/${bookId}/memos`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(function (response) {
        console.log(response.data);
        setMemoList(response.data.memos);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const goToRecordCreate = (e) => {
    navigation.navigate('RecordCreate', { bookId: bookId });
  };

  const goToRecordDetail = (e) => {
    // navigation.navigate('RecordDetail', { bookId: bookId, title: title });
  };

  const goToOCR = (e) => {
    navigation.navigate('OCR', { bookId: bookId });
  };

  return (
    <View style={styles.container}>
      <TitleText>{title}</TitleText>
      <ScrollViewContainer>
        {memoList.map((memo) => (
          <RecordView
            key={memo.memoId}
            item={memo}
            bookId={bookId}
            onPress={goToRecordDetail}
            title='RecordDetail'
            style={{ backgroundColor: `${memo.color}` }}
          >
            <MemoText>{memo.content}</MemoText>
          </RecordView>
        ))}
      </ScrollViewContainer>
      <WriteButton onPress={goToRecordCreate} title='RecordCreate'>
        <Text>작성</Text>
      </WriteButton>
      <OCRButton onPress={goToOCR} title='OCR'>
        <Text>카메라</Text>
      </OCRButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

const TopContainer = styled.View`
  flex: 1;
  background-color: #fff;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const TitleText = styled.Text`
  font-size: 20px
  font-family: Medium
  margin: 5% auto 3%
`;

const MemoText = styled.Text`
font-size: 15px
font-family: Light

`;

const ButtonContainer = styled.TouchableOpacity`
  background-color: #b1d8e8;
  border-radius: 15px;
  padding: 15px;
  margin: 10px 0px;
  justify-content: center;
  color: navy;
`;

const ScrollViewContainer = styled.ScrollView`
  flex: 7;
`;

const RecordView = styled.TouchableOpacity`
  // background-color: #f2d8a7;
  border-radius: 15px;
  padding: 15px;
  margin: 10px 10px;
`;

const WriteButton = styled.TouchableOpacity`
  background-color: #a8ca47;
  position: absolute;
  right: 10px;
  bottom: 100px;
  width: 50px;
  height: 50px;
  justify-content: space-around;
  align-items: center;
  border-radius: 15px;
`;

const OCRButton = styled.TouchableOpacity`
  background-color: #a8ca47;
  position: absolute;
  left: 10px;
  bottom: 100px;
  width: 50px;
  height: 50px;
  justify-content: space-around;
  align-items: center;
  border-radius: 15px;
`;

const TestText = styled.Text`
  font-size: 40px;
`;

export default RecordScreen;
