import React, { useEffect, useState } from 'react';
import { CartItem } from '../../app/types';
import SideNav from '../../app/componets/dashboard/sidenav';  
import TopNav from '../../app/componets/dashboard/topnav';   
import '../../app/componets/global.css'; // Ensure this path is correct

const Cart: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    
    const userData = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        profilePic: 'url-to-profile-pic.jpg'
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async (): Promise<void> => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8080/api/cart/get');
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
                <div className="cartContainer">
                    <h1 className="cartTitle">Your Cart</h1>
                    <p>Total Items: {totalItems}</p>
                    <ul className="cartList">
                        {cartItems.map((item) => (
                            <li key={item._id} className="cartItem">
                                <span className="cartProduct">{item.product}</span>
                                <span className="cartQuantity">Quantity: {item.quantity}</span>
                                <button className="removeItemButton" onClick={() => handleRemoveItem(item._id)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Cart;