import React from 'react';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white py-4 mt-auto">
      <div className="container text-center">
        <div className="row">
          <div className="col-md-4">
            <h5>Weather App</h5>
            <p className="small">Get accurate weather forecasts for any location</p>
          </div>
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white text-decoration-none">Home</a></li>
              <li><a href="/#about" className="text-white text-decoration-none">About</a></li>
              <li><a href="/#contact" className="text-white text-decoration-none">Contact</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Connect With Us</h5>
            <div className="d-flex justify-content-center">
              <a href="#!" className="text-white me-3"><i className="fab fa-facebook-f"></i></a>
              <a href="#!" className="text-white me-3"><i className="fab fa-twitter"></i></a>
              <a href="#!" className="text-white me-3"><i className="fab fa-instagram"></i></a>
              <a href="#!" className="text-white"><i className="fab fa-github"></i></a>
            </div>
          </div>
        </div>
        <hr className="my-3" />
        <p className="mb-0">&copy; {new Date().getFullYear()} Weather App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;