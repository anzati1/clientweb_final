import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className="bg-dark text-white py-4 mt-auto">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h5 className="text-uppercase">Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-white text-decoration-none">Privacy Policy</a></li>
                            <li><a href="#" className="text-white text-decoration-none">Terms of Service</a></li>
                            <li><a href="#" className="text-white text-decoration-none">Contact Us</a></li>
                        </ul>
                    </div>
                    <div className="col-md-4 text-center">
                        <h5 className="text-uppercase mb-3">Follow Us</h5>
                        <div className="d-flex justify-content-center gap-3">
                            <a href="#" className="text-white">
                                <FontAwesomeIcon icon={faFacebook} size="lg" />
                            </a>
                            <a href="#" className="text-white">
                                <FontAwesomeIcon icon={faTwitter} size="lg" />
                            </a>
                            <a href="#" className="text-white">
                                <FontAwesomeIcon icon={faInstagram} size="lg" />
                            </a>
                            <a href="#" className="text-white">
                                <FontAwesomeIcon icon={faLinkedin} size="lg" />
                            </a>
                        </div>
                    </div>
                    <div className="col-md-4">
                    </div>
                </div>
                <div className="text-center mt-3">
                    &copy; 2024 CST Store. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
