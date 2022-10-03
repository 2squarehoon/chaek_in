import styled from 'styled-components/native';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Axios from 'axios';
import { HOST } from '@env';
import { useSelector } from 'react-redux';
import BookItem from '../../components/common/BookItem';

function ReadBooksListScreen({ navigation }) {
  const { accessToken } = useSelector((state) => state.main);
  const [readBooks, setreadBooks] = useState([]);

  useEffect(() => {
    Axios.get(`${HOST}/api/v1/books/me?isReading=true`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(function (response) {
        console.log(response.data);
        setreadBooks(response.data.books);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const goBookDetail = (bookNumber) => {
    navigation.navigate('BookDetail', { bookId: bookNumber });
  };

  return (
    <ReadBooksContainer>
      <BookItemsContainer>
        {readBooks.map((book) => (
          <TouchableOpacity key={book.bookId} onPress={() => goBookDetail(book.bookId)}>
            <BookItem item={book} />
          </TouchableOpacity>
        ))}
      </BookItemsContainer>
    </ReadBooksContainer>
  );
}

const ReadBooksContainer = styled.ScrollView`
  background-color: #fcf9f0;
`;

const BookItemsContainer = styled.View`
  margin-top: 5%;
  margin-left: 2%
  display:flex
  flex-flow: row wrap;
`;

export default ReadBooksListScreen;
