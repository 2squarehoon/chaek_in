import { StyleSheet, Text, View } from 'react-native';

function MeetingScreen() {
  return (
    <View style={styles.container}>
      <Text>모임</Text>
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

export default MeetingScreen;
