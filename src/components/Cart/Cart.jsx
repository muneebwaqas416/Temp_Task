import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cart.css';

const Cart = ({ userId }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/cart/user/${userId}`);
      setCartItems(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching cart items');
      setLoading(false);
    }
  };

  const removeFromCart = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/cart/${id}`);
      fetchCartItems();
    } catch (err) {
      setError('Error removing item from cart');
    }
  };

  const updateDuration = async (id, duration) => {
    try {
      await axios.put(`http://localhost:3000/cart/${id}`, { duration });
      fetchCartItems();
    } catch (err) {
      setError('Error updating duration');
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(`http://localhost:3000/cart/user/${userId}`);
      setCartItems([]);
    } catch (err) {
      setError('Error clearing cart');
    }
  };

  useEffect(() => {
    if (userId) {
      fetchCartItems();
    }
  }, [userId]);

  if (loading) return <div className="cart-loading">Loading cart...</div>;
  if (error) return <div className="cart-error">{error}</div>;

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-details">
                  <h3>{item.propertyName}</h3>
                  <p>Price: ${item.price}/day</p>
                  <div className="duration-control">
                    <label>Duration (days):</label>
                    <input
                      type="number"
                      min="1"
                      value={item.duration}
                      onChange={(e) => updateDuration(item.id, parseInt(e.target.value))}
                    />
                  </div>
                  <p>Total: ${(item.price * item.duration).toFixed(2)}</p>
                </div>
                <button
                  className="remove-button"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="cart-actions">
            <button className="clear-button" onClick={clearCart}>
              Clear Cart
            </button>
            <button className="checkout-button">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart; 