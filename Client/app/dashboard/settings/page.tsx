import SideNav from "@/app/componets/dashboard/sidenav";
import React, { useEffect, useState } from 'react';
import { redirect } from "next/navigation";

export default function SettingsPage() {
  
  redirect("/dashboard/settings/profile"); // Instantly redirects
  return null;
}

// const CartScreen = () => {
//   const [cartItems, setCartItems] = useState([]);
//   useEffect(() => {
//     getCartItems();
//   }, []);


//   const getCartItems = async () => {
//     const response = await fetch("http://localhost:5500/api/cart/get");
//     const dataCollect = await response.json();
//     if (dataCollect.status === "successful") setCartItems(dataCollect.data.itemCart.items);
//     else console.error("Was not able to get the cart items");
//   };

//   const handleRemoveItems = async (itemId) => {
//     const response = await fetch("http://localhost:5500/api/cart/remove/${itemId}", { method: "DELETE" });
//     const result = await response.json();
//     if (result.status === 'successful') getCartItems();
//     else console.error("Was not able to remove the item from cart")
//   };

//   return {
//     <div>
//     </div>
//   }
// };

// export default CartPage;
