import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import styled from 'styled-components/native';
import Axios from 'axios';
import { HOST } from '@env';
import { useSelector } from 'react-redux';
import Star from 'react-native-star-view';
import Modal from 'react-native-modal';

function BookRatingItem({ item }) {
  // 색깔 안바뀌는거 킹받네
  const starStyle = {
    Color: '#ffce31',
    width: 80,
    height: 20,
  };
  return (
    <BookItemContainer>
      <View>
        <Image source={{ uri: item.cover }} style={{ width: 80, height: 120 }} />
        {/* {item.rating ? <Star score={item.rating} style={starStyle} /> : <Text></Text>} */}
      </View>
    </BookItemContainer>
  );
}

const BookItemContainer = styled.View`
  margin: 3% 5% 2%;
`;

export default BookRatingItem;
