import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useSelector, useDispatch } from 'react-redux';
import { setAccessToken, setEmail, setNickname, setRefreshToken } from '../redux/actions';

function HomeScreen({ navigation }) {
  const { accessToken, nickname } = useSelector((state) => state.main);
  const dispatch = useDispatch();
  // const [nickname, getNickname] = useState(null);
  // const [accessToken, getToken] = useState(null);
  // useEffect(() => {
  //   const getResult = async () => {
  //     let name;
  //     let token;
  //     try {
  //       name = await SecureStore.getItemAsync('nickname');
  //       token = await SecureStore.getItemAsync('accessToken');
  //     } catch (e) {
  //       console.log(e);
  //     }
  //     await getNickname(name);
  //     await getToken(token);
  //   };
  //   getResult();
  // }, []);

  const goToBookLog = (e) => {
    navigation.navigate('BookLogs');
  };
  const goToBookDetail = (e) => {
    navigation.navigate('BookDetail');
  };
  const Logout = async () => {
    // await SecureStore.deleteItemAsync('identifier');
    // await SecureStore.deleteItemAsync('nickname');
    // await SecureStore.deleteItemAsync('accessToken');
    // await SecureStore.deleteItemAsync('refreshToken');
    dispatch(setNickname(''));
    dispatch(setEmail(''));
    dispatch(setRefreshToken(''));
    dispatch(setAccessToken(''));
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>{nickname}님의 서재</Text>
        <Text>토큰 : {accessToken}</Text>
      </View>
      <View>
        <Button onPress={goToBookLog} title='오늘의 책'></Button>
      </View>
      <View>
        <Button onPress={goToBookDetail} title='책 상세정보'></Button>
      </View>
      <View>
        <Button onPress={Logout} title='로그아웃'></Button>
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

export default HomeScreen;
