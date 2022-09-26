import React, { useState } from 'react';
import { Text, View, TextInput, Button, Alert } from 'react-native';
import styled from 'styled-components/native';
import Axios from 'axios';
import { HOST } from '@env';
import { useSelector } from 'react-redux';

function ReviewForm({ bookId }) {
  const { accessToken } = useSelector((state) => state.main);
  const [score, changeScore] = useState(0);
  const [comment, changeComment] = useState(0);

  const createReview = () => {
    Axios.post(`${HOST}/api/v1/books/${bookId}/reviews`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      score: score,
      comment: comment,
    })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    changeScore(0);
    changeComment('');
  };

  const createPress = () => {
    Alert.alert('삭제하시겠습니까?', '', [
      { text: '아니오', style: 'cancel' },
      { text: '네', onPress: createReview },
    ]);
  };
  return (
    <>
      <ReviewInputContainer>
        <ReviewInput
          placeholder='평점을 입력하세요'
          value={score}
          onChangeText={changeScore}
          keyboardType='number-pad'
        />
        <ReviewInput placeholder='리뷰를 입력하세요' value={comment} onChangeText={changeComment} />
        <ButtonContainer onPress={createPress}>
          <Text>Enter</Text>
        </ButtonContainer>
      </ReviewInputContainer>
    </>
  );
}

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
  width: 20%;
  border-radius: 15px;
  padding: 15px;
  margin-right: 5%;
  justify-content: center;
  align-items: center;
  color: navy;
`;

export default ReviewForm;
