import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ReviewBox = styled(motion.div)`
  background-color: #334155;
  padding: 0.8rem;
  border-radius: 8px;
  margin-bottom: 0.6rem;
  font-size: 0.9rem;
  color: #e0e7ff;
`;

const ReviewList = ({ productId, refresh }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/reviews/${productId}`)
      .then(res => setReviews(res.data))
      .catch(() => setReviews([]));
  }, [productId, refresh]);

  return (
    <div style={{ marginTop: '1.2rem', width: '100%' }}>
      <h4 style={{ color: '#94a3b8', marginBottom: '0.8rem' }}>Reviews:</h4>
      {reviews.length === 0 ? (
        <p style={{ color: '#64748b' }}>No reviews yet.</p>
      ) : (
        reviews.map((r, idx) => (
          <ReviewBox
            key={r.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 * idx }}
          >
            <strong>Rating:</strong> {'★'.repeat(r.rating || 0)} ({r.rating || 'N/A'})<br />
            <em>{r.review_text || 'No comment'}</em><br />
            <small style={{ color: '#94a3b8' }}>
              {r.created_at ? new Date(r.created_at).toLocaleDateString() : ''}
            </small>
          </ReviewBox>
        ))
      )}
    </div>
  );
};

export default ReviewList;
