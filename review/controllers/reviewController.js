const connection = require('../db'); // your MySQL connection

// Helper to extract tags from review text
function extractTags(review) {
  if (!review) return [];
  const stopwords = new Set(['the', 'is', 'and', 'to', 'a', 'this', 'with', 'for', 'i', 'it', 'on', 'of', 'in', 'that']);
  const words = review
    .toLowerCase()
    .replace(/[^a-z\s]/g, '')
    .split(/\s+/);
  const tags = {};
  words.forEach(word => {
    if (word && !stopwords.has(word)) {
      tags[word] = (tags[word] || 0) + 1;
    }
  });
  return Object.keys(tags);
}

// Submit a review, save tags
const submitReview = (req, res) => {
  const { product_id, rating, review } = req.body;

  if ((!rating && rating !== 0) && (!review || review.trim() === '')) {
    return res.status(400).json({ error: 'Rating or review is required.' });
  }

  // Insert the review first
  const insertReviewQuery = 'INSERT INTO reviews (product_id, rating, review, created_at) VALUES (?, ?, ?, NOW())';
  connection.query(insertReviewQuery, [product_id, rating || null, review || null], (err, result) => {
    if (err) {
      console.error('Error inserting review:', err);
      return res.status(500).json({ error: 'Database error while inserting review.' });
    }

    // Extract tags from review text
    const tags = extractTags(review);

    // Update tags count in review_tags table using upsert
    tags.forEach(tag => {
      const insertTagQuery = `
        INSERT INTO review_tags (product_id, tag, count)
        VALUES (?, ?, 1)
        ON DUPLICATE KEY UPDATE count = count + 1
      `;
      connection.query(insertTagQuery, [product_id, tag], (tagErr) => {
        if (tagErr) {
          console.error('Error updating tag:', tagErr);
          // We don't block the response for tag errors
        }
      });
    });

    res.json({ message: 'Review submitted successfully', reviewId: result.insertId });
  });
};

// Get average rating for a product
const getAverageRating = (req, res) => {
  const productId = req.params.productId;
  const avgQuery = 'SELECT AVG(rating) as averageRating FROM reviews WHERE product_id = ?';
  connection.query(avgQuery, [productId], (err, results) => {
    if (err) {
      console.error('Error fetching average rating:', err);
      return res.status(500).json({ error: 'Database error while fetching average rating.' });
    }
    res.json({ averageRating: results[0].averageRating || 0 });
  });
};

// Get all reviews for a product
const getReviewsByProduct = (req, res) => {
  const productId = req.params.productId;
  const reviewsQuery = 'SELECT * FROM reviews WHERE product_id = ? ORDER BY created_at DESC';
  connection.query(reviewsQuery, [productId], (err, results) => {
    if (err) {
      console.error('Error fetching reviews:', err);
      return res.status(500).json({ error: 'Database error while fetching reviews.' });
    }
    res.json(results);
  });
};

// Get top tags for a product
const getTopTagsByProduct = (req, res) => {
  const productId = req.params.productId;
  const tagsQuery = `
    SELECT tag FROM review_tags
    WHERE product_id = ?
    ORDER BY count DESC
    LIMIT 5
  `;
  connection.query(tagsQuery, [productId], (err, results) => {
    if (err) {
      console.error('Error fetching tags:', err);
      return res.status(500).json({ error: 'Database error while fetching tags.' });
    }
    res.json(results.map(row => row.tag));
  });
};

// Get products filtered by a tag
const getProductsByTag = (req, res) => {
  const tag = req.params.tag;
  const productsByTagQuery = `
    SELECT DISTINCT p.*
    FROM products p
    JOIN review_tags rt ON p.id = rt.product_id
    WHERE rt.tag = ?
  `;
  connection.query(productsByTagQuery, [tag], (err, results) => {
    if (err) {
      console.error('Error fetching products by tag:', err);
      return res.status(500).json({ error: 'Database error while fetching products.' });
    }
    res.json(results);
  });
};
module.exports = {
  submitReview,
  getAverageRating,
  getReviewsByProduct,
  getTopTagsByProduct,
  getProductsByTag,
};
