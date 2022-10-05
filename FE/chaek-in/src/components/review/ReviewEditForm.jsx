import React, { useState } from 'react';
import { Text, View, TextInput, Button, Alert } from 'react-native';
import styled from 'styled-components/native';
import Axios from 'axios';
import { HOST } from '@env';
import { useSelector } from 'react-redux';
import StarRating from 'react-native-star-rating-widget';

function ReviewEditForm({ bookId, initialScore, initialComment, reviewId, isEdit, reload }) {
  const { accessToken } = useSelector((state) => state.main);
  const [score, changeScore] = useState(initialScore);
  const [comment, changeComment] = useState(initialComment);

  const editReview = () => {
    const header = {
      Authorization: `Bearer ${accessToken}`,
    };
    if (!score) {
      Alert.alert('0점은 좀 너무하잖아요 ㅠㅠ');
    } else {
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
          reload('댓글수정');
        })
        .catch(function (error) {
          console.log(error.message);
        });
    }
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
      { text: '네', onPress: editReview },
    ]);
  };
  return (
    <ReviewEditContainer>
      <RatingContainer>
        <StarRating rating={score} onChange={changeScore} />
        <ButtonText>{score}점</ButtonText>
      </RatingContainer>
      <ReviewInputContainer>
        <ReviewInput
          placeholder='리뷰를 입력하세요'
          value={comment}
          onChangeText={(text) => changeComment(text)}
        />
        <ButtonContainer onPress={() => editPress()} color='#ffce31'>
          <ButtonText>수정</ButtonText>
        </ButtonContainer>
        <ButtonContainer onPress={cancelPress} color='#ffce31'>
          <ButtonText>취소</ButtonText>
        </ButtonContainer>
      </ReviewInputContainer>
    </ReviewEditContainer>
  );
}

const ReviewEditContainer = styled.View`
margin: 2% 5%
border: 1px solid #000;
border-radius: 5px;
background-color: #ffffff;
`;

const RatingContainer = styled.View`
  margin: 2% 0% 2% 5%
  align-items: center;
  flex-direction: row;
`;

const ReviewInput = styled.TextInput`
  width: 60%;
  height: 100%;
  border: 1px solid #000;
  border-radius: 5px;
  margin-left: 5%;
`;

const ReviewInputContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 3%;
`;

const ButtonText = styled.Text`
  font-size: 12px;
  font-family: Medium;
`;

const ButtonContainer = styled.TouchableOpacity`
  background-color: #a8ca47;
  border: 1px solid black;
  border-radius: 18px;
  width: 15%;
  padding: 10px;
  margin-right: 1%;
  justify-content: center;
  align-items: center;
  color: navy;
`;

export default ReviewEditForm;
