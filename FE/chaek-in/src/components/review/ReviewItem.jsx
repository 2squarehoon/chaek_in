import React, { useState, useEffect } from 'react';
import { Text, View, Button, TouchableOpacity, Alert } from 'react-native';
import styled from 'styled-components/native';
import Axios from 'axios';
import { HOST } from '@env';
import { useSelector } from 'react-redux';
import ReviewEditForm from './ReviewEditForm';

function ReviewItem({ item, bookId }) {
  const { accessToken } = useSelector((state) => state.main);
  const [isEditing, setIsEditing] = useState(false);
  // useEffect(() => {
  //   console.log(isEditing);
  // }, [isEditing]);

  const deleteReview = () => {
    Axios.delete(`${HOST}/api/v1/books/${bookId}/reviews/${item.reviewId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(function () {
        Alert.alert('삭제되었습니다.');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // const EditPress = () => {
  //   Alert.alert('수정하시겠습니까?', '', [
  //     { text: '아니오', style: 'cancel' },
  //     { text: '네', onPress: setIsEditing(true) },
  //   ]);
  // };

  const editHandler = (state) => {
    setIsEditing(state);
    // console.log(state);
    // console.log(isEditing);
  };

  const deletePress = () => {
    Alert.alert('삭제하시겠습니까?', '', [
      { text: '아니오', style: 'cancel' },
      { text: '네', onPress: deleteReview },
    ]);
  };

  return (
    <>
      {isEditing === true && (
        <ReviewEditForm
          bookId={bookId}
          initialScore={item.score}
          initialComment={item.comment}
          reviewId={item.reviewId}
          isEdit={setIsEditing}
        />
      )}
      <ReviewItemContainer>
        <ReviewStarContainer>
          <Text>{item.score} 점</Text>
        </ReviewStarContainer>
        <ReviewTextContainer>
          <Text>작성자 : {item.writer}</Text>
        </ReviewTextContainer>
        <ReviewTextContainer>
          <Text>{item.comment}</Text>
        </ReviewTextContainer>
        <ReviewControlContainer>
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Text>수정</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deletePress}>
            <Text>삭제</Text>
          </TouchableOpacity>
        </ReviewControlContainer>
      </ReviewItemContainer>
    </>
  );
}

const ReviewItemContainer = styled.View`
  width: 86%;
  margin: 3% 7%;
  flex: 2;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const ReviewStarContainer = styled.View`
  width: 25%;
`;
const ReviewTextContainer = styled.View`
  width: 55%;
`;

const ReviewControlContainer = styled.View`
  width: 20%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export default ReviewItem;
