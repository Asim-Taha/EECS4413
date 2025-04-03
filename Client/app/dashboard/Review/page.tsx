"use client";

import { useEffect, useState } from "react";

type Product = {
  _id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  hotDeal: boolean;
};

const HARDCODED_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZGY5MGU2MDgwOTEwMzYwMGI0YWU5YiIsIm5hbWUiOiJiYXJyeWFsbGVuIiwiaWF0IjoxNzQzNDczNzU4LCJleHAiOjE3NDM1NjAxNTh9.N1f-zR5oCPhKB_8yOEQJ6YHPkzzNQzJZQEuPg3rdkR8";

export default function ProductReview() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  const userId = "67df90e60809103600b4ae9b"; // Hardcoded user for now

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5500/api/products", {
          headers: {
            Authorization: `Bearer ${HARDCODED_TOKEN}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);

        if (data.length > 0) {
          setSelectedProductId(data[0]._id);
        }
      } catch (err) {
        console.error("❌ Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, []);

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

        {selectedProduct && (
          <div className="bg-gray-100 p-4 mb-4 rounded text-sm">
            <p>
              <strong>Description:</strong> {selectedProduct.description}
            </p>
            <p>
              <strong>Price:</strong> ${selectedProduct.price}
            </p>
            <p>
              <strong>Stock:</strong> {selectedProduct.stock}
            </p>
            <p>
              <strong>Hot Deal:</strong>{" "}
              {selectedProduct.hotDeal ? "🔥 Yes" : "No"}
            </p>
          </div>
        )}

        <textarea
          placeholder="Write your review..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className="w-full border p-2 mb-4 h-24 rounded"
        />

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

        <button
          onClick={handleSubmitReview}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
}
