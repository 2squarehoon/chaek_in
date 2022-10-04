import styled from 'styled-components/native';
import React, { useState, useReducer, useEffect } from 'react';
import { Alert, StyleSheet, Text, Pressable, View, Button, TouchableOpacity, Image } from 'react-native';
import Axios from 'axios';
import { HOST } from '@env';
import { useDispatch, useSelector } from 'react-redux';
import { setAccessToken, setFakeAccessToken } from '../../redux/actions';
import BookRatingItem from '../../components/common/BookRatingItem';
import { AntDesign } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import StarRating from 'react-native-star-rating-widget';
import Star from 'react-native-star-view';

function FirstRatingScreen() {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('');
  const [books, setBooks] = useState([]);
  const { fakeAccessToken } = useSelector((state) => state.main);
  const accessToken = fakeAccessToken;
  const [modalVisible, setModalVisible] = useState(false);
  const [bookTitle, setBookTitle] = useState('');
  const [bookCover, setBookCover] = useState('');
  const [score, setScore] = useState(0);
  const [id, setId] = useState('');
  const [idx, setIdx] = useState('');
  const [ratingArray, setRatingArray] = useState([]);

  useEffect(() => {}, [books]);

  function SearchBooks() {
    console.log(fakeAccessToken);
    if (fakeAccessToken) {
      Axios.get(`${HOST}/api/v1/books/?keyword=${keyword}`, {
        headers: {
          Authorization: `Bearer ${fakeAccessToken}`,
        },
      })
        .then(function (response) {
          console.log(response);
          console.log(response.data.books);
          var test1 = response.data.books;
          for (let i = 0; i < test1.length; i++) {
            test1[i].rating = 0;
            console.log(test1[i]);
          }
          console.log(test1);
          setBooks(test1);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  function pushList(id, score) {
    setRatingArray([...ratingArray, { bookId: id, score: score }]);
  }

  function PressBook(id, title, cover, idx) {
    setId(id);
    setBookTitle(title);
    setBookCover(cover);
    setModalVisible(true);
    setScore(0);
    setIdx(idx);
    console.log('hi');
    console.log(ratingArray);
  }

  function CloseModal() {
    setBookTitle('');
    setBookCover('');
    books[idx].rating = score;
    if (score !== 0) {
      pushList(id, score);
    }
    // setUserRatingList((prevState) => ({
    //   arrayvar: [...prevState.arrayvar, { bookId: id, score: score }],
    // }));
    setModalVisible(false);
  }

  function RatingSubmit() {
    const data = { ratings: ratingArray };
    Axios.post(`${HOST}/api/v1/reviews/me`, data, {
      headers: {
        Authorization: `Bearer ${fakeAccessToken}`,
      },
    })
      .then(function (response) {
        console.log(response);
        FinishRating();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function FinishRating() {
    dispatch(setFakeAccessToken(''));
    dispatch(setAccessToken(accessToken));
  }

  const RatingPress = () => {
    Alert.alert('제출하시겠습니까?', '', [
      { text: '아니오', style: 'cancel' },
      { text: '네', onPress: RatingSubmit },
    ]);
  };

  const starStyle = {
    Color: '#ffce31',
    width: 80,
    height: 20,
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
      <ScrollViewContainer>
        <BookItemsContainer>
          {books.map((book) => (
            <TouchableOpacity
              key={book.bookId}
              onPress={() => PressBook(book.bookId, book.title, book.cover, books.indexOf(book))}
            >
              <BookRatingItem item={book} />
              {book.rating ? <Star score={book.rating} style={starStyle} /> : <Text></Text>}
            </TouchableOpacity>
          ))}
          <Modal
            animationType='fade'
            transparent={true}
            visible={modalVisible}
            // presentationStyle={'pageSheet'}
            onRequestClose={() => {
              // setModalVisible(!modalVisible);
              CloseModal();
            }}
            onBackdropPress={() => CloseModal()}
          >
            <ModalContainer>
              <Image source={{ uri: bookCover }} style={{ width: '80%', height: '60%', margin: '10%' }} />
              <ModalText>{bookTitle}</ModalText>
              <StarRatingContainer>
                <StarRating rating={score} onChange={setScore} starSize={25} />
              </StarRatingContainer>
              <Text>{score}점</Text>
            </ModalContainer>
          </Modal>
        </BookItemsContainer>
      </ScrollViewContainer>
      <SubmitButton onPress={RatingPress}>
        <Text>제출</Text>
      </SubmitButton>
    </EntireContainer>
  );
}

const EntireContainer = styled.View`
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

const ScrollViewContainer = styled.ScrollView`
  background-color: #fcf9f0;
`;

const BookItemsContainer = styled.View`
  margin-top: 5%;
  margin-left: 2%
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
  align-items: center;
`;

const StarRatingContainer = styled.View`
  margin: 3%;
`;

const ModalText = styled.Text`
  margin: 0 10%;
`;

const SubmitButton = styled.TouchableOpacity`
  background-color: #a8ca47;
  border: 1px solid black;
  border-radius: 18px;
  position: absolute;
  right: 20px;
  bottom: 20px;
  width: 50px;
  height: 50px;
  justify-content: space-around;
  align-items: center;
`;

export default FirstRatingScreen;
