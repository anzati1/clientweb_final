import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';

const ProductPage = ({ addToCart }) => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reviews] = useState([
        {
            id: 1,
            user: "John D.",
            rating: 4,
            comment: "Great product, exactly as described!",
            date: "2024-02-15"
        },
        {
            id: 2,
            user: "Sarah M.",
            rating: 5,
            comment: "Excellent quality and fast shipping.",
            date: "2024-02-10"
        },
        {
            id: 3,
            user: "Mike R.",
            rating: 3,
            comment: "Good product but delivery took longer than expected.",
            date: "2024-02-05"
        }
    ]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await api.getProductById(id);
                data.originalPrice = (data.price * 1.2).toFixed(2);
                data.availability = "In Stock";
                data.qrCode = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=product" + data.id;
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <span 
                    key={i} 
                    className={i < Math.round(rating) ? "text-warning" : "text-muted"}
                >
                    ★
                </span>
            );
        }
        return stars;
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (!product) {
        return <div className="container mt-4">Product not found</div>;
    }

    return (
        <div className="container py-4">
            <div className="row">
                <div className="col-md-6">
                    <img 
                        src={product.image} 
                        className="img-fluid" 
                        alt={product.title}
                        style={{ maxHeight: '500px', objectFit: 'contain' }}
                    />
                </div>
                <div className="col-md-6">
                    <h1 className="mb-3">{product.title}</h1>
                    <p className="text-muted mb-4">{product.description}</p>
                    
                    <div className="mb-3">
                        <span className="text-decoration-line-through text-muted me-2">${product.originalPrice}</span>
                        <span className="h3 text-primary">${product.price.toFixed(2)}</span>
                    </div>

                    <div className="mb-3">
                        {renderStars(product.rating.rate)}
                        <span className="ms-2 text-muted">({product.rating.count} reviews)</span>
                    </div>

                    <div className="mb-4">
                        <strong>Availability:</strong> <span className="text-success">{product.availability}</span>
                    </div>

                    <button 
                        className="btn btn-primary btn-lg mb-4"
                        onClick={() => addToCart(product)}
                    >
                        Add to Cart
                    </button>

                    <div>
                        <h5>Product QR Code:</h5>
                        <img 
                            src={product.qrCode}
                            alt="Product QR Code"
                            style={{ width: '128px', height: '128px' }}
                        />
                    </div>

                    <div className="row mt-5">
                        <div className="col-12">
                            <h3>Customer Reviews</h3>
                            <div className="mb-4">
                                <div className="d-flex align-items-center mb-2">
                                    <h4 className="mb-0 me-2">{product.rating.rate}</h4>
                                    <div>{renderStars(product.rating.rate)}</div>
                                    <span className="ms-2 text-muted">Based on {product.rating.count} reviews</span>
                                </div>
                            </div>
                            {reviews.map(review => (
                                <div key={review.id} className="card mb-3">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between mb-2">
                                            <div>
                                                <strong>{review.user}</strong>
                                                <div className="text-warning">
                                                    {renderStars(review.rating)}
                                                </div>
                                            </div>
                                            <small className="text-muted">{review.date}</small>
                                        </div>
                                        <p className="card-text">{review.comment}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
