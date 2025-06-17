const express = require('express');
const router = express.Router();

const {
  submitReview,
  getAverageRating,
  getReviewsByProduct,
  getTopTagsByProduct,
  getProductsByTag,
} = require('../controllers/reviewController');

router.post('/', submitReview);
router.get('/:productId/average', getAverageRating);
router.get('/:productId/tags', getTopTagsByProduct);
router.get('/:productId', getReviewsByProduct);

// **Make sure this is below other productId routes**
router.get('/tags/:tag/products', getProductsByTag);

module.exports = router;
