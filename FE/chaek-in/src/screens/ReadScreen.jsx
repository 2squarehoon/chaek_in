import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function ReadScreen() {
  return (
    <View style={styles.container}>
      <Text>ReadScreen</Text>
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

export default ReadScreen;
