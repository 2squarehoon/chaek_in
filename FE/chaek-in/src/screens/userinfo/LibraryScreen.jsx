import styled from 'styled-components/native';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import Axios from 'axios';
import { HOST } from '@env';
import { useSelector } from 'react-redux';
import BookItem from '../../components/common/BookItem';
import { MaterialIcons } from '@expo/vector-icons';

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

  const goLikeBooks = () => {
    navigation.navigate('LikeBooks');
  };

  const goBookDetail = (bookNumber) => {
    navigation.navigate('BookDetail', { bookId: bookNumber });
  };

  return (
    <LibraryContainer>
      <NextButton onPress={goReadBooks}>
        <ButtonContainer>
          <ButtonText>읽은 책 전체 보기</ButtonText>
          <MaterialIcons name='navigate-next' size={20} color='grey' />
        </ButtonContainer>
      </NextButton>
      <NextButton onPress={goLikeBooks}>
        <ButtonContainer>
          <ButtonText>내가 찜한 책</ButtonText>
          <MaterialIcons name='navigate-next' size={20} color='grey' />
        </ButtonContainer>
      </NextButton>
      <BookItemsContainer>
        {likeBooks.length > 3 && (
          <>
            <TouchableOpacity onPress={() => goBookDetail(likeBooks[0].bookId)}>
              <BookItem item={likeBooks[0]} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => goBookDetail(likeBooks[1].bookId)}>
              <BookItem item={likeBooks[1]} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => goBookDetail(likeBooks[2].bookId)}>
              <BookItem item={likeBooks[2]} />
            </TouchableOpacity>
          </>
        )}
        {likeBooks.length <= 3 &&
          likeBooks.map((book) => (
            <TouchableOpacity key={book.bookId} onPress={() => goBookDetail(book.bookId)}>
              <BookItem item={book} />
            </TouchableOpacity>
          ))}
      </BookItemsContainer>
    </LibraryContainer>
  );
}

const LibraryContainer = styled.ScrollView`
  background-color: #fcf9f0;
`;

const NextButton = styled.TouchableOpacity`
  margin-top: 5%;
  width: 80%;
`;

const ButtonText = styled.Text`
  font-size: 18px;
  margin-bottom: 1px;
  font-family: Light;
`;

const ButtonContainer = styled.View`
  margin-left: 10%
  display: flex;
  flex-flow: row wrap;
`;

const BookItemsContainer = styled.View`
  margin-top: 5%;
  margin-left: 2%
  display:flex
  flex-flow: row wrap;
`;

export default LibraryScreen;
