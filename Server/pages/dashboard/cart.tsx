import React, { useEffect, useState } from 'react';
import { CartItem } from '../../app/types';
import SideNav from '../../app/componets/dashboard/sidenav';
import TopNav from '../../app/componets/dashboard/topnav';
import '../../app/componets/global.css';

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);

  const userData = {
    name: 'barryallen',
    email: 'john.doe@example.com',
    profilePic: 'url-to-profile-pic.jpg',
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/cart/get', {
        credentials: 'include',
      });
      const data = await response.json();
      if (data.status === 'successful' && data.data.itemCart) {
        const items: CartItem[] = data.data.itemCart.items;
        setCartItems(items);
        setTotalItems(items.reduce((total, item) => total + item.quantity, 0));
        setTotalPrice(items.reduce((sum, item) => sum + item.quantity * (item.product.price || 0), 0));
      } else {
        console.error('❌ Failed to fetch cart items:', data.message);
      }
    } catch (error) {
      console.error('❌ Fetch error:', error);
    }
    setLoading(false);
  };

  const handleRemoveItem = async (itemId: string): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:8080/api/cart/remove/${itemId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const result = await response.json();
      if (result.status === 'successful') {
        fetchCartItems();
      } else {
        console.error('Failed to remove item:', result.message);
      }
    } catch (error) {
      console.error('Remove error:', error);
    }
  };

  const handleConfirmOrder = () => {
    alert('✅ Order confirmed!');
    setShowModal(false);
  };

  if (loading) return <p className="p-10">Loading...</p>;

  const hst = totalPrice * 0.13;
  const gst = totalPrice * 0.05;
  const finalPrice = totalPrice + hst + gst;

  return (
    <div className="dashboard-layout">
      <SideNav />
      <div className="main-content ml-64 p-8">
        <TopNav
          name={userData.name}
          email={userData.email}
          profilePic={userData.profilePic}
        />

        <div className="max-w-3xl mx-auto pt-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">Your Cart</h1>
            <button
              onClick={() => setShowModal(true)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Proceed to Checkout
            </button>
          </div>

          <p className="mb-1 text-gray-600">Total Items: {totalItems}</p>
          <p className="mb-4 text-gray-600">Total Price: ${totalPrice.toLocaleString()}</p>

          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li key={item._id} className="flex justify-between items-center bg-gray-100 p-4 rounded">
                <span className="text-lg font-semibold">
                  {typeof item.product === 'object' && 'name' in item.product
                    ? item.product.name
                    : 'Unnamed Product'}
                </span>
                <span className="text-gray-600">Quantity: {item.quantity}</span>
                <button
                  onClick={() => handleRemoveItem(item._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* ✅ Checkout Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 relative">
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>

              <h2 className="text-2xl font-bold mb-4 text-center">Checkout</h2>

              {/* Payment Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <input className="border p-2 rounded" placeholder="Name on Card" />
                <input className="border p-2 rounded" placeholder="Card Number" />
                <input className="border p-2 rounded" placeholder="CVV" />
                <input className="border p-2 rounded" placeholder="Expiry Date (MM/YY)" />
              </div>

              {/* Address Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <input className="border p-2 rounded" placeholder="Address" />
                <input className="border p-2 rounded" placeholder="City" />
                <input className="border p-2 rounded" placeholder="Province" />
                <input className="border p-2 rounded" placeholder="Phone Number" />
                <input className="border p-2 rounded" placeholder="Email" />
              </div>

              {/* Order Summary */}
              <div className="bg-gray-100 p-4 rounded mb-4">
                <h3 className="font-semibold mb-2">Order Summary</h3>
                <p>Total Items: {totalItems}</p>
                <p>Subtotal: ${totalPrice.toFixed(2)}</p>
                <p>HST (13%): ${hst.toFixed(2)}</p>
                <p>GST (5%): ${gst.toFixed(2)}</p>
                <p className="font-bold">Total: ${finalPrice.toFixed(2)}</p>
              </div>

              {/* Confirm Button */}
              <button
                onClick={handleConfirmOrder}
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Confirm Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
