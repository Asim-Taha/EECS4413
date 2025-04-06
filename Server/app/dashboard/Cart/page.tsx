// 'use client';

// import { useEffect, useState } from 'react';

// export default function CartPage() {
//   const HARDCODED_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZGY5MGU2MDgwOTEwMzYwMGI0YWU5YiIsIm5hbWUiOiJiYXJyeWFsbGVuIiwiaWF0IjoxNzQzMzg3OTkyLCJleHAiOjE3NDM0NzQzOTJ9.OVb7SZyPI03iJjIAA-LEULx288ah8KckLsx7W5VKNdM";

//   type CartItem = {
//     _id: string;
//     name: string;
//     price: number;
//     quantity: number;
//   };

//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCartItems = async () => {
//       try {
//         setLoading(true);
//         const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/cart`;

//         const res = await fetch(apiUrl, {
//           headers: {
//             Authorization: `Bearer ${HARDCODED_TOKEN}`,
//           },
//         });

//         if (!res.ok) throw new Error(`API response error: ${res.status}`);
//         const response = await res.json();

//         if (Array.isArray(response.data)) {
//           setCartItems(response.data);
//         } else {
//           throw new Error("Cart data not in expected format");
//         }
//       } catch (err: any) {
//         setError(`Failed to load cart items: ${err.message}`);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCartItems();
//   }, []);

//   const handleRemoveFromCart = async (itemId: string) => {
//     try {
//       const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/cart/remove`;

//       const res = await fetch(apiUrl, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${HARDCODED_TOKEN}`,
//         },
//         body: JSON.stringify({ itemId }),
//       });

//       if (!res.ok) {
//         throw new Error(`Failed to remove item: ${res.status}`);
//       }

//       setCartItems(currentItems => currentItems.filter(item => item._id !== itemId));
//       alert('✅ Item removed from cart!');
//     } catch (err) {
//       console.error(err);
//       alert('❌ Failed to remove item from cart.');
//     }
//   };

//   const handleUpdateQuantity = async (itemId: string, quantity: number) => {
//     try {
//       const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/cart/update`;

//       const res = await fetch(apiUrl, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${HARDCODED_TOKEN}`,
//         },
//         body: JSON.stringify({ itemId, quantity }),
//       });

//       if (!res.ok) {
//         throw new Error(`Failed to update quantity: ${res.status}`);
//       }

//       setCartItems(currentItems =>
//         currentItems.map(item => item._id === itemId ? { ...item, quantity } : item)
//       );
//       alert('✅ Quantity updated!');
//     } catch (err) {
//       console.error(err);
//       alert('❌ Failed to update quantity.');
//     }
//   };

//   if (loading) return <p className="p-10">Loading...</p>;

//   return (
//     <div className="p-10">
//       <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

//       {error && <p className="text-red-500 font-semibold">{error}</p>}

//       {!error && cartItems.length === 0 && (
//         <p className="text-gray-600">Your cart is empty.</p>
//       )}

//       <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {cartItems.map((item) => (
//           <li
//             key={item._id}
//             className="border p-4 rounded-lg shadow hover:shadow-md transition flex flex-col justify-between"
//           >
//             <div className="flex justify-between items-center mb-2">
//               <h2 className="text-xl font-semibold">{item.name}</h2>
//               <button
//                 onClick={() => handleRemoveFromCart(item._id)}
//                 className="bg-red-500 text-white px-2 py-1 rounded"
//               >
//                 Remove
//               </button>
//             </div>
//             <div className="flex items-center justify-between mb-3">
//               <span className="text-gray-700">Price: ${item.price}</span>
//               <input
//                 type="number"
//                 min="1"
//                 value={item.quantity}
//                 onChange={(e) => handleUpdateQuantity(item._id, parseInt(e.target.value))}
//                 className="w-16 border rounded text-center"
//               />
//             </div>
//             <div className="text-right">
//               <span className="text-lg font-bold">Total: ${item.price * item.quantity}</span>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }