import React, { useState } from 'react';
import { Text, View, TextInput, Button, Alert } from 'react-native';
import styled from 'styled-components/native';
import Axios from 'axios';
import { HOST } from '@env';
import { useSelector } from 'react-redux';
import StarRating from 'react-native-star-rating-widget';

function ReviewForm({ bookId, reload }) {
  const { accessToken } = useSelector((state) => state.main);
  const [score, changeScore] = useState(0);
  const [comment, changeComment] = useState(0);

  const createReview = () => {
    const header = {
      Authorization: `Bearer ${accessToken}`,
    };
    Axios.post(
      `${HOST}/api/v1/books/${bookId}/reviews`,
      {
        score: score,
        comment: comment,
      },
      {
        headers: header,
      },
    )
      .then(function (response) {
        console.log(response.data);
        reload('리뷰작성');
      })
      .catch(function (error) {
        console.log(error.message);
      });
    changeScore(0);
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
      <RatingContainer>
        <StarRating rating={score} onChange={changeScore} />
        <Text>{score}점</Text>
      </RatingContainer>
      <ReviewInputContainer>
        <ReviewInput placeholder='리뷰를 입력하세요' value={comment} onChangeText={changeComment} />
        <ButtonContainer onPress={createPress} color='#ffce31'>
          <Text>입력</Text>
        </ButtonContainer>
      </ReviewInputContainer>
    </>
  );
}

const RatingContainer = styled.View`
  margin: 2% 0% 2% 5%
  align-items: center;
  flex-direction: row;
`;

const ReviewInput = styled.TextInput`
  width: 60%;
  height: 90%;
  border: 1px solid #000;
  border-radius: 5px;
  margin-left: 5%;
`;

const ReviewInputContainer = styled.View`
  width: 100%;
  flex: 2;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const ButtonContainer = styled.TouchableOpacity`
  background-color: #b1d8e8;
  width: 18%;
  border-radius: 15px;
  padding: 15px;
  margin-right: 5%;
  justify-content: center;
  align-items: center;
  color: navy;
`;

export default ReviewForm;
