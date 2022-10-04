import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import { HOST } from '@env';
import BookItem from '../components/common/BookItem';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


function HomeScreen({ navigation }) {
  const { accessToken, nickname, userId } = useSelector((state) => state.main);
  const [bookNumber, changeBookNumber] = useState('');
  const [readingBooks, setReadingBooks] = useState([]);
  const [bookActive, setbookActive] = useState(0);
  useEffect(() => {
    Axios.get(`${HOST}/api/v1/books/me?isReading=true`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(function (response) {
        console.log(response.data);
        setReadingBooks(response.data.books);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // 위도, 경도 받아오기

  const goToBookLog = (e) => {
    navigation.navigate('BookLogs');
  };

  const goToBookDetail = (e) => {
    navigation.navigate('BookDetail', { bookId: bookNumber });
  };

  const goBookDetail = (bookNumber) => {
    navigation.navigate('BookDetail', { bookId: bookNumber });
  };
  const printBook = (book) => {
    console.log(book)
  }
  const onchange = (nativeEvent) => {
    if(nativeEvent) {
      const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
      if (slide != bookActive) {
        setbookActive(slide)
      }
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Text>{nickname}님의 서재</Text>
        <Text>{userId}</Text>
      </View>
      <BookItemsContainer>
      <TitleText>{nickname}님이 읽고있는 책</TitleText>
        <ScrollView 
          onScroll={({nativeEvent}) => onchange(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          >
          {readingBooks.map((book) => (
            <TouchableOpacity
            key={book.bookId}
            onPress={() => goBookDetail(book.bookId)}
            >
              <View style={styles.wrap}>
              <Image
                source={{ uri: book.cover}}
                resizeMode='stretch'
                style={styles.cover}
              >
              </Image>
              <View style={styles.textView}>
                <Text style={styles.title}>{book.title}</Text>
                <Text style={styles.author}>{book.author}</Text>
              </View>
              </View>
            </TouchableOpacity>
            // <TouchableOpacity 
            //   key={book.bookId} 
            //   onPress={() => goBookDetail(book.bookId)}>
            //     <BookItem item={book} />
            // </TouchableOpacity>
          ))}
          </ScrollView>
          <View
            style={styles.wrapDot}>
            {readingBooks.map((book, index) => (
              <Text
                key={book.bookId}
                style={bookActive == index ? styles.dotActive : styles.dot}
              >
              ●
              </Text>
            ))}
          </View>
      </BookItemsContainer>
      <View style={styles.bottomSpace}></View>
      {/* <View>
        <Button onPress={goToBookLog} title='테스트용으로 만든 책 검색페이지'></Button>
      </View>
      <View>
        <Text>책 번호 입력</Text>
        <ChangeInput value={bookNumber} onChangeText={changeBookNumber} />
      </View>
      <View>
        <Button onPress={goToBookDetail} title='책 상세정보'></Button>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcf9f0'
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  wrap: {
    width: WIDTH * 0.845,
    height: HEIGHT * 0.21,
    flexDirection: 'row',
  },
  wrapDot: {
    position: 'absolute',
    bottom: 0,
    left: 360,
    bottom: 90,
    flexDirection: 'column',
    alignSelf: 'center'
  },
  dotActive: {
    margin: 3,
    color: '#A8CA47',
  },
  dot: {
    margin: 3,
    color: 'black',
  },
  cover: {
    width: WIDTH* 0.2,
    height: HEIGHT * 0.15,
    marginLeft: 15,
    marginRight: 15,
  },
  textView: {
    width: WIDTH * 0.5,
    height: HEIGHT * 0.3,
  },
  title: {
    marginTop: 10,
    fontFamily: "Cochin",
    fontSize: 15,
    fontWeight: "bold"
  },
  author: {
    marginTop: 10,
    fontFamily: "Cochin",
    fontSize: 13,
    fontWeight: "bold"
  },
  bottomSpace: {
    left: 40,
    width: WIDTH * 0.75,
    height: 8,
    borderWidth: 0.5,
    backgroundColor: '#728EA6',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  }
});

const ChangeInput = styled.TextInput`
  width: 300px;
  height: 40px;
  border: 1px solid #000;
  border-radius: 5px;
`;

const TitleText = styled.Text`
  font-family: Light;
  font-size: 18px;
  margin-left: 8%;
  margin-top: 5%;
  margin-bottom: 5%;
`;

const BookItemsContainer = styled.View`
  margin-top: 5%;
  margin-left: 5%;
  margin-right: 10%;
  display:flex;
  border: 1px solid #000;
  border-radius: 20px;
  background-color: white;
`;
export default HomeScreen;
