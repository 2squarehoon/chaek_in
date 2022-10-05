import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, TouchableOpacity, Alert, Modal } from 'react-native';
import styled from 'styled-components/native';
import Axios from 'axios';
import { HOST } from '@env';
import { useSelector } from 'react-redux';
import ReviewEditForm from './ReviewEditForm';
import { Entypo } from '@expo/vector-icons';
import Star from 'react-native-star-view';

function ReviewItem({ item, bookId, reload }) {
  const { accessToken } = useSelector((state) => state.main);
  const [isEditing, setIsEditing] = useState(false);
  const [editReload, setEditReload] = useState('');
  const [menuDisplay, setMenuDisplay] = useState(false);
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
        reload('리뷰삭제');
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const mountedReview = useRef(false);
  useEffect(() => {
    if (!mountedReview.current) {
      mountedReview.current = true;
    } else {
      reload('리뷰수정');
    }
  }, [editReload]);

  // const EditPress = () => {
  //   Alert.alert('수정하시겠습니까?', '', [
  //     { text: '아니오', style: 'cancel' },
  //     { text: '네', onPress: setIsEditing(true) },
  //   ]);
  // };

  const openMenu = () => {
    setMenuDisplay(true);
  };

  const closeMenu = () => {
    setMenuDisplay(false);
  };

  const editPress = () => {
    setMenuDisplay(false);
    setIsEditing(true);
  };

  const deletePress = () => {
    setMenuDisplay(false);
    Alert.alert('삭제하시겠습니까?', '', [
      { text: '아니오', style: 'cancel' },
      { text: '네', onPress: deleteReview },
    ]);
  };
  const starStyle = {
    Color: '#ffce31',
    width: 80,
    height: 20,
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
          reload={setEditReload}
        />
      )}
      <ReviewItemContainer>
        <ReviewTopContainer>
          <ReviewStarContainer>
            <Star score={item.score} style={starStyle} />
            <WriterText>{item.writer}</WriterText>
          </ReviewStarContainer>
          {item.isMine && <Entypo name='dots-three-vertical' size={20} color='black' onPress={openMenu} />}
          <Modal
            animationType='slide'
            transparent={true}
            visible={menuDisplay}
            onRequestClose={() => {
              closeMenu();
            }}
            onBackdropPress={() => closeMenu()}
          >
            <MenuOverLay onPress={closeMenu}>
              <SettingMenuContainer>
                <MenuSelectContainer onPress={editPress}>
                  <MenuText>수정</MenuText>
                </MenuSelectContainer>
                <MenuSelectContainer onPress={deletePress}>
                  <MenuText>삭제</MenuText>
                </MenuSelectContainer>
              </SettingMenuContainer>
              <CancelContainer>
                <MenuSelectContainer onPress={closeMenu}>
                  <MenuText>취소</MenuText>
                </MenuSelectContainer>
              </CancelContainer>
            </MenuOverLay>
          </Modal>
        </ReviewTopContainer>
        <ReviewTextContainer>
          <ReviewText>{item.comment}</ReviewText>
        </ReviewTextContainer>
      </ReviewItemContainer>
    </>
  );
}

const ReviewItemContainer = styled.View`
  width: 84%;
  margin: 2% 8%;
`;

const ReviewStarContainer = styled.View`
  margin-left: 3%;
  margin-right: auto;
`;

const WriterText = styled.Text`
  margin-top: 2%;
  margin-bottom: 3%;
  font-size: 15px;
  font-family: Medium;
`;

const ReviewTextContainer = styled.View`
  width: 80%;
  margin-left: 3%;
`;

const ReviewText = styled.Text`
  font-size: 15px;
  font-family: Light;
`;

const ReviewTopContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

const ReviewControlContainer = styled.View`
  width: 20%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const SettingMenuContainer = styled.View`
  margin-top: 400px;
  width: 80%;
  background-color: #ffffff;
  border-radius: 15px;
  border: 1px solid #000;
  align-items: center;
  margin-bottom: 2%;
`;

const CancelContainer = styled.View`
  width: 80%
  background-color: #ffffff;
  border-radius: 15px;
  border: 1px solid #000;
  align-items: center;
`;

const MenuSelectContainer = styled.TouchableOpacity`
  width: 80%;
  background-color: #ffffff;
  align-items: center;
  margin: 5%;
`;

const MenuText = styled.Text`
  font-family: Medium;
  font-size: 18px;
`;

const MenuOverLay = styled.TouchableOpacity`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgba(102, 100, 100, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ReviewItem;
