import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

function UserAddinfoScreen() {
  return (
    <View style={styles.container}>
      <Text>사용자 추가 정보</Text>
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

export default UserAddinfoScreen;
