import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function GetAgeScreen() {
  return (
    <View style={styles.container}>
      <Text>나이</Text>
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

export default GetAgeScreen;
