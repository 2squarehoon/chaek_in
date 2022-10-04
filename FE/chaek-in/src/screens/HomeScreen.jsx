import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import { HOST } from '@env';
import BookItem from '../components/common/BookItem';

function HomeScreen({ navigation }) {
  const { accessToken, nickname, userId } = useSelector((state) => state.main);
  const [bookNumber, changeBookNumber] = useState('');
  const [readingBooks, setReadingBooks] = useState([]);

  useEffect(() => {
    Axios.get(`${HOST}/api/v1/books/me?isReading=true`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(function (response) {
        console.log(response.data);
        setReadingBooks(response.data.books);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // 위도, 경도 받아오기

  const goToBookLog = (e) => {
    navigation.navigate('BookLogs');
  };

  const goToBookDetail = (e) => {
    navigation.navigate('BookDetail', { bookId: bookNumber });
  };

  const goBookDetail = (bookNumber) => {
    navigation.navigate('BookDetail', { bookId: bookNumber });
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>{nickname}님의 서재</Text>
        <Text>{userId}</Text>
      </View>
      <TitleText>내가 읽고있는 책</TitleText>
      <BookItemsContainer>
        {readingBooks.map((book) => (
          <TouchableOpacity key={book.bookId} onPress={() => goBookDetail(book.bookId)}>
            <BookItem item={book} />
          </TouchableOpacity>
        ))}
      </BookItemsContainer>
      {/* <View>
        <Button onPress={goToBookLog} title='테스트용으로 만든 책 검색페이지'></Button>
      </View>
      <View>
        <Text>책 번호 입력</Text>
        <ChangeInput value={bookNumber} onChangeText={changeBookNumber} />
      </View>
      <View>
        <Button onPress={goToBookDetail} title='책 상세정보'></Button>
      </View> */}
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

const ChangeInput = styled.TextInput`
  width: 300px;
  height: 40px;
  border: 1px solid #000;
  border-radius: 5px;
`;

const TitleText = styled.Text`
  font-family: Light;
  font-size: 18px;
  margin-left: 8%;
`;

const BookItemsContainer = styled.View`
  margin-top: 5%;
  margin-left: 4%
  display:flex
  flex-flow: row wrap;
`;

export default HomeScreen;
