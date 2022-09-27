import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import styled from 'styled-components/native';
import BookItem from './BookItem';

function BookItemList() {
  return (
    <>
      <Text>여러 책을 디스플레이하는 틀</Text>
      <BookItem />
    </>
  );
}

export default BookItemList;
