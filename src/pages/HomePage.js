import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = ({ addToCart, searchQuery }) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsData, categoriesData] = await Promise.all([
                    api.getAllProducts(),
                    api.getCategories()
                ]);
                const productsWithOriginalPrice = productsData.map(product => ({
                    ...product,
                    originalPrice: (product.price * 1.2).toFixed(2)
                }));
                const formattedCategories = categoriesData.map(category => 
                    typeof category === 'object' ? category.name : category
                );
                setProducts(productsWithOriginalPrice);
                setCategories(formattedCategories);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleViewDetails = (productId) => {
        navigate(`/product/${productId}`);
    };

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

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = !selectedCategory || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-4">
            <h2 className="mb-4">Products</h2>
            <div className="row mb-4">
                <div className="col-md-3">
                    <select
                        className="form-select"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                {filteredProducts.map(product => (
                    <div key={product.id} className="col">
                        <div className="product-card card h-100">
                            <img 
                                src={product.thumbnail} 
                                className="card-img-top p-3" 
                                alt={product.title}
                                style={{ height: '200px', objectFit: 'contain' }}
                            />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title product-title">{product.title}</h5>
                                <div className="rating mb-2">
                                    {renderStars(product.rating)}
                                    <span className="text-muted ms-2">({product.stock} in stock)</span>
                                </div>
                                <div className="price-section mb-3">
                                    <span className="text-success me-2">${product.price.toFixed(2)}</span>
                                    <span className="text-decoration-line-through text-muted">${product.originalPrice}</span>
                                </div>
                                <div className="mt-auto">
                                    <button 
                                        className="btn btn-outline-primary w-100"
                                        onClick={() => handleViewDetails(product.id)}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
