import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-dark text-light py-4 mt-auto">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="/privacy" className="text-light">Privacy Policy</a></li>
                            <li><a href="/terms" className="text-light">Terms of Service</a></li>
                            <li><a href="/contact" className="text-light">Contact Us</a></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h5>Follow Us</h5>
                        <div className="social-links">
                            <a href="#" className="text-light me-3">Facebook</a>
                            <a href="#" className="text-light me-3">Twitter</a>
                            <a href="#" className="text-light">Instagram</a>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <p>© 2024 Your Company Name. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
