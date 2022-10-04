import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { HOST } from '@env';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { StyleSheet, Text, View } from 'react-native';

function SimilarPeopleScreen({ navigation }) {
  const { accessToken, userId } = useSelector((state) => state.main);
  const [bookList, setBookList] = useState([]);

  // /api/data/books/cf/{memberId} : 나와 비슷한 사람들이 좋아하는 책 추천
  useEffect(() => {
    Axios.get(`${HOST}/api/data/books/cf/70`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(function (response) {
        console.log(response);
        setBookList(response.data.cfBooks);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [accessToken, userId]);

  return (
    <CFBooksView>
      <CFItemView>
        {bookList ? (
          bookList.map((book) => (
            <CFBookItem key={book.id} onPress={() => navigation.navigate('BookDetail', { bookId: book.id })}>
              <CFBookCoverImage source={{ uri: book.cover }} />
              <CFBookTitleText>{book.title}</CFBookTitleText>
              <CFBookAuthorText>{book.author}</CFBookAuthorText>
            </CFBookItem>
          ))
        ) : (
          <Text>추천할 만한 책이 없습니다.</Text>
        )}
      </CFItemView>
    </CFBooksView>
  );
}

const CFBooksView = styled.ScrollView`
  flex: 1;
  background-color: #fcf9f0;
`;

const CFItemView = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`;

const CFBookItem = styled.TouchableOpacity`
  width: 150px;
  height: 250px;
  margin: 10px;
  border: 1px solid grey;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: white;
  overflow: hidden;
`;

const CFBookCoverImage = styled.Image`
  width: 100px;
  height: 150px;
  border-radius: 10px;
`;

const CFBookTitleText = styled.Text`
  font-size: 12px;
  font-family: Medium;
  margin-top: 10px;
`;

const CFBookAuthorText = styled.Text`
  font-size: 10px;
  font-family: Medium;
  color: #999999;
  margin-top: 5px;
`;

export default SimilarPeopleScreen;
