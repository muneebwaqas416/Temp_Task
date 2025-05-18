import React from 'react';
import { useGetCartItemsQuery, useUpdateCartItemMutation, useRemoveFromCartMutation, useClearCartMutation } from '../../store/cartApi';
import { IoClose } from "react-icons/io5";
import './CartModal.css';

const CartModal = ({ isOpen, onClose }) => {
  const { data: cartItems = [], isLoading } = useGetCartItemsQuery("user123");
  const [updateCartItem] = useUpdateCartItemMutation();
  const [removeFromCart] = useRemoveFromCartMutation();
  const [clearCart] = useClearCartMutation();

  const handleUpdateDuration = async (id, duration) => {
    try {
      await updateCartItem({ id, duration }).unwrap();
    } catch (err) {
      console.error('Error updating duration:', err);
    }
  };

  const handleRemoveFromCart = async (id) => {
    try {
      await removeFromCart(id).unwrap();
    } catch (err) {
      console.error('Error removing item from cart:', err);
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart("user123").unwrap();
    } catch (err) {
      console.error('Error clearing cart:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="cart-modal-overlay">
      <div className="cart-modal">
        <div className="cart-modal-header">
          <h2>Your Cart</h2>
          <button className="close-button" onClick={onClose}>
            <IoClose size={24} />
          </button>
        </div>
        <div className="cart-modal-content">
          {isLoading ? (
            <div className="cart-loading">Loading cart...</div>
          ) : cartItems.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div key={item._id} className="cart-item">
                    <div className="cart-item-image-wrap">
                    <img
                      src={item.image || 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmlsbGF8ZW58MHx8MHx8fDA%3D'}
                      alt="Villa"
                      className="cart-item-image"
                      onError={(e) => {
                        e.target.onerror = null; // Prevent infinite loop in case fallback fails
                        e.target.src = 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmlsbGF8ZW58MHx8MHx8fDA%3D';
                      }}
                    />
                    </div>
                    <div className="cart-item-details">
                      <div className="cart-item-header">
                        <h3>{item.propertyName}</h3>
                        <button
                          className="remove-button"
                          onClick={() => handleRemoveFromCart(item._id)}
                        >
                          Remove
                        </button>
                      </div>
                      <p className="location">{item.location}</p>
                      <p className="price">${item.price}/day</p>
                      <div className="duration-control">
                        <label>Duration (days):</label>
                        <input
                          type="number"
                          min="1"
                          value={item.duration}
                          onChange={(e) => handleUpdateDuration(item._id, parseInt(e.target.value))}
                        />
                      </div>
                      <p className="total">Total: ${(item.price * item.duration).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cart-summary">
                <div className="cart-total">
                  <span>Total Amount:</span>
                  <span>${cartItems.reduce((sum, item) => sum + (item.price * item.duration), 0).toFixed(2)}</span>
                </div>
                <div className="cart-actions">
                  <button className="clear-button" onClick={handleClearCart}>
                    Clear Cart
                  </button>
                  <button className="checkout-button">Proceed to Checkout</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal; 