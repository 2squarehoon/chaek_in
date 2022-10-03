import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import styled from 'styled-components/native';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { HOST } from '@env';
import ReviewList from '../components/review/ReviewList';
import ReviewForm from '../components/review/ReviewForm';
import ReviewItem from '../components/review/ReviewItem';
import { useSelector } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import StarRating from 'react-native-star-rating-widget';
import { Entypo } from '@expo/vector-icons';

function BookDetailScreen({ route, navigation }) {
  const bookId = route.params.bookId;
  const { accessToken } = useSelector((state) => state.main);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [score, setScore] = useState(0);
  const [cover, setCover] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [readStatus, setReadStatus] = useState('');
  // const [index, setIndex] = useState('');
  const [description, setDescription] = useState('');
  const [reviews, setReviews] = useState([]);
  const [isWritten, setIsWritten] = useState(false);
  const [reload, setReload] = useState('');
  const [rating, changeRating] = useState(0);
  const [comment, changeComment] = useState(0);

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
  }, [isLiked, readStatus, reload]);

  function LikeBook() {
    Axios.post(`${HOST}/api/v1/wishlist/books/${bookId}`, '', {
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
    Axios.patch(`${HOST}/api/v1/wishlist/books/${bookId}`, '', {
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

  const link = () => {
    Linking.openURL('https://resilient-923.tistory.com/');
  };

  // 여기부터 댓글관련, 컴포넌트 나누는게 정석이긴 하지만...
  useEffect(() => {
    Axios.get(`${HOST}/api/v1/books/${bookId}/reviews`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(function (response) {
        console.log(response.data);
        setIsWritten(response.data.isWritten);
        setReviews(response.data.reviews);
        // console.log(isWritten);
        // console.log(reviews);
        console.log(reload);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [reload]);

  // 여기부터 댓글생성 컴포넌트
  const createReview = () => {
    const header = {
      Authorization: `Bearer ${accessToken}`,
    };
    Axios.post(
      `${HOST}/api/v1/books/${bookId}/reviews`,
      {
        score: rating,
        comment: comment,
      },
      {
        headers: header,
      },
    )
      .then(function (response) {
        console.log(response.data);
        setReload('리뷰작성');
      })
      .catch(function (error) {
        console.log(error.message);
      });
    changeRating(0);
    changeComment('');
  };

  const createPress = () => {
    Alert.alert('작성하시겠습니까?', '', [
      { text: '아니오', style: 'cancel' },
      { text: '네', onPress: createReview },
    ]);
  };

  return (
    <>
      <ScrollViewContainer>
        {readStatus === 'NONE' && (
          <BeforeContainer>
            <BeforeLogoContainer>
              <Image
                source={require('../../assets/image/bookStatus/not_reading.png')}
                style={{ width: 24, height: 30, marginLeft: 'auto', marginRight: 'auto' }}
              />
              <LogoText>읽기 전</LogoText>
            </BeforeLogoContainer>
            {isLiked ? (
              <LikeLogoContainer>
                <Entypo
                  name='heart'
                  size={30}
                  color='#EC3B14'
                  style={{ marginLeft: 'auto', marginRight: 'auto' }}
                  onPress={DislikeBook}
                />
                <LogoText>취소</LogoText>
              </LikeLogoContainer>
            ) : (
              <LikeLogoContainer>
                <Entypo
                  name='heart-outlined'
                  size={30}
                  color='#EC3B14'
                  style={{ marginLeft: 'auto', marginRight: 'auto' }}
                  onPress={LikeBook}
                />
                <LogoText>찜하기</LogoText>
              </LikeLogoContainer>
            )}
          </BeforeContainer>
        )}
        {readStatus === 'READING' && (
          <ReadingContainer>
            <LogoContainer>
              <Image
                source={require('../../assets/image/bookStatus/reading.png')}
                style={{ width: 40, height: 30, marginLeft: 'auto', marginRight: 'auto' }}
              />
              <LogoText>읽는 중</LogoText>
            </LogoContainer>
            <ButtonContainer style={{ marginLeft: 'auto', marginRight: 15 }} onPress={GoRecord}>
              <ButtonText>나의 기록</ButtonText>
            </ButtonContainer>
          </ReadingContainer>
        )}
        {readStatus === 'COMPLETE' && (
          <AfterContainer>
            <LogoContainer>
              <Image
                source={require('../../assets/image/bookStatus/after_reading.png')}
                style={{ width: 24, height: 30, marginLeft: 'auto', marginRight: 'auto' }}
              />
              <LogoText>독서 완료</LogoText>
            </LogoContainer>
            <ButtonContainer style={{ marginLeft: 'auto', marginRight: 15 }} onPress={GoRecord}>
              <ButtonText>나의 기록</ButtonText>
            </ButtonContainer>
          </AfterContainer>
        )}
        <ImageContainer source={cover ? { uri: cover } : null} style={{ width: 240, height: 360 }} />
        <MiddleContainer>
          <TitleText>{title}</TitleText>
          <AuthorText>{author}</AuthorText>
          <AuthorText>
            <AntDesign name='star' size={20} color='#ffce31' /> {score}
          </AuthorText>
          <BorderLineText>------------------ 책 소개 ------------------</BorderLineText>
          <AuthorText>{description}</AuthorText>
          <BorderLineText>------------------ 책 리뷰 ------------------</BorderLineText>
        </MiddleContainer>
        {/* <ReviewList bookId={bookId} /> */}
        {isWritten === false && readStatus !== 'NONE' && (
          <ReviewCreateContainer>
            <RatingContainer>
              <StarRating rating={rating} onChange={changeRating} />
              <ButtonText>{rating}점</ButtonText>
            </RatingContainer>
            <ReviewInputContainer>
              <ReviewInput placeholder='리뷰를 입력하세요' value={comment} onChangeText={changeComment} />
              <ButtonContainer onPress={createPress} color='#ffce31'>
                <ButtonText>입력</ButtonText>
              </ButtonContainer>
            </ReviewInputContainer>
          </ReviewCreateContainer>
        )}
        {reviews.map((review) => (
          <ReviewItem key={review.reviewId} item={review} bookId={bookId} reload={setReload} />
        ))}
        <BlankContainer></BlankContainer>
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
  flex-direction: row;
  align-items: center;
`;

const ReadingContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const AfterContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const BeforeLogoContainer = styled.View`
  margin: 5% auto 5% 5%;
  aligh-items: center;
  justify-content: center;
`;

const LikeLogoContainer = styled.View`
  margin: 5% 5% 5% auto;
  aligh-items: center;
  justify-content: center;
`;

const LogoContainer = styled.View`
  margin: 5%;
  aligh-items: center;
  justify-content: center;
`;

const LogoText = styled.Text`
  margin-top: 2px;
  font-size: 10px;
  font-family: Light;
  margin-left: auto;
  margin-right: auto;
`;

const ButtonContainer = styled.TouchableOpacity`
  background-color: #a8ca47;
  border: 1px solid black;
  border-radius: 18px;
  width: 20%;
  padding: 15px;
  margin: 10px 0px;
  justify-content: center;
  align-items: center;
  color: navy;
`;

const ButtonText = styled.Text`
  font-size: 12px;
  font-family: Medium;
`;

const ImageContainer = styled.Image`
  margin: 0% auto 5%;
`;

const MiddleContainer = styled.View`
  align-items: center;
`;

const TitleText = styled.Text`
  font-size: 20px;
  margin: 0 10% 2%;
  font-family: Medium;
`;

const AuthorText = styled.Text`
  font-size: 15px;
  margin: 0% 10% 3%;
  font-family: Light;
`;

const BorderLineText = styled.Text`
  font-size: 15px;
  font-family: Light;
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
  background-color: #fcf9f0;
  flex: 7;
`;
const BlankContainer = styled.View`
  height: 150px;
`;

const ReviewCreateContainer = styled.View`
margin: 2% 5%
border: 1px solid #000;
border-radius: 5px;
`;

const RatingContainer = styled.View`
  margin: 2% 0% 0% 5%
  align-items: center;
  flex-direction: row;
`;

const ReviewInput = styled.TextInput`
  width: 65%;
  height: 70%;
  border: 1px solid #000;
  border-radius: 5px;
  margin-left: 5%;
  font-size: 15px;
  font-family: Light;
`;

const ReviewInputContainer = styled.View`
  width: 100%;
  flex: 2;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export default BookDetailScreen;
