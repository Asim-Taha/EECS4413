'use client';

import { useEffect, useState } from 'react';

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  hotDeal: boolean;
};

type Review = {
  _id: string;
  user: { name: string };
  rating: number;
  comment: string;
  createdAt: string;
};

export default function ProductReviewPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // 🔐 User data (you'd usually get this from session/cookie context)
  const userId = 'REPLACE_THIS'; // optional if backend uses cookie auth

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingProducts(true);
        const res = await fetch('http://localhost:8080/api/products', {
          credentials: 'include',
        });

        const contentType = res.headers.get('content-type');
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Fetch failed: ${text}`);
        }

        if (!contentType?.includes('application/json')) {
          throw new Error('Invalid response format');
        }

        const data = await res.json();
        const list = Array.isArray(data) ? data : data.data;
        setProducts(list);
        if (list.length > 0) setSelectedProductId(list[0]._id);
      } catch (err) {
        console.error('❌ Error loading products:', err);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (!selectedProductId) return;

    const fetchReviews = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/review/${selectedProductId}`, {
          credentials: 'include',
        });

        if (!res.ok) {
          const msg = await res.text();
          console.warn('❌ Failed to fetch reviews:', msg);
          return;
        }

        const json = await res.json();
        setReviews(json);
      } catch (err) {
        console.error('❌ Failed to load reviews:', err);
      }
    };

    fetchReviews();
  }, [selectedProductId]);

  const handleSubmit = async () => {
    if (!selectedProductId || rating === 0 || !reviewText.trim()) {
      alert('❌ Please fill all review fields.');
      return;
    }

    try {
      setSubmitting(true);

      const res = await fetch('http://localhost:8080/api/review', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product: selectedProductId,
          rating,
          comment: reviewText,
          user: userId, // ⬅️ Optional if session-based auth works
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText);
      }

      alert('✅ Review submitted!');
      setReviewText('');
      setRating(0);
      // Refresh reviews
      const updated = await fetch(`http://localhost:8080/api/review/${selectedProductId}`, {
        credentials: 'include',
      });
      const json = await updated.json();
      setReviews(json);
    } catch (err) {
      console.error('❌ Error submitting review:', err);
      alert('Failed to submit review.');
    } finally {
      setSubmitting(false);
    }
  };

  const selectedProduct = products.find(p => p._id === selectedProductId);

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50 py-10">
      <div className="w-full max-w-2xl bg-white rounded shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Review a Product</h2>

        {loadingProducts ? (
          <p>Loading products...</p>
        ) : products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          <>
            {/* Product Dropdown */}
            <select
              value={selectedProductId || ''}
              onChange={e => setSelectedProductId(e.target.value)}
              className="w-full border p-2 mb-4 rounded"
            >
              {products.map(product => (
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
                  <strong>Hot Deal:</strong> {selectedProduct.hotDeal ? '🔥 Yes' : 'No'}
                </p>
              </div>
            )}

            {/* Review Input */}
            <textarea
              placeholder="Write your review..."
              value={reviewText}
              onChange={e => setReviewText(e.target.value)}
              className="w-full border p-2 mb-4 h-24 rounded"
            />

            {/* Star Rating */}
            <div className="flex items-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map(star => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  className={`cursor-pointer text-xl ${
                    star <= rating ? 'text-yellow-500' : 'text-gray-400'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>

            <button
  onClick={handleSubmit}
  disabled={submitting}
  className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-300 w-full transition-colors"
>
  {submitting ? 'Submitting...' : 'Submit Review'}
</button>
          </>
        )}

        {/* All Reviews */}
        {reviews.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Reviews:</h3>
            <ul className="space-y-4">
              {reviews.map((review) => (
                <li key={review._id} className="border p-4 rounded bg-gray-50">
                  <p className="font-semibold text-sm text-gray-600 mb-1">
                    {review.user?.name || 'Anonymous'} &middot; {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-yellow-500 mb-1">
                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                  </p>
                  <p>{review.comment}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
