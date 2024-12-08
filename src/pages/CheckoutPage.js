import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = ({ cart }) => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [shippingInfo, setShippingInfo] = useState({
        name: '',
        address: '',
        city: '',
        province: '',
        postalCode: ''
    });
    const [paymentMethod, setPaymentMethod] = useState('credit');

    // Calculate subtotal from cart
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    // Calculate taxes based on province
    const calculateTaxes = () => {
        const gst = subtotal * 0.05; // 5% GST
        const qst = shippingInfo.province.toUpperCase() === 'QC' ? subtotal * 0.09975 : 0; // 9.975% QST for Quebec
        return { gst, qst };
    };

    const { gst, qst } = calculateTaxes();
    const total = subtotal + gst + qst;

    const handleShippingSubmit = (e) => {
        e.preventDefault();
        // Validate all shipping fields are filled
        if (Object.values(shippingInfo).every(value => value.trim() !== '')) {
            setStep(2);
        }
    };

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        setStep(3);
    };

    const handleOrderConfirm = () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        navigate('/order-confirmation', { 
            state: { 
                orderDetails: {
                    items: cart,
                    shipping: shippingInfo,
                    payment: paymentMethod,
                    subtotal,
                    gst,
                    qst,
                    total
                }
            }
        });
    };

    return (
        <div className="container py-4">
            <div className="row">
                <div className="col-md-8">
                    {step === 1 && (
                        <div className="card">
                            <div className="card-body">
                                <h3 className="card-title mb-4">Shipping Information</h3>
                                <form onSubmit={handleShippingSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">Full Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            required
                                            value={shippingInfo.name}
                                            onChange={(e) => setShippingInfo({
                                                ...shippingInfo,
                                                name: e.target.value
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
                                    <div className="row mb-3">
                                        <div className="col">
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
                                        <div className="col">
                                            <label className="form-label">Province</label>
                                            <select
                                                className="form-select"
                                                required
                                                value={shippingInfo.province}
                                                onChange={(e) => setShippingInfo({
                                                    ...shippingInfo,
                                                    province: e.target.value
                                                })}
                                            >
                                                <option value="">Select Province</option>
                                                <option value="QC">Quebec</option>
                                                <option value="ON">Ontario</option>
                                                <option value="BC">British Columbia</option>
                                                {/* Add other provinces */}
                                            </select>
                                        </div>
                                        <div className="col">
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
                                    <button type="submit" className="btn btn-primary">
                                        Continue to Payment
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="card">
                            <div className="card-body">
                                <h3 className="card-title mb-4">Payment Method</h3>
                                <form onSubmit={handlePaymentSubmit}>
                                    <div className="mb-4">
                                        <div className="form-check mb-2">
                                            <input
                                                type="radio"
                                                className="form-check-input"
                                                name="paymentMethod"
                                                id="credit"
                                                value="credit"
                                                checked={paymentMethod === 'credit'}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                            />
                                            <label className="form-check-label" htmlFor="credit">
                                                Credit Card
                                            </label>
                                        </div>
                                        <div className="form-check mb-2">
                                            <input
                                                type="radio"
                                                className="form-check-input"
                                                name="paymentMethod"
                                                id="paypal"
                                                value="paypal"
                                                checked={paymentMethod === 'paypal'}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                            />
                                            <label className="form-check-label" htmlFor="paypal">
                                                PayPal
                                            </label>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        Review Order
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="card">
                            <div className="card-body">
                                <h3 className="card-title mb-4">Order Review</h3>
                                <div className="mb-4">
                                    <h5>Shipping Address</h5>
                                    <p>
                                        {shippingInfo.name}<br />
                                        {shippingInfo.address}<br />
                                        {shippingInfo.city}, {shippingInfo.province} {shippingInfo.postalCode}
                                    </p>
                                </div>
                                <div className="mb-4">
                                    <h5>Payment Method</h5>
                                    <p>{paymentMethod === 'credit' ? 'Credit Card' : 'PayPal'}</p>
                                </div>
                                <button 
                                    className="btn btn-primary"
                                    onClick={handleOrderConfirm}
                                >
                                    Place Order
                                </button>
                            </div>
                        </div>
                    )}
                </div>

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
