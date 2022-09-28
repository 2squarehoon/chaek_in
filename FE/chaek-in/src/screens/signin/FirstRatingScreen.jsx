import styled from 'styled-components/native';
import React, { useState, useReducer } from 'react';
import { Alert, StyleSheet, Text, Pressable, View, Button, TouchableOpacity, Image } from 'react-native';
import Axios from 'axios';
import { HOST } from '@env';
import { useDispatch, useSelector } from 'react-redux';
import { setAccessToken, setFakeAccessToken } from '../../redux/actions';
import BookRatingItem from '../../components/common/BookRatingItem';
import { AntDesign } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import StarRating from 'react-native-star-rating-widget';
import axios from 'axios';

function FirstRatingScreen() {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('');
  const [books, setBooks] = useState([]);
  const { fakeAccessToken } = useSelector((state) => state.main);
  const accessToken = fakeAccessToken;
  const [modalVisible, setModalVisible] = useState(false);
  const [bookTitle, setBookTitle] = useState('');
  const [bookCover, setBookCover] = useState('');
  const [score, changeScore] = useState(0);
  const [id, setId] = useState('');
  const [ratingArray, setRatingArray] = useState([]);

  var lst = [];
  // // 계속 바뀌는 state라서 useReducer 사용 시도 실패..
  // function ratingReducer(userRating, action) {
  //   if (action.type === 'SET') {
  //     return action.rating;
  //   } else if (action.type === 'RESET') {
  //     return 0;
  //   }
  // }

  // function idReducer(bookId, action) {
  //   if (action.type === 'SET') {
  //     return action.id;
  //   } else if (action.type === 'RESET') {
  //     return '';
  //   }
  // }

  // const [rating, ratingDispatch] = useReducer(ratingReducer, 0);
  // const [id, idDispatch] = useReducer(idReducer, '');

  // function setRating() {
  //   ratingDispatch({ type: 'SET', rating: score });
  // }
  // function resetRating() {
  //   ratingDispatch({ type: 'RESET', rating: score });
  // }
  // function setId(userId) {
  //   idDispatch({ type: 'SET', id: userId });
  // }
  // function resetId() {
  //   idDispatch({ type: 'RESET' });
  // }

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

  function pushList(id, score) {
    setRatingArray([...ratingArray, { bookId: id, score: score }]);
  }

  function PressBook(id, title, cover) {
    setId(id);
    setBookTitle(title);
    setBookCover(cover);
    setModalVisible(true);
    changeScore(0);
    console.log('hi');
    console.log(ratingArray);
  }

  function CloseModal() {
    setBookTitle('');
    setBookCover('');
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
    axios
      .post(`${HOST}/api/v1/reviews/me`, data, {
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
      <SubmitButton onPress={RatingPress}>
        <Text>제출</Text>
      </SubmitButton>
      <ScrollViewContainer>
        <BookItemsContainer>
          {books.map((book) => (
            <TouchableOpacity
              key={book.bookId}
              onPress={() => PressBook(book.bookId, book.title, book.cover)}
            >
              <BookRatingItem item={book} rating={0} />
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
                <StarRating rating={score} onChange={changeScore} starSize={25} />
              </StarRatingContainer>
              <Text>{score}점</Text>
            </ModalContainer>
          </Modal>
        </BookItemsContainer>
      </ScrollViewContainer>
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
  align-items: center;
`;

const StarRatingContainer = styled.View`
  margin: 3%;
`;

const ModalText = styled.Text`
  margin: 0 10%;
`;

const SubmitButton = styled.TouchableOpacity`
  background-color: #b1d8e8;
  position: absolute;
  right: 10px;
  bottom: 10px;
  width: 50px;
  height: 50px;
  justify-content: space-around;
  align-items: center;
  border-radius: 15px;
`;

export default FirstRatingScreen;
