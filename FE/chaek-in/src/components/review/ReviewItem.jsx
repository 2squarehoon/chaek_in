import React from 'react';
import { Text, View, Button, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

function ReviewItem() {
  return (
    <>
      <ReviewItemContainer>
        <ReviewStarContainer>
          <Text>★★★★☆</Text>
        </ReviewStarContainer>
        <ReviewTextContainer>
          <Text>리뷰리뷰리뷰리뷰리뷰</Text>
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
