import React, { useState } from 'react';
import { Text, View, TextInput, Button, Alert } from 'react-native';
import styled from 'styled-components/native';
import Axios from 'axios';
import { HOST } from '@env';
import { useSelector } from 'react-redux';
import StarRating from 'react-native-star-rating-widget';

function ReviewEditForm({ bookId, initialScore, initialComment, reviewId, isEdit }) {
  const { accessToken } = useSelector((state) => state.main);
  const [score, changeScore] = useState(initialScore);
  const [comment, changeComment] = useState(initialComment);

  const createReview = () => {
    const header = {
      Authorization: `Bearer ${accessToken}`,
    };
    Axios.patch(
      `${HOST}/api/v1/books/${bookId}/reviews/${reviewId}`,
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
        isEdit(false);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  const onChangeCommit = (e) => {
    changeComment(e.target.value);
  };

  const cancelPress = () => {
    isEdit(false);
  };

  const editPress = () => {
    Alert.alert('수정하시겠습니까?', '', [
      { text: '아니오', style: 'cancel' },
      { text: '네', onPress: createReview },
    ]);
  };
  return (
    <>
      <RatingContainer>
        <StarRating rating={score} onChange={() => changeScore()} />
        <Text>{score}점</Text>
      </RatingContainer>
      <ReviewInputContainer>
        <ReviewInput
          placeholder='리뷰를 입력하세요'
          value={comment}
          onChangeText={(text) => changeComment(text)}
        />
        <ButtonContainer onPress={() => editPress()} color='#ffce31'>
          <Text>수정</Text>
        </ButtonContainer>
        <ButtonContainer onPress={cancelPress} color='#ffce31'>
          <Text>취소</Text>
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

export default ReviewEditForm;
