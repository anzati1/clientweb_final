import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, addToCart }) => {
    return (
        <div className="card h-100 product-card">
            <img 
                src={product.thumbnail} 
                className="card-img-top p-2" 
                alt={product.title}
                style={{ height: '200px', objectFit: 'contain' }}
            />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title product-title">{product.title}</h5>
                <p className="card-text text-muted mb-2">{product.category}</p>
                <div className="rating mb-2">
                    {[...Array(5)].map((_, i) => (
                        <span key={i} className={`star ${i < Math.round(product.rating) ? 'filled' : ''}`}>★</span>
                    ))}
                    <span className="ms-1 text-muted">({product.rating})</span>
                </div>
                <div className="mt-auto">
                    <div className="mb-2">
                        <span className="text-decoration-line-through text-muted me-2">
                            ${(product.price * 1.2).toFixed(2)}
                        </span>
                        <span className="current-price">${product.price}</span>
                    </div>
                    <div className="d-flex gap-2">
                        <Link to={`/product/${product.id}`} className="btn btn-outline-primary flex-grow-1">
                            View Details
                        </Link>
                        <button 
                            className="btn btn-primary"
                            onClick={() => addToCart(product)}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
