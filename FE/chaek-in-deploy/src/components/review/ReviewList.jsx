import React, { useEffect, useState, useLayoutEffect } from 'react';
import { Text, View } from 'react-native';
import ReviewForm from './ReviewForm';
import ReviewItem from './ReviewItem';
import Axios from 'axios';
import { HOST } from '@env';
import { useSelector } from 'react-redux';

function ReviewList({ bookId }) {
  const { accessToken } = useSelector((state) => state.main);
  const [reviews, setReviews] = useState([
    { comment: 'test', isMine: true, reviewId: '1', score: '0', writer: 'test' },
  ]);
  const [isWritten, setIsWritten] = useState(true);
  useLayoutEffect(() => {
    Axios.get(`${HOST}/api/v1/books/${bookId}/reviews`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(function (response) {
        console.log(response.data);
        setIsWritten(response.data.isWritten);
        setReviews(response.data.reviews);
        // console.log(isWritten);
        // console.log(reviews);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // useEffect(() => {
  //   console.log(reviews);
  // }, [reviews, isWritten]);
  return (
    <View style={{ marginTop: 5 }}>
      {!isWritten && <ReviewForm bookId={bookId} />}
      {reviews.map((review) => (
        <ReviewItem key={review.reviewId} item={review} bookId={bookId} />
      ))}
    </View>
  );
}

export default ReviewList;
