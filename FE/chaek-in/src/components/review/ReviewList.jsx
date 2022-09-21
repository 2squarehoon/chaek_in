import React from 'react';
import { Text, View } from 'react-native';
import ReviewForm from './ReviewForm';
import ReviewItem from './ReviewItem';

function ReviewList() {
  return (
    <View style={{ marginTop: 5 }}>
      <ReviewForm />
      <ReviewItem />
      <ReviewItem />
    </View>
  );
}

export default ReviewList;
