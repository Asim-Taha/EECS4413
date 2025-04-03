import React, { useEffect, useState } from 'react';
import { CartItem } from '../../app/types';
import SideNav from '../../app/componets/dashboard/sidenav';
import TopNav from '../../app/componets/dashboard/topnav';
import '../../app/componets/global.css'; // Ensure this path is correct

const Cart: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const HARDCODED_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZGY5MGU2MDgwOTEwMzYwMGI0YWU5YiIsIm5hbWUiOiJiYXJyeWFsbGVuIiwiaWF0IjoxNzQzNDczNzU4LCJleHAiOjE3NDM1NjAxNTh9.N1f-zR5oCPhKB_8yOEQJ6YHPkzzNQzJZQEuPg3rdkR8";

    const userData = {
        name: 'barryallen',
        email: 'john.doe@example.com',
        profilePic: 'url-to-profile-pic.jpg'
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async (): Promise<void> => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8080/api/cart/get', {
                headers: {
                    'Authorization': `Bearer ${HARDCODED_TOKEN}`,
                }
            });
            const data = await response.json();
            if (data.status === 'successful' && data.data.itemCart) {
                setCartItems(data.data.itemCart.items);
                setTotalItems(data.data.itemCart.items.reduce((total: number, item: CartItem) => total + item.quantity, 0));
            } else {
                console.error('Failed to fetch cart items:', data.message);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
        setLoading(false);
    };

    const handleRemoveItem = async (itemId: string): Promise<void> => {
        try {
            const response = await fetch(`http://localhost:8080/api/cart/remove/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${HARDCODED_TOKEN}`,
                }
            });
            const result = await response.json();
            if (result.status === 'successful') {
                fetchCartItems(); // Refresh the cart items after a successful deletion
            } else {
                console.error('Failed to remove item:', result.message);
            }
        } catch (error) {
            console.error('Remove error:', error);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="dashboard-layout">
            <SideNav />
            <div className="main-content">
                <TopNav name={userData.name} email={userData.email} profilePic={userData.profilePic} />
                <div className="cartContainer" style={{ maxWidth: '800px', margin: '20px auto', paddingTop: '10px' }}>
                    <h1 className="cartTitle">Your Cart</h1>
                    <p>Total Items: {totalItems}</p>
                    <ul className="cartList" style={{ listStyle: 'none', padding: 0, marginTop: '10px' }}>
                        {cartItems.map((item) => (
                            <li key={item._id} className="cartItem" style={{ background: '#f0f0f0', margin: '5px 0', padding: '10px', borderRadius: '5px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span className="cartProduct">{item.product}</span>
                                    <span className="cartQuantity">Quantity: {item.quantity}</span>
                                    <button className="removeItemButton" onClick={() => handleRemoveItem(item._id)} style={{ padding: '5px 10px', background: 'red', color: 'white', border: 'none', borderRadius: '5px' }}>
                                        Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Cart;