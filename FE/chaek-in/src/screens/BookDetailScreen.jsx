import { StyleSheet, Text, View, Image } from 'react-native';
import styled from 'styled-components/native';
import React from 'react';
import ReviewList from '../components/review/ReviewList';

function BookDetailScreen() {
  return (
    <>
      <ScrollViewContainer>
        <BeforeContainer>
          <ButtonContainer style={{ marginLeft: 'auto', marginRight: 15 }}>
            <ButtonText>찜하기</ButtonText>
          </ButtonContainer>
        </BeforeContainer>
        <ReadingContainer>
          <ButtonContainer style={{ marginRight: 'auto', marginLeft: 15 }}>
            <ButtonText>읽기 종료</ButtonText>
          </ButtonContainer>
          <ButtonContainer style={{ marginLeft: 'auto', marginRight: 15 }}>
            <ButtonText>나의 기록</ButtonText>
          </ButtonContainer>
        </ReadingContainer>
        <AfterContainer>
          <ButtonContainer>
            <ButtonText>내 기록 보기</ButtonText>
          </ButtonContainer>
          <ButtonContainer>
            <ButtonText>독후감 작성</ButtonText>
          </ButtonContainer>
          <ButtonContainer>
            <ButtonText>독후감 보기</ButtonText>
          </ButtonContainer>
        </AfterContainer>
        <ImageContainer
          source={{ uri: 'https://image.yes24.com/goods/21508428/XL' }}
          style={{ width: 240, height: 360 }}
        />
        <MiddleContainer>
          <BookTitle>스티브 잡스</BookTitle>
          <Author>재레드 다이아몬드 지음</Author>
          <StartTime>독서시작 : 2022.09.21 12:01</StartTime>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1, height: 1, backgroundColor: 'gray' }} />
            <View>
              <Text style={{ width: 50, textAlign: 'center', fontSize: 15 }}>소개</Text>
            </View>
            <View style={{ flex: 1, height: 1, backgroundColor: 'gray' }} />
          </View>
          <Intro>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
              voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
              non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
          </Intro>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1, height: 1, backgroundColor: 'gray' }} />
            <View>
              <Text style={{ width: 50, textAlign: 'center', fontSize: 15 }}>목차</Text>
            </View>
            <View style={{ flex: 1, height: 1, backgroundColor: 'gray' }} />
          </View>
          <Intro>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
              voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
              non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
          </Intro>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1, height: 1, backgroundColor: 'gray' }} />
            <View>
              <Text style={{ width: 50, textAlign: 'center', fontSize: 15 }}>리뷰</Text>
            </View>
            <View style={{ flex: 1, height: 1, backgroundColor: 'gray' }} />
          </View>
        </MiddleContainer>
        <ReviewList />
      </ScrollViewContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

const BeforeContainer = styled.View`
  flex: 1;
`;

const ReadingContainer = styled.View`
  flex: 1;
  // background-color: #fff;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const AfterContainer = styled.View`
  flex: 1;
  // background-color: #fff;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const ButtonContainer = styled.TouchableOpacity`
  background-color: #b1d8e8;
  width: 25%;
  border-radius: 15px;
  padding: 15px;
  margin: 10px 0px;
  justify-content: center;
  align-items: center;
  color: navy;
`;

const ButtonText = styled.Text`
  font-size: 12px;
`;

const ImageContainer = styled.Image`
  margin: 3% auto 5% auto;
`;

const MiddleContainer = styled.View`
  align-items: center;
`;

const BookTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 2%;
`;

const Author = styled.Text`
  font-size: 15px;
  margin-bottom: 2%;
`;

const StartTime = styled.Text`
  font-size: 15px;
  margin-bottom: 2%;
`;

const Intro = styled.View`
  margin: 3% 10%;
`;

const ScrollViewContainer = styled.ScrollView`
  flex: 7;
`;

export default BookDetailScreen;
