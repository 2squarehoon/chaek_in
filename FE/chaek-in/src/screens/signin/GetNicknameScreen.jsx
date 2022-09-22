import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function GetNicknameScreen() {
  return (
    <View style={styles.container}>
      <Text>닉네임</Text>
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

export default GetNicknameScreen;
