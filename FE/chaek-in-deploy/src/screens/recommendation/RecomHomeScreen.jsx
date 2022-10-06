import React from 'react';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';

function RecomHomeScreen({ navigation }) {
  const { nickname } = useSelector((state) => state.main);

  return (
    <BookRecomView>
      <ButtonContainer onPress={() => navigation.navigate('BookSearch')}>
        <ButtonText>책 검색하기</ButtonText>
      </ButtonContainer>
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
      <BestSellerView onPress={() => navigation.navigate('BestSellerRecom')}>
        <BestSellerImage source={require('../../../assets/image/bookRecom/BestSellerRecom.png')} />
        <BestSellerText>요즘 많이{'\n'}책크인 된 책</BestSellerText>
      </BestSellerView>
    </BookRecomView>
  );
}

const CBFView = styled.TouchableOpacity`
  flex: 1;
  flex-direction: column;
  position: absolute;
  width: 150px;
  top: 70px;
  left: 30px;
  align-items: center;
`;
const CFView = styled.TouchableOpacity`
  flex: 1;
  flex-direction: column;
  position: absolute;
  width: 150px;
  top: 200px;
  right: 30px;
  align-items: center;
`;

const BestSellerView = styled.TouchableOpacity`
  flex: 1;
  flex-direction: column;
  position: absolute;
  width: 150px;
  top: 350px;
  left: 30px;
  align-items: center;
`;
const BestSellerImage = styled.Image`
  height: 90px;
  width: 90px;
  resize-mode: contain;
  margin-bottom: 10px;
`;

const BestSellerText = styled.Text`
  font-size: 14px;
  font-family: 'Medium';
  text-align: center;
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
  height: 90px;
  width: 90px;
  resize-mode: contain;
  margin-bottom: 10px;
`;

const CFImage = styled.Image`
  height: 90px;
  width: 90px;
  resize-mode: contain;
  margin-bottom: 10px;
`;

const ButtonText = styled.Text`
  font-family: 'Medium';
  font-size: 16px;
`;

const ButtonContainer = styled.TouchableOpacity`
  background-color: #a8ca47;
  border-radius: 20px;
  border: 1px solid black;
  padding: 10px 0px;
  margin: 3% 5% 3% auto;
  justify-content: center;
  align-items: center;
  align-self: center;
  width: 40%;
`;

export default RecomHomeScreen;
