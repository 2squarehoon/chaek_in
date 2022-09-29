import styled from 'styled-components/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableOpacity } from 'react-native';
import Axios from 'axios';
import { HOST } from '@env';
import { useSelector, useDispatch } from 'react-redux';
import { setAccessToken, setEmail, setNickname, setRefreshToken } from '../../redux/actions';
import BookItem from '../../components/common/BookItem';

function MyPageScreen({ navigation }) {
  const { accessToken, nickname } = useSelector((state) => state.main);
  const dispatch = useDispatch();
  const [job, setJob] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [readingBooks, setReadingBooks] = useState([]);

  useEffect(() => {
    Axios.get(`${HOST}/api/v1/members/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(function (response) {
        setJob(response.data.job);
        setAge(response.data.age);
        setGender(response.data.gender);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    Axios.get(`${HOST}/api/v1/books/me?isReading=false`, {
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

  const Logout = async () => {
    dispatch(setNickname(''));
    dispatch(setEmail(''));
    dispatch(setRefreshToken(''));
    dispatch(setAccessToken(''));
    Alert.alert('로그아웃되었습니다.');
  };

  const quit = () => {
    Axios.delete(`${HOST}/api/v1/members/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(async function () {
        dispatch(setNickname(''));
        dispatch(setEmail(''));
        dispatch(setRefreshToken(''));
        dispatch(setAccessToken(''));
        Alert.alert('탈퇴되었습니다.');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const changePress = () => {
    navigation.navigate('ChangeUserinfo', { nickname: nickname, job: job, age: age, gender: gender });
  };

  const logoutPress = () => {
    Alert.alert('로그아웃하시겠습니까?', '', [
      { text: '아니오', style: 'cancel' },
      { text: '네', onPress: Logout },
    ]);
  };
  const quitPress = () => {
    Alert.alert('탈퇴하시겠습니까?', '', [
      { text: '아니오', style: 'cancel' },
      { text: '네', onPress: quit },
    ]);
  };

  const goLibrary = () => {
    navigation.navigate('MyLibrary');
  };

  const goBookDetail = (bookNumber) => {
    navigation.navigate('BookDetail', { bookId: bookNumber });
  };

  return (
    <MyPageContainer>
      <Text>마이페이지</Text>
      <Text>사용자 정보</Text>
      <Text>닉네임 : {nickname}</Text>
      <Text>직업 : {job}</Text>
      <Text>나이 : {age}</Text>
      <Text>성별 : {gender}</Text>
      <View>
        <Button onPress={goLibrary} title='내 서재'></Button>
      </View>
      <View>
        <Button onPress={changePress} title='회원정보수정'></Button>
      </View>
      <View>
        <Button onPress={logoutPress} title='로그아웃'></Button>
      </View>
      <View>
        <Button onPress={quitPress} title='회원탈퇴'></Button>
      </View>
      {readingBooks.map((book) => (
        <TouchableOpacity key={book.bookId} onPress={() => goBookDetail(book.bookId)}>
          <BookItem item={book} />
        </TouchableOpacity>
      ))}
    </MyPageContainer>
  );
}

const MyPageContainer = styled.View`
  background-color: #fcf9f0;
  flex: 1;
  justify-content:center
  align-items:center
`;

export default MyPageScreen;
