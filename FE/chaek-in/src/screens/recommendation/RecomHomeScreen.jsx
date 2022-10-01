import React from 'react';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';

function RecomHomeScreen({ navigation }) {
  const { nickname } = useSelector((state) => state.main);

  return (
    <BookRecomView>
      <CBFView onPress={() => navigation.navigate('SimilarBookRecom')}>
        <CBFImage source={require('../../../assets/image/bookRecom/BookRecom.png')} />
        <CBFText>
          {nickname}님이{'\n'}좋아할 만한 책
        </CBFText>
      </CBFView>
      <CFView onPress={() => navigation.navigate('SimilarPeople')}>
        <CFImage source={require('../../../assets/image/bookRecom/PeopleRecom.png')} />
        <CFText>{nickname}님과 비슷한 사람들이 좋아할 책</CFText>
      </CFView>
    </BookRecomView>
  );
}

const CBFView = styled.TouchableOpacity`
  flex: 1;
  flex-direction: column;
  position: absolute;
  width: 150px;
  top: 100px;
  left: 30px;
  align-items: center;
`;
const CFView = styled.TouchableOpacity`
  flex: 1;
  flex-direction: column;
  position: absolute;
  width: 150px;
  bottom: 200px;
  right: 30px;
  align-items: center;
`;

const BookRecomView = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: #fcf9f0;
  padding: 0 5%;
`;

const CBFText = styled.Text`
  font-size: 16px;
  font-family: Medium;
`;

const CFText = styled.Text`
  font-size: 16px;
  font-family: Medium;
`;

const CBFImage = styled.Image`
  height: 120px;
  width: 120px;
  resize-mode: contain;
  margin-bottom: 10px;
`;

const CFImage = styled.Image`
  height: 120px;
  width: 120px;
  resize-mode: contain;
  margin-bottom: 10px;
`;

export default RecomHomeScreen;
