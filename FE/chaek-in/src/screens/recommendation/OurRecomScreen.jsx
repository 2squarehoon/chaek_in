import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import styled from 'styled-components/native';

function OurRecomScreen() {
  return (
    <View style={styles.container}>
      <SearchContainer>
        <BookSearch style={styles.input} placeholder='책 이름을 검색하세요' />
      </SearchContainer>
      <BooksContainer>
        <Text>추천</Text>
      </BooksContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const BookSearch = styled.TextInput`
  width: 300px;
  height: 40px;
  border: 1px solid #000;
  border-radius: 5px;
  padding: 0 10px;
  position: absolute;
  top: 10px;
`;

const SearchContainer = styled.View`
  width: 100%;
  flex: 2;
  justify-content: center;
  align-items: center;
`;

const BooksContainer = styled.View`
  width: 100%;
  flex: 8;
  justify-content: center;
  align-items: center;
`;

export default OurRecomScreen;
