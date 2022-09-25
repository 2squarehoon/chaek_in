import { StyleSheet, Text, View, Alert, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { HOST } from '@env';
import * as SecureStore from 'expo-secure-store';
import SelectDropdown from 'react-native-select-dropdown';

function ChangeUserinfoScreen({ navigation, route }) {
  const accessToken = SecureStore.getItemAsync('accessToken');
  const [changeNickname, setChangeNickname] = useState(route.params.nickname);
  const [changeJob, setChangeJob] = useState(route.params.job);
  const [changeAge, setChangeAge] = useState(route.params.age);
  const [changeGender, setChangeGender] = useState(route.params.gender);

  const submitUserinfo = async () => {
    Axios.patch(`${HOST}/api/v1/members/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        nickname: changeNickname,
        job: changeJob,
        age: changeAge,
        gender: changeGender,
      }),
    })
      .then(function (response) {
        console.log(response);
        Alert.alert('변경되었습니다.');
      })
      .then(() => {
        navigation.navigate('UserinfoMain');
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      <Text>사용자 추가 정보</Text>
      <View>
        <Text>닉네임</Text>
        <TextInput value={changeNickname} onChangeText={setChangeNickname} />
      </View>
      <View>
        <Text>직업</Text>
        <TextInput value={changeJob} onChangeText={setChangeJob} />
      </View>
      <View>
        <Text>나이</Text>
        <TextInput value={changeAge} onChangeText={setChangeAge} keyboardType='number-pad' />
      </View>
      <View>
        <Text>성별</Text>
        <SelectDropdown
          data={['남성', '여성']}
          onSelect={(selectedItem, index) => {
            if (index == 0) {
              setChangeGender('MALE');
            } else {
              setChangeGender('FEMALE');
            }
          }}
        />
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

export default ChangeUserinfoScreen;
