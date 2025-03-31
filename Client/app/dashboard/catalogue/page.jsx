'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function CataloguePage() {
  const { data: session, status } = useSession();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showHotDealsOnly, setShowHotDealsOnly] = useState(false);

  const fetchProducts = async () => {
    if (!session?.user?.accessToken) {
      setError('User not authenticated');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/products`, {
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      if (!text) {
        throw new Error("Received empty response from server, no data to load.");
      }

      try {
        const data = JSON.parse(text);
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          throw new Error('Received data is not in expected array format.');
        }
      } catch (e) {
        throw new Error(`Failed to parse JSON data: ${e.message}`);
      }
    } catch (error) {
      console.error('❌ Error fetching products:', error);
      setError(`Failed to load products: ${error.message}`);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      fetchProducts();
    }
  }, [session, status]);

  if (status === 'loading') return <p className="p-10">Loading...</p>;

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesHotDeal = showHotDealsOnly ? product.hotDeal : true;
    return matchesSearch && matchesHotDeal;
  });

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Product Catalogue</h1>

      {error && <p className="text-red-500 font-semibold">{error}</p>}

      {!error && (
        <div className="mb-4 flex flex-col sm:flex-row gap-4 sm:items-center">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 rounded-md w-full sm:w-1/3"
          />
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={showHotDealsOnly}
              onChange={(e) => setShowHotDealsOnly(e.target.checked)}
              className="accent-red-500"
            />
            <span>Show only Hot Deals</span>
          </label>
        </div>
      )}

      {!error && filteredProducts.length === 0 && (
        <p className="text-gray-600">No products found.</p>
      )}

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <li
            key={product._id}
            className="border p-4 rounded-lg shadow hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              {product.hotDeal && (
                <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm">
                  🔥 Hot Deal
                </span>
              )}
            </div>
            <p className="text-gray-700 mb-1">{product.description}</p>
            <p className="text-sm text-gray-500">Stock: {product.stock}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
