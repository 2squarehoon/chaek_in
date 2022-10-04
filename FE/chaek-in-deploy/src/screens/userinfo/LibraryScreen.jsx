import styled from 'styled-components/native';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, TouchableOpacity, Modal } from 'react-native';
import Axios from 'axios';
import { HOST } from '@env';
import { useSelector } from 'react-redux';
import BookItem from '../../components/common/BookItem';
import { MaterialIcons } from '@expo/vector-icons';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

function LibraryScreen({ navigation }) {
  const { accessToken } = useSelector((state) => state.main);
  const [likeBooks, setLikeBooks] = useState([]);
  const currentMonth = new Date().getMonth() + 1;
  const [month, setMonth] = useState(currentMonth);
  const [booklogs, setBooklogs] = useState([]);
  const colors = ['#5f9ea0', '#ffa500', '#f0e68c', '#a8ca47'];
  const [marking, setMarking] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [booklogId, setbooklogId] = useState('');
  const [books, setBooks] = useState([]);

  useEffect(() => {
    Axios.get(`${HOST}/api/v1/wishlist`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(function (response) {
        // console.log(response.data);
        setLikeBooks(response.data.wishlist);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    Axios.get(`${HOST}/api/v1/books/calendar`, {
      params: {
        month: month,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(function (response) {
        setBooklogs(response.data.calendarList);
        console.log(response.data.calendarList);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [month]);

  useEffect(() => {
    var markedDates = {};
    for (var i = 0; i < booklogs.length; i++) {
      var periods = [];
      booklogs[i].books.map((book, index) => {
        var obj = {};
        obj.startingDay = book.isStartDay;
        obj.endingDay = book.isEndDay;
        obj.color = colors[index % 4];
        periods.push(obj);
      });
      markedDates[`2022-${month}-${i + 1}`] = {
        periods,
      };
    }
    // console.log(markedDates);
    setMarking(markedDates);
  }, [booklogs]);

  const goReadBooks = () => {
    navigation.navigate('ReadBooks');
  };

  const goLikeBooks = () => {
    navigation.navigate('LikeBooks');
  };

  const goBookDetail = (bookNumber) => {
    navigation.navigate('BookDetail', { bookId: bookNumber });
  };

  const pressDay = (day) => {
    // console.log(booklogs[day].books);
    if (booklogs[day].books) {
      setbooklogId(day);
      setBooks(booklogs[day].books);
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <LibraryContainer>
      <NextButton onPress={goReadBooks}>
        <ButtonContainer>
          <ButtonText>읽은 책 전체 보기</ButtonText>
          <MaterialIcons name='navigate-next' size={20} color='grey' />
        </ButtonContainer>
      </NextButton>
      <Calendar
        onDayPress={(day) => {
          // console.log(booklogs[day.day - 1]);
          pressDay(day.day - 1);
        }}
        monthFormat={'yyyy년 M월'}
        onMonthChange={(month) => {
          setMonth(month.month);
          console.log('month changed', month);
        }}
        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
        onPressArrowLeft={(subtractMonth) => subtractMonth()}
        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
        onPressArrowRight={(addMonth) => addMonth()}
        // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
        disableAllTouchEventsForDisabledDays={true}
        // Enable the option to swipe between months. Default = false
        enableSwipeMonths={true}
        style={{ width: '90%', margin: '5%', borderRadius: 10, borderWidth: 1 }}
        markingType='multi-period'
        markedDates={marking}
      />
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        // presentationStyle={'pageSheet'}
        onRequestClose={() => {
          closeModal();
        }}
        onBackdropPress={() => closeModal()}
      >
        <MenuOverLay onPress={closeModal}>
          <ModalContainer>
            <ModalTitleText>
              2022년 {month}월 {booklogId + 1}일
            </ModalTitleText>
            <ModalTitleText>읽은 책 리스트</ModalTitleText>
            {books.map((book) => (
              <TouchableOpacity key={book.bookId} onPress={() => goBookDetail(book.bookId)}>
                <ModalText>{book.title}</ModalText>
              </TouchableOpacity>
            ))}
          </ModalContainer>
        </MenuOverLay>
      </Modal>

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
      <BlankContainer></BlankContainer>
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

const ModalText = styled.Text`
  margin: 5% 10%;
  font-family: Light;
  font-size: 18px;
`;

const ModalTitleText = styled.Text`
  margin: 5% 10% 0%;
  font-family: Medium;
  font-size: 20px;
`;

const MenuOverLay = styled.TouchableOpacity`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgba(102, 100, 100, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.View`
  margin: 15%;
  width: 70%;
  height: 50%;
  background-color: #ffffff;
  border-radius: 15px;
  border: 1px solid #000;
  align-items: center;
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

const BlankContainer = styled.View`
  height: 150px;
`;

export default LibraryScreen;
