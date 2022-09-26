import { StyleSheet, Text, View, Alert, TextInput, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { HOST } from '@env';
import SelectDropdown from 'react-native-select-dropdown';
import styled from 'styled-components/native';
import { useSelector, useDispatch } from 'react-redux';
import { setNickname } from '../../redux/actions';

function ChangeUserinfoScreen({ navigation, route }) {
  const { accessToken, nickname } = useSelector((state) => state.main);
  const dispatch = useDispatch();

  const [changeNickname, setChangeNickname] = useState(nickname);
  const [changeJob, setChangeJob] = useState(route.params.job);
  const [changeAge, setChangeAge] = useState(route.params.age);
  const [changeGender, setChangeGender] = useState(route.params.gender);

  const submitUserinfo = async () => {
    if (accessToken) {
      const header = {
        Authorization: `Bearer ${accessToken}`,
      };
      Axios.patch(
        `${HOST}/api/v1/members/me`,
        {
          nickname: changeNickname,
          job: changeJob,
          age: changeAge,
          gender: changeGender,
        },
        {
          headers: header,
        },
      )
        .then(function (response) {
          dispatch(setNickname(changeNickname));
          console.log(response);
          Alert.alert('변경되었습니다.');
        })
        .then(() => {
          navigation.navigate('UserinfoMain');
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  return (
    <View style={styles.container}>
      <Text>사용자 추가 정보</Text>
      <View>
        <Text>닉네임</Text>
        <ChangeInput value={changeNickname} onChangeText={setChangeNickname} />
      </View>
      <View>
        <Text>직업</Text>
        <ChangeInput value={changeJob} onChangeText={setChangeJob} />
      </View>
      <View>
        <Text>나이</Text>
        <ChangeInput value={changeAge} onChangeText={setChangeAge} keyboardType='number-pad' />
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
      <Button onPress={submitUserinfo} title='제출'></Button>
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

const ChangeInput = styled.TextInput`
  width: 300px;
  height: 40px;
  border: 1px solid #000;
  border-radius: 5px;
`;

export default ChangeUserinfoScreen;
