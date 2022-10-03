import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { HOST } from '@env';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { StyleSheet, Text, View } from 'react-native';

function SimilarPeopleScreen() {
  const { accessToken, userId } = useSelector((state) => state.main);

  // /api/data/books/cf/{memberId} : 나와 비슷한 사람들이 좋아하는 책 추천
  useEffect(() => {
    Axios.get(`${HOST}/api/data/books/cf/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [accessToken, userId]);

  return (
    <View style={styles.container}>
      <Text>추천</Text>
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

export default SimilarPeopleScreen;
