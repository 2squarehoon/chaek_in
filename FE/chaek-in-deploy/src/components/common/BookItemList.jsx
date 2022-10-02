import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import styled from 'styled-components/native';
import BookItem from './BookItem';

function BookItemList({ books }) {
  return (
    <ScrollViewContainer>
      <BookItemsContainer>
        {books.map((book) => (
          <BookItem key={book.bookId} item={book} />
        ))}
      </BookItemsContainer>
    </ScrollViewContainer>
  );
}
const ScrollViewContainer = styled.ScrollView`
  margin-top: 5%;
`;

const BookItemsContainer = styled.View`
  display:flex
  flex-flow: row wrap;
`;

export default BookItemList;
