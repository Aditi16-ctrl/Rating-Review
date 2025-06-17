import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

const Card = styled(motion.div)`
  background-color: #1e293b;
  border-radius: 12px;
  padding: 1.2rem;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  margin-top: 1.2rem;
  flex-direction: column;
  align-items: center;
  color: #fff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 0 20px rgba(56, 189, 248, 0.4);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  max-width: 250px;
  height: auto;
  border-radius: 10px;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: 1.3rem;
  text-align: center;
  margin-bottom: 0.4rem;
`;

const Description = styled.p`
  font-size: 0.95rem;
  color: #cbd5e1;
  text-align: center;
`;

const Stars = styled.div`
  margin: 0.6rem 0;
  display: flex;
  justify-content: center;
`;

const Star = styled.span`
  font-size: 1.6rem;
  cursor: pointer;
  color: ${({ active }) => (active ? '#facc15' : '#64748b')};
`;

const ReviewInput = styled.textarea`
  width: 100%;
  margin-top: 0.8rem;
  padding: 0.6rem;
  border-radius: 6px;
  background: #475569;
  border: none;
  color: #fff;
`;

const SubmitBtn = styled(motion.button)`
  margin-top: 1rem;
  padding: 0.5rem 1.2rem;
  background-color: #38bdf8;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  cursor: pointer;
  color: #0f172a;
  font-weight: bold;
`;

const ReviewBox = styled.div`
  background-color: #334155;
  padding: 0.8rem;
  border-radius: 8px;
  margin-bottom: 0.6rem;
  font-size: 0.9rem;
`;

const Tag = styled.span`
  background-color: #475569;
  padding: 0.3rem 0.6rem;
  border-radius: 12px;
  font-size: 0.85rem;
  color: #e2e8f0;
  cursor: pointer;
  margin: 0.2rem;
`;
const CenteredButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.2rem;
  width: 100%;
`;


const ProductCard = ({ product }) => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [review, setReview] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [tags, setTags] = useState([]);
  const [filterTag, setFilterTag] = useState(null);
  const [showReviews, setShowReviews] = useState(false);

  const generateTags = (reviews) => {
    const stopwords = new Set(['the', 'is', 'and', 'to', 'a', 'of', 'this', 'it', 'in', 'was', 'for', 'with', 'on', 'my', 'but', 'very', 'so', 'i', 'am', 'are', 'have', 'has', 'at', 'an']);
    const wordCount = {};
    reviews.forEach(r => {
      if (r.review) {
        const words = r.review.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/);
        words.forEach(word => {
          if (word && !stopwords.has(word)) {
            wordCount[word] = (wordCount[word] || 0) + 1;
          }
        });
      }
    });
    const sortedWords = Object.entries(wordCount).sort((a, b) => b[1] - a[1]).slice(0, 5).map(entry => entry[0]);
    setTags(sortedWords);
  };

  const fetchReviews = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/reviews/${product.id}`);
      const data = await res.json();
      setReviews(data);
      generateTags(data);
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [product.id]);

  const handleSubmit = async () => {
    if (!rating && !review.trim()) {
      alert("Please provide at least a rating or a review.");
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: product.id, rating: rating || null, review: review || null }),
      });

      const data = await res.json();
      setSubmitted(true);

      const newReview = {
        id: Date.now(),
        rating: rating || null,
        review: review || null,
        created_at: new Date().toISOString(),
      };

      const updated = [newReview, ...reviews];
      setReviews(updated);
      generateTags(updated);
      setRating(0);
      setReview('');
    } catch (error) {
      console.error('Submission failed:', error);
    }
  };

  let imageSrc = '';
  try {
    imageSrc = require(`../images/${product.imagePath}`);
  } catch (err) {
    console.error('Image load failed:', err);
  }

  const filteredReviews = filterTag
    ? reviews.filter(r => r.review?.toLowerCase().includes(filterTag.toLowerCase()))
    : reviews;

  return (
    <Card whileHover={{ scale: 1.03 }}>
      <ProductImage src={imageSrc} alt={product.name} />
      <Title>{product.name}</Title>
      <Description>{product.description}</Description>

      {tags.length > 0 && (
        <div style={{ marginTop: '0.8rem', color: '#38bdf8' }}>
          <strong>Popular Tags:</strong>
          <div style={{ marginTop: '0.4rem', display: 'flex', flexWrap: 'wrap' }}>
            {tags.map((tag, idx) => (
              <Tag key={idx} onClick={() => setFilterTag(tag)}>
                #{tag}
              </Tag>
            ))}
            {filterTag && (
              <Tag onClick={() => setFilterTag(null)} style={{ backgroundColor: '#dc2626' }}>
                ✕ Clear Filter
              </Tag>
            )}
          </div>
        </div>
      )}

      <Stars>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            active={star <= (hovered || rating)}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
          >
            <FaStar />
          </Star>
        ))}
      </Stars>

      <ReviewInput
        rows="3"
        placeholder="Write your review..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />

      <SubmitBtn
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSubmit}
      >
        Submit
      </SubmitBtn>

      {submitted && (
        <p style={{ marginTop: "0.8rem", color: "#22c55e" }}>
          ✅ Thank you for your feedback!
        </p>
      )}

      {/* Show / Hide Reviews Button + Reviews Section */}
{!showReviews ? (
  <CenteredButtonWrapper>
    <SubmitBtn
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setShowReviews(true)}
    >
      Show Reviews ({reviews.length})
    </SubmitBtn>
  </CenteredButtonWrapper>
) : (
  <div style={{ marginTop: '1.2rem', width: '100%' }}>
    <CenteredButtonWrapper>
      <SubmitBtn
        style={{ backgroundColor: '#ef4444', color: 'white' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowReviews(false)}
      >
        Hide Reviews
      </SubmitBtn>
    </CenteredButtonWrapper>

    {filteredReviews.length === 0 ? (
      <p style={{ textAlign: 'center', marginTop: '0.8rem' }}>No reviews yet.</p>
    ) : (
      filteredReviews.map((r) => (
        <ReviewBox key={r.id}>
          <strong>Rating:</strong> {'★'.repeat(r.rating || 0)} ({r.rating || 'N/A'})<br />
          <strong>Comment:</strong> {r.review || 'No comment'}<br />
          <small style={{ color: '#94a3b8' }}>
            {r.created_at ? new Date(r.created_at).toLocaleDateString() : ''}
          </small>
        </ReviewBox>
      ))
    )}
  </div>
)}

    </Card>
  );
};

export default ProductCard;
