'use client';

import { useEffect, useState } from 'react';

export default function CataloguePage() {
  const HARDCODED_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZGY5MGU2MDgwOTEwMzYwMGI0YWU5YiIsIm5hbWUiOiJiYXJyeWFsbGVuIiwiaWF0IjoxNzQzMzg3OTkyLCJleHAiOjE3NDM0NzQzOTJ9.OVb7SZyPI03iJjIAA-LEULx288ah8KckLsx7W5VKNdM";

  type Product = {
    _id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    hotDeal: boolean;
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showHotDealsOnly, setShowHotDealsOnly] = useState(false);
  const [sortKey, setSortKey] = useState('price-asc');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/products`;

        const res = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${HARDCODED_TOKEN}`,
          },
        });

        if (!res.ok) throw new Error(`API response error: ${res.status}`);
        const response = await res.json();

        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else if (Array.isArray(response)) {
          setProducts(response);
        } else {
          throw new Error("Product data not in expected format");
        }
      } catch (err: any) {
        setError(`Failed to load products: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Add to Cart Handler
  const handleAddToCart = async (productId:string) => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/cart`;

      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${HARDCODED_TOKEN}`,
        },
        body: JSON.stringify({ productId }),
      });

      if (!res.ok) {
        throw new Error(`Failed to add to cart: ${res.status}`);
      }

      const response = await res.json();
      alert('✅ Added to cart!');
    } catch (err) {
      console.error(err);
      alert('❌ Failed to add to cart.');
    }
  };

  if (loading) return <p className="p-10">Loading...</p>;

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesHotDeal = showHotDealsOnly ? product.hotDeal : true;
      return matchesSearch && matchesHotDeal;
    })
    .sort((a, b) => {
      switch (sortKey) {
        case 'price-asc':
          return (a.price ?? 0) - (b.price ?? 0);
        case 'price-desc':
          return (b.price ?? 0) - (a.price ?? 0);
        case 'name-desc':
          return b.name?.localeCompare(a.name);
        case 'name-asc':
        default:
          return a.name?.localeCompare(b.name);
      }
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
          <select
            className="border rounded p-2"
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
          >
            <option value="name-asc">Name: A-Z</option>
            <option value="name-desc">Name: Z-A</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      )}

      {!error && filteredProducts.length === 0 && (
        <p className="text-gray-600">No products found.</p>
      )}

<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {filteredProducts.map((product) => (
    <li
      key={product._id}
      className="border p-4 rounded-lg shadow hover:shadow-md transition flex flex-col justify-between"
    >
      <div className="flex-grow">
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
        <p className="text-sm text-gray-500 font-medium mb-3">Price: ${product.price}</p>
      </div>
      <button
  onClick={() => handleAddToCart(product._id)}
  className="bg-blue-500 text-black px-4 py-2 mt-4 rounded-md shadow hover:bg-blue-600 transition-colors"
>
  Add to Cart
</button>


    </li>
  ))}
</ul>

    </div>
  );
}