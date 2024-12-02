import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/product/${product.id}`);
    };

    return (
        <div className="card h-100">
            <img 
                src={product.image} 
                className="card-img-top p-3" 
                alt={product.title}
                style={{ height: '200px', objectFit: 'contain' }}
            />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title" style={{ cursor: 'pointer' }} onClick={handleClick}>
                    {product.title}
                </h5>
                <div className="rating mb-2">
                    {[...Array(5)].map((_, index) => (
                        <span key={index} className={index < Math.round(product.rating.rate) ? 'star filled' : 'star'}>
                            ★
                        </span>
                    ))}
                    <span className="ms-1">({product.rating.count} reviews)</span>
                </div>
                <div className="price-section mb-3">
                    <span className="current-price">${product.price.toFixed(2)}</span>
                    {product.comparePrice && (
                        <span className="compare-price ms-2">${product.comparePrice}</span>
                    )}
                </div>
                <button 
                    className="btn btn-outline-primary w-100"
                    onClick={handleClick}
                >
                    View Details
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
