import React from 'react';
import { Link } from 'react-router-dom';

const CartPage = ({ cart, updateQuantity, removeFromCart }) => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (cart.length === 0) {
        return (
            <div className="container py-5 text-center">
                <h2>Your cart is empty</h2>
                <p className="mb-4">Add some products to your cart to see them here!</p>
                <Link to="/" className="btn btn-primary">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container py-4">
            <h2 className="mb-4">Shopping Cart</h2>
            <div className="row">
                <div className="col-md-8">
                    {cart.map(item => (
                        <div key={item.id} className="card mb-3">
                            <div className="row g-0">
                                <div className="col-md-3">
                                    <img 
                                        src={item.image} 
                                        className="img-fluid p-2" 
                                        alt={item.title}
                                        style={{ height: '150px', objectFit: 'contain' }}
                                    />
                                </div>
                                <div className="col-md-9">
                                    <div className="card-body">
                                        <h5 className="card-title">{item.title}</h5>
                                        <p className="card-text">
                                            <small className="text-muted">{item.category}</small>
                                        </p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="input-group" style={{ width: '130px' }}>
                                                <button 
                                                    className="btn btn-outline-secondary" 
                                                    type="button"
                                                    onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                                                >
                                                    -
                                                </button>
                                                <input 
                                                    type="text" 
                                                    className="form-control text-center" 
                                                    value={item.quantity}
                                                    readOnly
                                                />
                                                <button 
                                                    className="btn btn-outline-secondary" 
                                                    type="button"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <div>
                                                <span className="h5 mb-0 me-3">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </span>
                                                <button 
                                                    className="btn btn-outline-danger btn-sm"
                                                    onClick={() => removeFromCart(item.id)}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Order Summary</h5>
                            <div className="d-flex justify-content-between mb-3">
                                <span>Subtotal</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between mb-3">
                                <span className="h5">Total</span>
                                <span className="h5">${total.toFixed(2)}</span>
                            </div>
                            <button className="btn btn-primary w-100">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
