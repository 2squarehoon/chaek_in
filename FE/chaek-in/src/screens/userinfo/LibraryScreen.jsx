import styled from 'styled-components/native';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import Axios from 'axios';
import { HOST } from '@env';
import { useSelector } from 'react-redux';
import BookItem from '../../components/common/BookItem';

function LibraryScreen({ navigation }) {
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

  const goReadBooks = () => {
    navigation.navigate('ReadBooks');
  };

  const goBookDetail = (bookNumber) => {
    navigation.navigate('BookDetail', { bookId: bookNumber });
  };

  return (
    <LibraryContainer>
      <Text>내 서재</Text>
      <Text>대충 달력</Text>
      <View>
        <Button onPress={goReadBooks} title='내가 읽은 책'></Button>
      </View>
      {likeBooks.map((book) => (
        <TouchableOpacity key={book.bookId} onPress={() => goBookDetail(book.bookId)}>
          <BookItem item={book} />
        </TouchableOpacity>
      ))}
    </LibraryContainer>
  );
}

const LibraryContainer = styled.View`
  background-color: #fcf9f0;
  flex: 1;
  justify-content:center
  align-items:center
`;

export default LibraryScreen;
