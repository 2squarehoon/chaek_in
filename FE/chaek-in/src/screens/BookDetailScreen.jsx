import {StyleSheet, Text, View} from "react-native";

function BookDetailScreen () {
  return (
    <View style={styles.container}>
      <Text>책 상세정보</Text>
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

export default BookDetailScreen;