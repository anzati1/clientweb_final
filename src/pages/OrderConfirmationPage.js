import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const OrderConfirmationPage = () => {
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        const details = localStorage.getItem('lastOrder');
        if (details) {
            setOrderDetails(JSON.parse(details));
        }
    }, []);

    if (!orderDetails) {
        return (
            <div className="container py-5 text-center">
                <h2>No order details found</h2>
                <Link to="/" className="btn btn-primary mt-3">Return to Home</Link>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <div className="card">
                <div className="card-body">
                    <div className="text-center mb-4">
                        <h2 className="text-success mb-3">Order Confirmed!</h2>
                        <p className="lead">Thank you for your purchase</p>
                        <p className="text-muted">Order #{orderDetails.orderNumber}</p>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-4">
                            <h4>Shipping Address</h4>
                            <p>
                                {orderDetails.shippingInfo.fullName}<br />
                                {orderDetails.shippingInfo.address}<br />
                                {orderDetails.shippingInfo.city}, {orderDetails.shippingInfo.province}<br />
                                {orderDetails.shippingInfo.postalCode}
                            </p>
                        </div>
                        <div className="col-md-6 mb-4">
                            <h4>Payment Method</h4>
                            <p>{orderDetails.paymentMethod === 'credit' 
                                ? 'Credit Card' 
                                : orderDetails.paymentMethod === 'debit' 
                                    ? 'Debit Card' 
                                    : 'PayPal'}</p>
                        </div>
                    </div>

                    <h4>Order Summary</h4>
                    <div className="table-responsive mb-4">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Quantity</th>
                                    <th className="text-end">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderDetails.items.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.title}</td>
                                        <td>{item.quantity}</td>
                                        <td className="text-end">${(item.price * item.quantity).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="row justify-content-end">
                        <div className="col-md-4">
                            <div className="d-flex justify-content-between mb-2">
                                <span>Subtotal</span>
                                <span>${orderDetails.subtotal.toFixed(2)}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                                <span>GST (5%)</span>
                                <span>${orderDetails.gst.toFixed(2)}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                                <span>QST (9.975%)</span>
                                <span>${orderDetails.qst.toFixed(2)}</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between">
                                <strong>Total</strong>
                                <strong>${orderDetails.total.toFixed(2)}</strong>
                            </div>
                        </div>
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
