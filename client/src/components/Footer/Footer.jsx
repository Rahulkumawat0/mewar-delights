import "./Footer.css";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

function Footer() {
  return (
    <footer className="royal-footer">
      <div className="container">
        <div className="row">

          {/* Brand */}
          <div className="col-md-4 footer-section">
            <img
                src={logo}
                alt="Mewar Delights Logo"
                className="footer-logo mb-3"
            />
            <p>
              Bringing the authentic flavors of Rajasthan to your table,
              inspired by royal kitchens of Mewar.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 footer-section my-5">
            <h5>Quick Links</h5>
            <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/menu">Menu</Link></li>
                <li><Link to="/menu">Login</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-4 footer-section my-5">
            <h5>Contact</h5>
            <p>Email: <a href="mailto:support@mewardelights.com">support@mewardelights.com </a></p>
            <p>Phone:<a href="tel: +918780948614"> +91 87809 48614</a></p>
          </div>

        </div>

        <hr />

        <div className="text-center footer-bottom">
          <p>© {new Date().getFullYear()} Mewar Delights. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
