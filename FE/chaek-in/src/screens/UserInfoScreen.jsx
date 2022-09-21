import { StyleSheet, Text, View } from 'react-native';

function UserInfoScreen() {
  return (
    <View style={styles.container}>
      <Text>사용자 정보</Text>
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

export default UserInfoScreen;
