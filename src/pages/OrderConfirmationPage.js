import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';

const OrderConfirmationPage = () => {
    const { state } = useLocation();
    
    if (!state || !state.orderDetails) {
        return <Navigate to="/" replace />;
    }

    const { orderDetails } = state;
    
    return (
        <div className="container py-5">
            <div className="card">
                <div className="card-body">
                    <div className="text-center mb-4">
                        <h2 className="card-title">Thank You for Your Order!</h2>
                        <p className="text-muted">Your order has been confirmed</p>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-4">
                            <h5>Shipping Address</h5>
                            <p>
                                {orderDetails.shipping.name}<br />
                                {orderDetails.shipping.address}<br />
                                {orderDetails.shipping.city}, {orderDetails.shipping.province}<br />
                                {orderDetails.shipping.postalCode}
                            </p>
                        </div>
                        <div className="col-md-6 mb-4">
                            <h5>Payment Method</h5>
                            <p>{orderDetails.payment === 'credit' ? 'Credit Card' : 'PayPal'}</p>
                        </div>
                    </div>

                    <h5>Order Summary</h5>
                    {orderDetails.items.map(item => (
                        <div key={item.id} className="d-flex justify-content-between align-items-center mb-2">
                            <span>{item.title} × {item.quantity}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                    <hr />
                    <div className="d-flex justify-content-between mb-2">
                        <span>Subtotal</span>
                        <span>${orderDetails.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                        <span>GST (5%)</span>
                        <span>${orderDetails.gst.toFixed(2)}</span>
                    </div>
                    {orderDetails.qst > 0 && (
                        <div className="d-flex justify-content-between mb-2">
                            <span>QST (9.975%)</span>
                            <span>${orderDetails.qst.toFixed(2)}</span>
                        </div>
                    )}
                    <div className="d-flex justify-content-between mt-3">
                        <span className="h5">Total</span>
                        <span className="h5">${orderDetails.total.toFixed(2)}</span>
                    </div>

                    <div className="text-center mt-4">
                        <Link to="/" className="btn btn-primary">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmationPage;
