import styled from 'styled-components/native';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Axios from 'axios';
import { HOST } from '@env';
import { useDispatch, useSelector } from 'react-redux';
import { setAccessToken } from '../../redux/actions';
import BookItemList from '../../components/common/BookItemList';
import BookItem from '../../components/common/BookItem';
import { AntDesign } from '@expo/vector-icons';

function BookSearchScreen({ route, navigation }) {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('');
  const [books, setBooks] = useState([]);
  const { accessToken } = useSelector((state) => state.main);

  function SearchBooks() {
    console.log(accessToken);
    if (accessToken) {
      Axios.get(`${HOST}/api/v1/books/?keyword=${keyword}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then(function (response) {
          console.log(response.data.books);
          setBooks(response.data.books);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  const goBookDetail = (bookNumber) => {
    navigation.navigate('BookDetail', { bookId: bookNumber });
  };

  return (
    <EntireContainer>
      <SearchContainer>
        <SearchBar
          value={keyword}
          onChangeText={setKeyword}
          placeholder='제목이나 작가를 입력하세요'
          onSubmitEditing={SearchBooks}
        />
        <AntDesign name='search1' size={24} color='black' onPress={SearchBooks} />
      </SearchContainer>
      {/* <BookItemList books={books} /> */}
      <BookItemsContainer>
        {books.map((book) => (
          <TouchableOpacity key={book.bookId} onPress={() => goBookDetail(book.bookId)}>
            <BookItem item={book} />
          </TouchableOpacity>
        ))}
      </BookItemsContainer>
      <BlankContainer></BlankContainer>
    </EntireContainer>
  );
}

const EntireContainer = styled.ScrollView`
  background-color: #fcf9f0;
`;

const SearchContainer = styled.View`
  margin: 20% 10% 0 10%;
  flex-direction: row;
  border-bottom-color: #000000;
  border-bottom-width: 1px;
`;

const SearchBar = styled.TextInput`
  width: 90%;
  font-size: 20px;
  font-family: 'Light';
`;

const BookItemsContainer = styled.View`
  margin-top: 5%;
  margin-left: 2%
  display:flex
  flex-flow: row wrap;
`;

const BlankContainer = styled.View`
  height: 150px;
`;

export default BookSearchScreen;
