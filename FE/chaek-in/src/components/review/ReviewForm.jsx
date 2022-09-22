import React from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import styled from 'styled-components/native';

function ReviewForm() {
  return (
    <>
      <ReviewInputContainer>
        <ReviewInput placeholder='리뷰를 입력하세요' />
        <ButtonContainer>
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
  // padding: 0 10px;
  // position: absolute;
  // top: 10px;
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
