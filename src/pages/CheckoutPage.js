import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = ({ cart, clearCart }) => {
    const navigate = useNavigate();
    const [shippingInfo, setShippingInfo] = useState({
        fullName: '',
        address: '',
        city: '',
        province: 'QC',
        postalCode: ''
    });

    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: ''
    });

    const [paymentMethod, setPaymentMethod] = useState('credit');

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const gst = subtotal * 0.05;
    const qst = subtotal * 0.09975;
    const total = subtotal + gst + qst;

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const processingMessage = document.getElementById('processingMessage');
            processingMessage.style.display = 'block';

            await new Promise(resolve => setTimeout(resolve, 2000));

            const orderDetails = {
                orderNumber: Math.floor(Math.random() * 1000000),
                shippingInfo,
                paymentMethod,
                subtotal,
                gst,
                qst,
                total,
                items: cart
            };
            localStorage.setItem('lastOrder', JSON.stringify(orderDetails));

            clearCart();
            
            navigate('/order-confirmation');
        } catch (error) {
            alert('Payment processing failed. Please try again.');
        }
    };

    return (
        <div className="container py-4">
            <h2 className="mb-4">Checkout</h2>
            <div className="row">
                <div className="col-md-8">
                    <form onSubmit={handleSubmit}>
                        {/* Shipping Information */}
                        <div className="card mb-4">
                            <div className="card-body">
                                <h3 className="card-title mb-4">Shipping Information</h3>
                                <div className="mb-3">
                                    <label className="form-label">Full Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        required
                                        value={shippingInfo.fullName}
                                        onChange={(e) => setShippingInfo({
                                            ...shippingInfo,
                                            fullName: e.target.value
                                        })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Street Address</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        required
                                        value={shippingInfo.address}
                                        onChange={(e) => setShippingInfo({
                                            ...shippingInfo,
                                            address: e.target.value
                                        })}
                                    />
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">City</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            required
                                            value={shippingInfo.city}
                                            onChange={(e) => setShippingInfo({
                                                ...shippingInfo,
                                                city: e.target.value
                                            })}
                                        />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label className="form-label">Province</label>
                                        <select
                                            className="form-select"
                                            value={shippingInfo.province}
                                            onChange={(e) => setShippingInfo({
                                                ...shippingInfo,
                                                province: e.target.value
                                            })}
                                        >
                                            <option value="QC">Quebec</option>
                                            <option value="ON">Ontario</option>
                                            <option value="BC">British Columbia</option>
                                            {/* Add other provinces */}
                                        </select>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label className="form-label">Postal Code</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            required
                                            value={shippingInfo.postalCode}
                                            onChange={(e) => setShippingInfo({
                                                ...shippingInfo,
                                                postalCode: e.target.value
                                            })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="card mb-4">
                            <div className="card-body">
                                <h3 className="card-title mb-4">Payment Method</h3>
                                <div className="mb-3">
                                    <select
                                        className="form-select"
                                        value={paymentMethod}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    >
                                        <option value="credit">Credit Card</option>
                                        <option value="debit">Debit Card</option>
                                        <option value="paypal">PayPal</option>
                                    </select>
                                </div>

                                {paymentMethod === 'credit' || paymentMethod === 'debit' ? (
                                    <>
                                        <div className="mb-3">
                                            <label className="form-label">Card Number</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                required
                                                maxLength="16"
                                                value={paymentInfo.cardNumber}
                                                onChange={(e) => setPaymentInfo({
                                                    ...paymentInfo,
                                                    cardNumber: e.target.value.replace(/\D/g, '')
                                                })}
                                            />
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Expiry Date</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="MM/YY"
                                                    required
                                                    maxLength="5"
                                                    value={paymentInfo.expiryDate}
                                                    onChange={(e) => setPaymentInfo({
                                                        ...paymentInfo,
                                                        expiryDate: e.target.value
                                                    })}
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">CVV</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    required
                                                    maxLength="3"
                                                    value={paymentInfo.cvv}
                                                    onChange={(e) => setPaymentInfo({
                                                        ...paymentInfo,
                                                        cvv: e.target.value.replace(/\D/g, '')
                                                    })}
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Cardholder Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                required
                                                value={paymentInfo.cardholderName}
                                                onChange={(e) => setPaymentInfo({
                                                    ...paymentInfo,
                                                    cardholderName: e.target.value
                                                })}
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <p className="text-muted">You will be redirected to PayPal to complete your payment.</p>
                                )}
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary btn-lg w-100">
                            Place Order
                        </button>
                        <div id="processingMessage" style={{ display: 'none' }} className="alert alert-info mt-3">
                            Processing your payment...
                        </div>
                    </form>
                </div>

                {/* Order Summary */}
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Order Summary</h5>
                            <div className="d-flex justify-content-between mb-2">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                                <span>GST (5%)</span>
                                <span>${gst.toFixed(2)}</span>
                            </div>
                            {qst > 0 && (
                                <div className="d-flex justify-content-between mb-2">
                                    <span>QST (9.975%)</span>
                                    <span>${qst.toFixed(2)}</span>
                                </div>
                            )}
                            <hr />
                            <div className="d-flex justify-content-between mb-3">
                                <span className="h5">Total</span>
                                <span className="h5">${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
