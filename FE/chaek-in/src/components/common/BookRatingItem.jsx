import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import styled from 'styled-components/native';
import Axios from 'axios';
import { HOST } from '@env';
import { useSelector } from 'react-redux';

function BookRatingItem({ item }) {
  const { fakeAccessToken } = useSelector((state) => state.main);
  return (
    <BookItemContainer>
      <Image source={{ uri: item.cover }} style={{ width: 80, height: 120 }} />
    </BookItemContainer>
  );
}

const BookItemContainer = styled.View`
  margin: 3% 5.5%;
`;

export default BookRatingItem;
