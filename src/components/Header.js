import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Header = ({ searchQuery, setSearchQuery, handleSearch, cartItemCount }) => {
    return (
        <header className="site-header border-bottom">
            <div className="container d-flex align-items-center py-2">
                <Link to="/" className="header-logo d-flex align-items-center text-decoration-none me-4">
                    <img src={logo} alt="CST Store" className="logo-image" />
                    <span className="store-name ms-2">CST Store</span>
                </Link>
                
                <form className="search-form flex-grow-1 me-4" onSubmit={handleSearch}>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search products"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button className="btn btn-outline-primary" type="submit">
                            Search
                        </button>
                    </div>
                </form>
                
                <Link to="/cart" className="cart-link btn btn-outline-dark">
                    Cart
                    {cartItemCount > 0 && (
                        <span className="ms-1 badge bg-primary rounded-pill">
                            {cartItemCount}
                        </span>
                    )}
                </Link>
            </div>
        </header>
    );
};

export default Header;
