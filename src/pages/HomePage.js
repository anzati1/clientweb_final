import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import ProductCard from '../components/ProductCard';

const HomePage = ({ addToCart, searchQuery }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [productsData, categoriesData] = await Promise.all([
                    api.getAllProducts(0, 20),
                    api.getAllCategories()
                ]);
                setProducts(productsData.products);
                setFilteredProducts(productsData.products);
                setCategories(categoriesData);
                setHasMore(productsData.total > productsData.products.length);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchInitialData();
    }, []);

    useEffect(() => {
        const filterProducts = () => {
            let filtered = [...products];
            
            if (selectedCategory) {
                filtered = filtered.filter(product => 
                    typeof product.category === 'object' 
                        ? product.category.name === selectedCategory
                        : product.category === selectedCategory
                );
            }
            
            filtered = filtered.filter(product => 
                product.price >= priceRange.min && 
                product.price <= priceRange.max
            );
            
            if (searchQuery) {
                filtered = filtered.filter(product =>
                    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    product.description.toLowerCase().includes(searchQuery.toLowerCase())
                );
            }
            
            setFilteredProducts(filtered);
        };
        
        filterProducts();
    }, [products, selectedCategory, priceRange, searchQuery]);

    const loadMore = async () => {
        if (!hasMore) return;
        
        const nextPage = page + 1;
        try {
            const response = await api.getAllProducts(nextPage * 20, 20);
            setProducts(prev => [...prev, ...response.products]);
            setPage(nextPage);
            setHasMore(response.total > (nextPage + 1) * 20);
        } catch (error) {
            console.error('Error loading more products:', error);
        }
    };

    return (
        <div className="container py-4">
            <div className="row mb-4">
                <div className="col-md-3">
                    <div className="filter-section">
                        <h4>Filters</h4>
                        <div className="mb-3">
                            <label className="form-label">Category</label>
                            <select 
                                className="form-select"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option value="">All Categories</option>
                                {categories.map(category => (
                                    <option 
                                        key={typeof category === 'string' ? category : category.name} 
                                        value={typeof category === 'string' ? category : category.name}
                                    >
                                        {typeof category === 'string' ? category : category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Price Range</label>
                            <div className="d-flex gap-2">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Min"
                                    value={priceRange.min}
                                    onChange={(e) => setPriceRange(prev => ({
                                        ...prev,
                                        min: Number(e.target.value)
                                    }))}
                                />
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Max"
                                    value={priceRange.max}
                                    onChange={(e) => setPriceRange(prev => ({
                                        ...prev,
                                        max: Number(e.target.value)
                                    }))}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {filteredProducts.map(product => (
                            <div key={product.id} className="col">
                                <ProductCard product={product} addToCart={addToCart} />
                            </div>
                        ))}
                    </div>
                    {hasMore && (
                        <div className="text-center mt-4">
                            <button 
                                className="btn btn-primary"
                                onClick={loadMore}
                            >
                                Load More
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
