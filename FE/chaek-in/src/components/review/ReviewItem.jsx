import React from 'react';
import { Text, View, Button, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

function ReviewItem({ item, bookId }) {
  return (
    <>
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
          <TouchableOpacity>
            <Text>수정</Text>
          </TouchableOpacity>
          <TouchableOpacity>
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
