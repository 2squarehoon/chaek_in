import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { HOST } from '@env';
import * as SecureStore from 'expo-secure-store';

function UserInfoScreen({ navigation }) {
  const [nickname, setNickname] = useState('');
  const [job, setJob] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  // 여기부터 토큰 불러오는 코드
  const [accessToken, getUserToken] = useState(null);
  useEffect(() => {
    const getToken = async () => {
      let token;
      try {
        token = await SecureStore.getItemAsync('accessToken');
      } catch (e) {
        console.log(e);
      }
      await getUserToken(token);
    };
    getToken();
  }, []);
  // Redux 적용되기 전까진 이 코드 무지성 복붙해서 accessToken 쓸 것

  useEffect(() => {
    if (accessToken) {
      Axios.get(`${HOST}/api/v1/members/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then(function (response) {
          setNickname(response.data.nickname);
          setJob(response.data.job);
          setAge(response.data.age);
          setGender(response.data.gender);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [accessToken]);

  const Logout = async () => {
    await SecureStore.deleteItemAsync('identifier');
    await SecureStore.deleteItemAsync('nickname');
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
    Alert.alert('로그아웃되었습니다.');
  };

  const quit = () => {
    if (accessToken) {
      Axios.delete(`${HOST}/api/v1/members/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then(async function () {
          await SecureStore.deleteItemAsync('identifier');
          await SecureStore.deleteItemAsync('nickname');
          await SecureStore.deleteItemAsync('accessToken');
          await SecureStore.deleteItemAsync('refreshToken');
          Alert.alert('탈퇴되었습니다.');
        })
        .catch(function (error) {
          console.log(error);
        });
    }
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

  return (
    <View style={styles.container}>
      <Text>사용자 정보</Text>
      <Text>닉네임 : {nickname}</Text>
      <Text>직업 : {job}</Text>
      <Text>나이 : {age}</Text>
      <Text>성별 : {gender}</Text>
      <View>
        <Button onPress={changePress} title='회원정보수정'></Button>
      </View>
      <View>
        <Button onPress={logoutPress} title='로그아웃'></Button>
      </View>
      <View>
        <Button onPress={quitPress} title='회원탈퇴'></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserInfoScreen;
