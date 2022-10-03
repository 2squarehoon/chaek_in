import styled from 'styled-components/native';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Axios from 'axios';
import { HOST } from '@env';
import { useSelector } from 'react-redux';
import BookItem from '../../components/common/BookItem';

function LikeBooksListScreen({ navigation }) {
  const { accessToken } = useSelector((state) => state.main);
  const [likeBooks, setLikeBooks] = useState([]);

  useEffect(() => {
    Axios.get(`${HOST}/api/v1/wishlist`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(function (response) {
        console.log(response.data);
        setLikeBooks(response.data.wishlist);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const goBookDetail = (bookNumber) => {
    navigation.navigate('BookDetail', { bookId: bookNumber });
  };

  return (
    <LikeBooksContainer>
      <BookItemsContainer>
        {likeBooks.map((book) => (
          <TouchableOpacity key={book.bookId} onPress={() => goBookDetail(book.bookId)}>
            <BookItem item={book} />
          </TouchableOpacity>
        ))}
      </BookItemsContainer>
    </LikeBooksContainer>
  );
}

const LikeBooksContainer = styled.ScrollView`
  background-color: #fcf9f0;
`;

const BookItemsContainer = styled.View`
  margin-top: 5%;
  margin-left: 2%
  display:flex
  flex-flow: row wrap;
`;

export default LikeBooksListScreen;
