"use client";

import { useState } from "react";
import { HARDCODED_PRODUCTS, Product } from "@/app/data/cars";

const HARDCODED_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZGY5MGU2MDgwOTEwMzYwMGI0YWU5YiIsIm5hbWUiOiJiYXJyeWFsbGVuIiwiaWF0IjoxNzQzMzg3OTkyLCJleHAiOjE3NDM0NzQzOTJ9.OVb7SZyPI03iJjIAA-LEULx288ah8KckLsx7W5VKNdM";

export default function ProductReview() {
  const [products] = useState<Product[]>(HARDCODED_PRODUCTS);
  const [selectedProductId, setSelectedProductId] = useState<string>(
    HARDCODED_PRODUCTS[0]._id
  );
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  const userId = "67df90e60809103600b4ae9b"; // Hardcoded user ID

  const handleSubmitReview = async () => {
    if (!selectedProductId || !reviewText || rating === 0) {
      alert("❌ Please fill out all review fields.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5500/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${HARDCODED_TOKEN}`,
        },
        body: JSON.stringify({
          product: selectedProductId,
          user: userId,
          rating,
          comment: reviewText,
        }),
      });

      if (!res.ok) throw new Error("Review submission failed");
      alert("✅ Review submitted successfully!");
      setReviewText("");
      setRating(0);
    } catch (error) {
      console.error("❌ Error submitting review:", error);
      alert("❌ Error submitting review. Please try again.");
    }
  };

  const selectedProduct = products.find((p) => p._id === selectedProductId);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-xl p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Review a Product</h2>

        {/* Product Dropdown */}
        <select
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
        >
          {products.map((product) => (
            <option key={product._id} value={product._id}>
              {product.name}
            </option>
          ))}
        </select>

        {/* Product Details */}
        {selectedProduct && (
          <div className="bg-gray-100 p-4 mb-4 rounded text-sm">
            <p><strong>Description:</strong> {selectedProduct.description}</p>
            <p><strong>Price:</strong> ${selectedProduct.price}</p>
            <p><strong>Stock:</strong> {selectedProduct.stock}</p>
            <p>
              <strong>Hot Deal:</strong> {selectedProduct.hotDeal ? "🔥 Yes" : "No"}
            </p>
          </div>
        )}

        {/* Review Input */}
        <textarea
          placeholder="Write your review..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className="w-full border p-2 mb-4 h-24 rounded"
        />

        {/* Star Rating */}
        <div className="flex items-center gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              className={`cursor-pointer text-xl ${
                star <= rating ? "text-yellow-500" : "text-gray-400"
              }`}
            >
              ★
            </span>
          ))}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmitReview}
          className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
}