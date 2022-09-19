import {StyleSheet, Text, View} from "react-native";

function BookLogScreen () {
  return (
    <View style={styles.container}>
      <Text>오늘의 책</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default BookLogScreen;