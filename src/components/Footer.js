import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faFacebook, 
    faTwitter, 
    faInstagram, 
    faLinkedin 
} from '@fortawesome/free-brands-svg-icons';
import { 
    faEnvelope, 
    faPhone, 
    faLocationDot 
} from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    const navigationLinks = [
        { slug: 'privacy', name: 'Privacy Policy', url: '/privacy' },
        { slug: 'terms', name: 'Terms of Service', url: '/terms' },
        { slug: 'contact', name: 'Contact Us', url: '/contact' }
    ];

    return (
        <footer className="bg-dark text-white py-4 mt-auto">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h5 className="text-uppercase mb-3">Quick Links</h5>
                        <ul className="list-unstyled footer-links">
                            {navigationLinks.map((link) => (
                                <li key={link.slug}>
                                    <Link to={link.url} className="text-white">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-md-4 text-center">
                        <h5 className="text-uppercase mb-3">Follow Us</h5>
                        <div className="d-flex justify-content-center gap-3">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white footer-social-link">
                                <FontAwesomeIcon icon={faFacebook} size="lg" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white footer-social-link">
                                <FontAwesomeIcon icon={faTwitter} size="lg" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white footer-social-link">
                                <FontAwesomeIcon icon={faInstagram} size="lg" />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white footer-social-link">
                                <FontAwesomeIcon icon={faLinkedin} size="lg" />
                            </a>
                        </div>
                    </div>
                </div>
                <hr className="my-4" />
                <div className="text-center">
                    &copy; {new Date().getFullYear()} CST Store. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
