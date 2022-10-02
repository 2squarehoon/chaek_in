import React from 'react';
import styled from 'styled-components/native';

function MeetingMyBookScreen() {
  // 최근에 읽은 책 관련 모임 추천 가져오기(최근에 읽은 책이 없으면 추천 없음)
  // /api/data/meeting/recent-book/{memberId}

  return (
    <MyBookContainer>
      <MyBookTitle>내가 읽은 책</MyBookTitle>
    </MyBookContainer>
  );
}

const MyBookContainer = styled.View`
  flex: 1;
  background-color: #fcf9f0;
  padding: 0 5%;
`;

const MyBookTitle = styled.Text`
  font-size: 20px;
  font-family: 'Medium';
`;

export default MeetingMyBookScreen;
