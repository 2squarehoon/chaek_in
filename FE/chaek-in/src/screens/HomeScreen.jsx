import {StyleSheet, Text, View, Button} from "react-native";

function HomeScreen ({navigation}) {
  const goToBookLog = (e) => {
    navigation.navigate("BookLogs")
  };
  const goToBookDetail = (e) => {
    navigation.navigate("BookDetail")
  };

  return (
    <>
      <View>
        <Text>서재</Text>
      </View>
      <View>
        <Button onPress={goToBookLog} title="오늘의 책"></Button>
      </View>
      <View>
        <Button onPress={goToBookDetail} title="책 상세정보"></Button>
      </View>
    </>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default HomeScreen;