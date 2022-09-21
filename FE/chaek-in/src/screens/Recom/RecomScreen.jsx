import { StyleSheet, Text, View } from 'react-native';

function RecommendScreen() {
  return (
    <View style={styles.container}>
      <Text>추천</Text>
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

export default RecommendScreen;
