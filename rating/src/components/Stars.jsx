import React from 'react';
import styled from 'styled-components';
import { FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

const StarsContainer = styled.div`
  margin: 0.6rem 0;
  display: flex;
  justify-content: center;
`;

const Star = styled(motion.span)`
  font-size: 1.6rem;
  cursor: pointer;
  color: ${({ active }) => (active ? '#facc15' : '#64748b')};
  transition: color 0.3s ease;
`;

const Stars = ({ rating, hovered, setRating, setHovered }) => {
  return (
    <StarsContainer role="radiogroup" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          active={star <= (hovered || rating)}
          onClick={() => setRating(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          whileHover={{ scale: 1.3 }}
          transition={{ type: 'spring', stiffness: 300 }}
          role="radio"
          tabIndex={0}
          aria-checked={rating === star}
        >
          <FaStar />
        </Star>
      ))}
    </StarsContainer>
  );
};

export default Stars;
