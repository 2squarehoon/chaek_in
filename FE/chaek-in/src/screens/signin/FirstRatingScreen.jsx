import styled from 'styled-components/native';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, Pressable, View, Button, TouchableOpacity, Image } from 'react-native';
import Axios from 'axios';
import { HOST } from '@env';
import { useDispatch, useSelector } from 'react-redux';
import { setAccessToken, setFakeAccessToken } from '../../redux/actions';
import BookRatingItem from '../../components/common/BookRatingItem';
import { AntDesign } from '@expo/vector-icons';
import Modal from 'react-native-modal';

function FirstRatingScreen() {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('');
  const [books, setBooks] = useState([]);
  const { fakeAccessToken } = useSelector((state) => state.main);
  const AccessToken = fakeAccessToken;
  const [modalVisible, setModalVisible] = useState(false);
  const [bookTitle, setBookTitle] = useState('');
  const [bookCover, setBookCover] = useState('');

  function SearchBooks() {
    console.log(fakeAccessToken);
    if (fakeAccessToken) {
      Axios.get(`${HOST}/api/v1/books/?keyword=${keyword}`, {
        headers: {
          Authorization: `Bearer ${fakeAccessToken}`,
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

  function PressBook(title, cover) {
    setBookTitle(title);
    setBookCover(cover);
    setModalVisible(true);
    console.log('hi');
  }

  function CloseModal() {
    setBookTitle('');
    setBookCover('');
    setModalVisible(false);
  }

  function RatingBooks() {}

  async function FinishRating() {
    dispatch(setFakeAccessToken(''));
    dispatch(setAccessToken(AccessToken));
  }

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
      <BookItemsContainer>
        {books.map((book) => (
          <TouchableOpacity key={book.bookId} onPress={() => PressBook(book.title, book.cover)}>
            <BookRatingItem item={book} rating={0} />
          </TouchableOpacity>
        ))}
        <Modal
          animationType='fade'
          transparent={true}
          visible={modalVisible}
          // presentationStyle={'pageSheet'}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            // setModalVisible(!modalVisible);
            CloseModal();
          }}
          onBackdropPress={() => CloseModal()}
        >
          <ModalContainer>
            <Image source={{ uri: bookCover }} style={{ width: 80, height: 120 }} />
            <Text>{bookTitle}</Text>
          </ModalContainer>
        </Modal>
      </BookItemsContainer>
    </EntireContainer>
  );
}

const EntireContainer = styled.ScrollView`
  background-color: #fcf9f0;
  flex: 1;
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
`;

const BookItemsContainer = styled.View`
  margin-top: 5%;
  margin-left: 4%
  display:flex
  flex-flow: row wrap;
`;

const ModalContainer = styled.View`
  margin: 15%;
  width: 70%;
  height: 70%;
  background-color: #ffffff;
  border-radius: 15px;
  border: 1px solid #000;
`;

export default FirstRatingScreen;
