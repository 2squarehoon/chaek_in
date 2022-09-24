import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

function HomeScreen({ navigation }) {
  const [nickname, getNickname] = useState(null);
  useEffect(() => {
    const getResult = async () => {
      let name;
      try {
        name = await SecureStore.getItemAsync('nickname');
      } catch (e) {
        console.log(e);
      }
      await getNickname(name);
    };
    getResult();
  }, []);

  const goToBookLog = (e) => {
    navigation.navigate('BookLogs');
  };
  const goToBookDetail = (e) => {
    navigation.navigate('BookDetail');
  };
  const Logout = async () => {
    await SecureStore.deleteItemAsync('identifier');
    await SecureStore.deleteItemAsync('nickname');
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>{nickname}님의 서재</Text>
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
