import Review from "../models/review.js";

// POST - Create new review
export const addReview = async (req, res) => {
  try {
    const { product, user, rating, comment } = req.body;

    if (!product || !user || !rating || !comment) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newReview = new Review({ product, user, rating, comment });
    await newReview.save();

    res.status(201).json({ message: "Review created", review: newReview });
  } catch (error) {
    console.error("Create Review Error:", error);
    res.status(500).json({ error: "Failed to create review" });
  }
};

// GET - Get all reviews for a product
export const getReviewsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.find({ product: productId }).populate("user", "name");
    res.json(reviews);
  } catch (error) {
    console.error("Get Reviews Error:", error);
    res.status(500).json({ error: "Failed to get reviews" });
  }
};

// PUT - Update review
export const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    const review = await Review.findByIdAndUpdate(
      reviewId,
      { rating, comment },
      { new: true }
    );

    if (!review) return res.status(404).json({ error: "Review not found" });

    res.json({ message: "Review updated", review });
  } catch (error) {
    console.error("Update Review Error:", error);
    res.status(500).json({ error: "Failed to update review" });
  }
};

// DELETE - Delete review
export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const deleted = await Review.findByIdAndDelete(reviewId);
    if (!deleted) return res.status(404).json({ error: "Review not found" });

    res.json({ message: "Review deleted" });
  } catch (error) {
    console.error("Delete Review Error:", error);
    res.status(500).json({ error: "Failed to delete review" });
  }
};
