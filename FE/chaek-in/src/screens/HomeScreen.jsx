import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';

function HomeScreen({ navigation }) {
  const goToBookLog = (e) => {
    navigation.navigate('BookLogs');
  };
  const goToBookDetail = (e) => {
    navigation.navigate('BookDetail');
  };
  const goToLogin = (e) => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>서재</Text>
      </View>
      <View>
        <Button onPress={goToBookLog} title='오늘의 책'></Button>
      </View>
      <View>
        <Button onPress={goToBookDetail} title='책 상세정보'></Button>
      </View>
      <View>
        <Button onPress={goToLogin} title='로그인'></Button>
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
