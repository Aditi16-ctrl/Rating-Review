import React from 'react';
import styled from 'styled-components';

const Tag = styled.span`
  background-color: #475569;
  padding: 0.3rem 0.6rem;
  border-radius: 12px;
  font-size: 0.85rem;
  color: #e2e8f0;
  cursor: pointer;
  margin: 0.2rem;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #38bdf8;
    color: #0f172a;
  }
`;

const TagListContainer = styled.div`
  margin-top: 0.8rem;
  color: #38bdf8;
`;

const TagList = ({ tags, filterTag, setFilterTag }) => {
  return (
    <TagListContainer>
      <strong>Popular Tags:</strong>
      <div style={{ marginTop: '0.4rem', display: 'flex', flexWrap: 'wrap' }}>
        {tags.map((tag, idx) => (
          <Tag
            key={idx}
            onClick={() => setFilterTag(tag === filterTag ? null : tag)}
            style={{
              backgroundColor: tag === filterTag ? '#2563eb' : undefined,
              color: tag === filterTag ? '#e0e7ff' : undefined,
            }}
          >
            #{tag}
          </Tag>
        ))}
        {filterTag && (
          <Tag
            onClick={() => setFilterTag(null)}
            style={{ backgroundColor: '#dc2626', color: '#fff' }}
          >
            ✕ Clear Filter
          </Tag>
        )}
      </div>
    </TagListContainer>
  );
};

export default TagList;
