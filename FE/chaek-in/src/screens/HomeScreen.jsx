import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import * as Location from 'expo-location';

function HomeScreen({ navigation }) {
  const { accessToken, nickname, userId } = useSelector((state) => state.main);
  const [bookNumber, changeBookNumber] = useState('');

  // 위도, 경도 받아오기

  const goToBookLog = (e) => {
    navigation.navigate('BookLogs');
  };
  const goToBookDetail = (e) => {
    navigation.navigate('BookDetail', { bookId: bookNumber });
  };
  return (
    <View style={styles.container}>
      <View>
        <Text>{nickname}님의 서재</Text>
        <Text>{userId}</Text>
      </View>
      <View>
        <Button onPress={goToBookLog} title='테스트용으로 만든 책 검색페이지'></Button>
      </View>
      <View>
        <Text>책 번호 입력</Text>
        <ChangeInput value={bookNumber} onChangeText={changeBookNumber} />
      </View>
      <View>
        <Button onPress={goToBookDetail} title='책 상세정보'></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

const ChangeInput = styled.TextInput`
  width: 300px;
  height: 40px;
  border: 1px solid #000;
  border-radius: 5px;
`;

export default HomeScreen;
