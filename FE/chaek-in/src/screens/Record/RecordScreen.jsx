import { StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components/native';

function RecordScreen({ navigation }) {
  const goToRecordCreate = (e) => {
    navigation.navigate('RecordCreate');
  };

  const goToRecordDetail = (e) => {
    navigation.navigate('RecordDetail');
  };

  return (
    <View style={styles.container}>
      <TopContainer>
        <ButtonContainer>
          <Text>전체 독후감</Text>
        </ButtonContainer>
        <ButtonContainer>
          <Text>인기 독후감</Text>
        </ButtonContainer>
        <ButtonContainer>
          <Text>내 독후감</Text>
        </ButtonContainer>
      </TopContainer>
      <ScrollViewContainer>
        <RecordView onPress={goToRecordDetail} title='RecordDetail'>
          <TestText>독후감들</TestText>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
            in culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </RecordView>
        <RecordView>
          <Text>독후감들</Text>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
            in culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </RecordView>
        <RecordView>
          <Text>독후감들</Text>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
            in culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </RecordView>
      </ScrollViewContainer>
      <WriteButton onPress={goToRecordCreate} title='RecordCreate'>
        <Text>작성</Text>
      </WriteButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

const TopContainer = styled.View`
  flex: 1;
  background-color: #fff;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const ButtonContainer = styled.TouchableOpacity`
  background-color: #b1d8e8;
  border-radius: 15px;
  padding: 15px;
  margin: 10px 0px;
  justify-content: center;
  color: navy;
`;

const ScrollViewContainer = styled.ScrollView`
  flex: 7;
`;

const RecordView = styled.TouchableOpacity`
  background-color: #f2d8a7;
  border-radius: 15px;
  padding: 15px;
  margin: 10px 10px;
`;

const WriteButton = styled.TouchableOpacity`
  background-color: #b1d8e8;
  position: absolute;
  right: 10px;
  bottom: 10px;
  width: 50px;
  height: 50px;
  justify-content: space-around;
  align-items: center;
  border-radius: 15px;
`;

const TestText = styled.Text`
  font-size: 40px;
`;

export default RecordScreen;
