import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components/native';

function RecordScreen({ route, navigation }) {
  // const bookId = route.params.bookId;
  // 내가 쓴 메모 목록 useEffect로 불러오면 끝
  // useEffect();

  const goToRecordCreate = (e) => {
    navigation.navigate('RecordCreate');
  };

  const goToRecordDetail = (e) => {
    navigation.navigate('RecordDetail');
  };

  const goToOCR = (e) => {
    navigation.navigate('OCR');
  };

  return (
    <View style={styles.container}>
      <ScrollViewContainer>
        <RecordView onPress={goToRecordDetail} title='RecordDetail'></RecordView>
      </ScrollViewContainer>
      <WriteButton onPress={goToRecordCreate} title='RecordCreate'>
        <Text>작성</Text>
      </WriteButton>
      <OCRButton onPress={goToOCR} title='OCR'>
        <Text>카메라</Text>
      </OCRButton>
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

const OCRButton = styled.TouchableOpacity`
  background-color: #b1d8e8;
  position: absolute;
  left: 10px;
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
