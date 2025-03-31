import express from "express";
import {
  getReviewsByProduct,
  addReview,
  updateReview,
  deleteReview
} from "../controllers/reviewController.js";

const router = express.Router();

// GET all reviews for a specific product
router.get("/:productId", getReviewsByProduct);

// POST a new review
router.post("/", addReview);

// PUT to update a review (optional, if you want users to edit their reviews)
router.put("/:reviewId", updateReview);

// DELETE a review
router.delete("/:reviewId", deleteReview);

export default router;
