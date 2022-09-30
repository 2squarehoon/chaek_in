import { StyleSheet, Text, View, Image } from 'react-native';
import styled from 'styled-components/native';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { HOST } from '@env';
import ReviewList from '../components/review/ReviewList';
import ReviewForm from '../components/review/ReviewForm';
import { useSelector } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';

function BookDetailScreen({ route, navigation }) {
  const { accessToken } = useSelector((state) => state.main);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [score, setScore] = useState(0);
  const [cover, setCover] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [readStatus, setReadStatus] = useState('');
  // const [index, setIndex] = useState('');
  const [description, setDescription] = useState('');
  const bookId = route.params.bookId;
  console.log(bookId);
  useEffect(() => {
    Axios.get(`${HOST}/api/v1/books/${route.params.bookId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(function (response) {
        // console.log(response.data);
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setScore(Math.round(response.data.ratingScore * 10) / 10);
        setCover(response.data.cover);
        // setIndex(response.data.index);
        setDescription(response.data.description);
        setIsLiked(response.data.isLiked);
        setReadStatus(response.data.readStatus);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [isLiked, readStatus]);

  function LikeBook() {
    axios
      .post(`${HOST}/api/v1/wishlist/books/${bookId}`, '', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(function (response) {
        console.log(response);
        setIsLiked(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function DislikeBook() {
    axios
      .patch(`${HOST}/api/v1/wishlist/books/${bookId}`, '', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(function (response) {
        console.log(response);
        setIsLiked(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function GoRecord() {
    navigation.navigate('RecordScreen', { bookId: bookId });
  }

  function PressLike() {
    if (isLiked) {
      DislikeBook();
    } else {
      LikeBook();
    }
  }

  return (
    <>
      <ScrollViewContainer>
        {readStatus === 'NONE' && (
          <BeforeContainer>
            <Text>대충읽기전로고</Text>
            {isLiked ? (
              <ButtonContainer style={{ marginLeft: 'auto', marginRight: 15 }} onPress={DislikeBook}>
                <ButtonText>찜안하기</ButtonText>
              </ButtonContainer>
            ) : (
              <ButtonContainer style={{ marginLeft: 'auto', marginRight: 15 }} onPress={LikeBook}>
                <ButtonText>찜하기</ButtonText>
              </ButtonContainer>
            )}
          </BeforeContainer>
        )}
        {readStatus === 'READING' && (
          <ReadingContainer>
            <Text>대충읽고있는로고</Text>
            <ButtonContainer style={{ marginLeft: 'auto', marginRight: 15 }} onPress={GoRecord}>
              <ButtonText>나의 기록</ButtonText>
            </ButtonContainer>
          </ReadingContainer>
        )}
        {readStatus === 'COMPLETE' && (
          <AfterContainer>
            <Text>대충다읽은로고</Text>
            <ButtonContainer style={{ marginLeft: 'auto', marginRight: 15 }} onPress={GoRecord}>
              <ButtonText>나의 기록</ButtonText>
            </ButtonContainer>
          </AfterContainer>
        )}
        <ImageContainer source={cover ? { uri: cover } : null} style={{ width: 240, height: 360 }} />
        <MiddleContainer>
          <BookTitle>{title}</BookTitle>
          <Author>{author}</Author>
          <Author>
            <AntDesign name='star' size={20} color='#ffce31' /> {score}
          </Author>
          <StartTime>독서시작 : 2022.09.21 12:01</StartTime>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1, height: 1, backgroundColor: 'gray' }} />
            <View>
              <Text style={{ width: 50, textAlign: 'center', fontSize: 15 }}>소개</Text>
            </View>
            <View style={{ flex: 1, height: 1, backgroundColor: 'gray' }} />
          </View>
          <Intro>
            <Text>{description}</Text>
          </Intro>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1, height: 1, backgroundColor: 'gray' }} />
            <View>
              <Text style={{ width: 50, textAlign: 'center', fontSize: 15 }}>리뷰</Text>
            </View>
            <View style={{ flex: 1, height: 1, backgroundColor: 'gray' }} />
          </View>
        </MiddleContainer>
        <ReviewList bookId={bookId} />
        <BlackContainer></BlackContainer>
      </ScrollViewContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const BeforeContainer = styled.View`
  flex: 1;
`;

const ReadingContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const AfterContainer = styled.View`
  flex: 1;
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
  margin: 0 10% 2%;
`;

const Author = styled.Text`
  font-size: 15px;
  margin: 0% 10% 3%;
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
const BlackContainer = styled.View`
  height: 150px;
`;

export default BookDetailScreen;
