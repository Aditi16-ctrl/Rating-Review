import React, { useState } from 'react';
import axios from 'axios';
import { Input, TextArea, Button } from './Styled';

const ReviewForm = ({ productId, onSubmit }) => {
  const [userId] = useState(1); // Dummy user
  const [rating, setRating] = useState('');
  const [reviewText, setReviewText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating && !reviewText) return alert('Give rating or review');

    try {
      await axios.post('http://localhost:5000/reviews', {
        productId,
        userId,
        rating,
        reviewText
      });
      setRating('');
      setReviewText('');
      onSubmit(); // Trigger refresh in parent
    } catch (err) {
      alert(err.response?.data?.error || 'Error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Rating (1-5):</label>
      <Input type="number" value={rating} onChange={e => setRating(e.target.value)} min="1" max="5" />
      <label>Review:</label>
      <TextArea value={reviewText} onChange={e => setReviewText(e.target.value)} />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default ReviewForm;
