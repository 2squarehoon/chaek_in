import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

function HomeScreen({ navigation }) {
  // const [nickname, getNickname] = useState('');
  // useEffect(() => {
  //   const result = SecureStore.getItemAsync('nickname');
  //   console.log(SecureStore.getItemAsync('nickname'));
  //   getNickname(result);
  // }, []);

  const getNickname = (e) => {
    console.log(SecureStore.getItemAsync('nickname'));
  };

  const goToBookLog = (e) => {
    navigation.navigate('BookLogs');
  };
  const goToBookDetail = (e) => {
    navigation.navigate('BookDetail');
  };
  // const goToLogin = (e) => {
  //   navigation.navigate('Login');
  // };

  return (
    <View style={styles.container}>
      <View>
        <Text>{}님의 서재</Text>
      </View>
      <View>
        <Button onPress={goToBookLog} title='오늘의 책'></Button>
      </View>
      <View>
        <Button onPress={goToBookDetail} title='책 상세정보'></Button>
      </View>
      <View>
        <Button onPress={getNickname} title='닉네임'></Button>
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
