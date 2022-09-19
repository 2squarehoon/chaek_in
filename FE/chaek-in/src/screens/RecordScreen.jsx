import {StyleSheet, Text, View} from "react-native";

function RecordScreen () {
  return (
    <View style={styles.container}>
      <Text>독후활동</Text>
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

export default RecordScreen;