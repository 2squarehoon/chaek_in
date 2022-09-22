import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function GetGenderScreen() {
  return (
    <View style={styles.container}>
      <Text>성별</Text>
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

export default GetGenderScreen;
