import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { HOST } from '@env';
import { useSelector, useDispatch } from 'react-redux';
import { setAccessToken, setEmail, setNickname, setRefreshToken } from '../../redux/actions';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

function UserInfoScreen({ navigation }) {
  const { accessToken, nickname } = useSelector((state) => state.main);
  const dispatch = useDispatch();

  const [job, setJob] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

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
    try {
      await GoogleSignin.revokeAccess();
      await auth().signOut();
      console.log('로그아웃!');
    } catch (error) {
      console.log(error);
    }
    dispatch(setNickname(''));
    dispatch(setEmail(''));
    dispatch(setRefreshToken(''));
    dispatch(setAccessToken(''));
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
          dispatch(setNickname(''));
          dispatch(setEmail(''));
          dispatch(setRefreshToken(''));
          dispatch(setAccessToken(''));
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
