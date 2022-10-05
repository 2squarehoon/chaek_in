import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import styled from 'styled-components/native';

function BookItem({ item }) {
  return (
    <BookItemContainer>
      <Image source={{ uri: item.cover }} style={{ width: 80, height: 120 }} />
    </BookItemContainer>
  );
}

const BookItemContainer = styled.View`
  margin: 3% 3%;
`;

export default BookItem;
