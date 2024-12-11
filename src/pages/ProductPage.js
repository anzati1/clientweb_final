import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import './ProductPage.css';

const getLocalReviews = (productId) => {
    const localReviews = localStorage.getItem(`reviews_${productId}`);
    return localReviews ? JSON.parse(localReviews) : [];
};

const saveLocalReviews = (productId, reviews) => {
    localStorage.setItem(`reviews_${productId}`, JSON.stringify(reviews));
};

const ProductPage = ({ addToCart }) => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [allReviews, setAllReviews] = useState([]);
    const [newReview, setNewReview] = useState({
        rating: 5,
        comment: ''
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await api.getProductById(id);
                const localReviews = getLocalReviews(id);
                const combinedReviews = [...data.reviews || [], ...localReviews];
                
                setProduct(data);
                setAllReviews(combinedReviews);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <span 
                key={index}
                className={`star ${index < Math.round(rating) ? 'filled' : 'empty'}`}
                style={{ color: index < Math.round(rating) ? '#ffc107' : '#e4e5e9' }}
            >
                ★
            </span>
        ));
    };

    const calculateAverageRating = () => {
        if (allReviews.length === 0) return 0;
        const totalRating = allReviews.reduce((sum, review) => sum + review.rating, 0);
        return Number((totalRating / allReviews.length).toFixed(1));
    };

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        const review = {
            id: Date.now(),
            user: newReview.user || "Anonymous",
            rating: parseInt(newReview.rating),
            comment: newReview.comment,
            date: new Date().toISOString(),
            isLocal: true
        };

        const updatedReviews = [...allReviews, review];
        setAllReviews(updatedReviews);
        
        const localReviews = getLocalReviews(id);
        saveLocalReviews(id, [...localReviews, review]);
        
        setNewReview({ rating: 5, comment: '', user: '' });
    };

    const renderEmptyStars = (onClick) => {
        return [...Array(5)].map((_, index) => (
            <span 
                key={index} 
                className={`star ${index < 1 ? 'filled' : 'empty'}`}
                onClick={() => onClick(index + 1)}
                style={{ cursor: 'pointer' }}
            >
                {index < 1 ? '★' : '☆'}
            </span>
        ));
    };

    const reviewForm = (
        <div className="mt-4">
            <h4>Leave a Review</h4>
            <form onSubmit={handleReviewSubmit}>
                <div className="mb-3">
                    <label className="d-block mb-2">Rating:</label>
                    <div className="star-rating mb-2">
                        {[...Array(5)].map((_, index) => (
                            <span 
                                key={index}
                                className={`star ${index < newReview.rating ? 'filled' : 'empty'}`}
                                onClick={() => setNewReview({...newReview, rating: index + 1})}
                                style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                            >
                                {index < newReview.rating ? '★' : '☆'}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="mb-3">
                    <textarea 
                        className="form-control"
                        rows="3"
                        value={newReview.comment}
                        onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                        placeholder="Give your review"
                        required
                    ></textarea>
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Your Name (Optional)"
                        value={newReview.user || ''}
                        onChange={(e) => setNewReview({...newReview, user: e.target.value})}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit Review
                </button>
            </form>
        </div>
    );

    const generateQRValue = (product) => {
        return `${window.location.origin}/product/${product.id}`;
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
                    <div className="product-image-container">
                        <img 
                            src={product.thumbnail} 
                            className="card-img-top p-3 zoom-image" 
                            alt={product.title}
                            onMouseMove={(e) => {
                                const { left, top, width, height } = e.target.getBoundingClientRect();
                                const x = (e.clientX - left) / width * 100;
                                const y = (e.clientY - top) / height * 100;
                                e.target.style.transformOrigin = `${x}% ${y}%`;
                            }}
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <h1 className="mb-3">{product.title}</h1>
                    <p className="text-muted mb-2">
                        Category: {
                            typeof product.category === 'string'
                                ? product.category.charAt(0).toUpperCase() + product.category.slice(1)
                                : product.category.name.charAt(0).toUpperCase() + product.category.name.slice(1)
                        }
                    </p>
                    <p className="text-muted mb-4">{product.description}</p>
                    
                    <div className="mb-3">
                        <span className="text-decoration-line-through text-muted me-2">
                            ${(product.price * 1.2).toFixed(2)}
                        </span>
                        <span className="h3 text-primary">${product.price.toFixed(2)}</span>
                    </div>

                    <div className="mb-3">
                        <div className="d-flex align-items-center">
                            {renderStars(calculateAverageRating())}
                            <span className="ms-2">
                                {calculateAverageRating()} out of 5
                            </span>
                            <span className="ms-2 text-muted">
                                ({allReviews.length} {allReviews.length === 1 ? 'review' : 'reviews'})
                            </span>
                        </div>
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
                                    <h4 className="mb-0 me-2">{calculateAverageRating()}</h4>
                                    <div>{renderStars(calculateAverageRating())}</div>
                                    <span className="ms-2 text-muted">Based on {allReviews.length} reviews</span>
                                </div>
                            </div>
                            {allReviews.map(review => (
                                <div key={review.id} className="card mb-3">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <div>
                                                {renderStars(review.rating)}
                                                <span className="ms-2 text-muted">
                                                    {review.rating}/5
                                                </span>
                                            </div>
                                            <small className="text-muted">
                                                {new Date(review.date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </small>
                                        </div>
                                        <p className="card-text mb-2">{review.comment}</p>
                                        <footer className="text-muted">
                                            <small>By {review.user || 'Anonymous'}</small>
                                        </footer>
                                    </div>
                                </div>
                            ))}
                            {reviewForm}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
