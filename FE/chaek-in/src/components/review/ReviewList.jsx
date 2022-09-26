import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import ReviewForm from './ReviewForm';
import ReviewItem from './ReviewItem';
import Axios from 'axios';
import { HOST } from '@env';
import { useSelector } from 'react-redux';

function ReviewList({ bookId }) {
  const { accessToken } = useSelector((state) => state.main);
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    Axios.get(`${HOST}/api/v1/books/${bookId}/reviews`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(function (response) {
        console.log(response.data);
        setReviews(response.data.reviews);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <View style={{ marginTop: 5 }}>
      <ReviewForm bookId={bookId} />
      {/* {reviews.map((review) => (
        <ReviewItem key={review.reviewId} item={review} bookId={bookId} />
      ))} */}
    </View>
  );
}

export default ReviewList;
