import "./Home.css";
import { Link } from "react-router-dom";
import banner1 from "/src/assets/images/sweets-banner-1.png"
import banner2 from "/src/assets/images/daal-baati-chruma-platter.png"
import banner3 from "/src/assets/images/sweets-banner.png"
import cardImg1 from "/src/assets/images/daal-baati-chruma-platter.png"
import cardImg2 from "/src/assets/images/gatte-ki-sabji.png"
import cardImg3 from "/src/assets/images/ker-sangri.png"

function Home() {
  return (
    <div className="home-page">

      {/* HERO CAROUSEL */}
      <div
        id="mewarCarousel"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        {/* Indicators */}
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#mewarCarousel" data-bs-slide-to="0" className="active"></button>
          <button type="button" data-bs-target="#mewarCarousel" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#mewarCarousel" data-bs-slide-to="2"></button>
        </div>

        <div className="carousel-inner">
          <div className="carousel-item active">
            <picture>
              <source media="(max-width: 768px)" srcSet={banner1} />
              <img src={banner1} className="d-block w-100 carousel-img" alt="Dal Baati Churma" />
            </picture>
            <div className="carousel-caption">
              <h1 className="carousel-title">Authentic Rajasthani Flavours</h1>
              <p className="carousel-subtitle">The royal taste of Mewar</p>
              <Link to="/products/main">
                <button className="carousel-btn">Explore Main Course</button>
              </Link>
            </div>
          </div>

          <div className="carousel-item">
            <picture>
              <source media="(max-width: 768px)" srcSet={banner2} />
              <img src={banner2} className="d-block w-100 carousel-img" alt="Rajasthani Thali" />
            </picture>
            <div className="carousel-caption">
              <h1 className="carousel-title">Cooked with Tradition</h1>
              <p className="carousel-subtitle">Passed through generations</p>
              <Link to="/menu">
                <button className="carousel-btn">Browse All Menu</button>
              </Link>
            </div>
          </div>

          <div className="carousel-item">
            <picture>
              <source media="(max-width: 768px)" srcSet={banner3} />
              <img src={banner3} className="d-block w-100 carousel-img" alt="Indian Sweets" />
            </picture>
            <div className="carousel-caption">
              <h1 className="carousel-title">Royal Sweets of Rajasthan</h1>
              <p className="carousel-subtitle">A taste of celebration</p>
              <Link to="/products/sweets">
                <button className="carousel-btn">Shop Sweets</button>
              </Link>
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        <button className="carousel-control-prev" type="button" data-bs-target="#mewarCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#mewarCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      {/* CATEGORY QUICK ACCESS */}
      <section className="category-section">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="category-grid">
            <Link to="/products/main" className="category-card main-course">
              <div className="category-icon">🍲</div>
              <h3>Main Course</h3>
              <p>Traditional & Royal Dishes</p>
            </Link>

            <Link to="/products/snacks" className="category-card snacks">
              <div className="category-icon">🥙</div>
              <h3>Snacks</h3>
              <p>Crispy & Delicious Bites</p>
            </Link>

            <Link to="/products/sweets" className="category-card sweets">
              <div className="category-icon">🍰</div>
              <h3>Sweets</h3>
              <p>Royal Desserts & Treats</p>
            </Link>

            <Link to="/products/all" className="category-card all-items">
              <div className="category-icon">👑</div>
              <h3>All Items</h3>
              <p>Complete Menu</p>
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED SIGNATURE DISHES */}
      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">⭐ Signature Dishes</h2>
          <p className="section-subtitle">Handpicked delicacies loved across Rajasthan</p>

          <div className="row g-4">
            <div className="col-lg-4 col-md-6 col-sm-6 col-12">
              <div className="dish-card">
                <div className="dish-img-wrapper">
                  <img src={cardImg1} alt="Dal Baati Churma" className="dish-img" />
                  <div className="dish-overlay">
                    <span className="dish-badge">Most Popular</span>
                  </div>
                </div>
                <div className="dish-info">
                  <h4>Dal Baati Churma</h4>
                  <p className="dish-description">Iconic Mewar specialty cooked traditionally with ghee</p>
                  <div className="dish-rating">⭐⭐⭐⭐⭐ (248 reviews)</div>
                  <Link to="/products/main">
                    <button className="btn-view-more">View Recipe →</button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-6 col-12">
              <div className="dish-card">
                <div className="dish-img-wrapper">
                  <img src={cardImg2} alt="Gatte ki Sabzi" className="dish-img" />
                  <div className="dish-overlay">
                    <span className="dish-badge specialty-badge">Chef's Choice</span>
                  </div>
                </div>
                <div className="dish-info">
                  <h4>Gatte ki Sabzi</h4>
                  <p className="dish-description">Spiced gram flour dumplings in yogurt gravy</p>
                  <div className="dish-rating">⭐⭐⭐⭐⭐ (156 reviews)</div>
                  <Link to="/products/main">
                    <button className="btn-view-more">View Recipe →</button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-6 col-12">
              <div className="dish-card">
                <div className="dish-img-wrapper">
                  <img src={cardImg3} alt="Ker Sangri" className="dish-img" />
                  <div className="dish-overlay">
                    <span className="dish-badge sweets-badge">Customer Favorite</span>
                  </div>
                </div>
                <div className="dish-info">
                  <h4>Ker Sangri</h4>
                  <p className="dish-description">A desert delicacy with rich flavors & authenticity</p>
                  <div className="dish-rating">⭐⭐⭐⭐⭐ (189 reviews)</div>
                  <Link to="/products/main">
                    <button className="btn-view-more">View Recipe →</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY MEWAR DELIGHTS */}
      <section className="why-section">
        <div className="container">
          <h2 className="why-title">Why Mewar Delights?</h2>

          <div className="benefits-grid">
            <div className="benefit-item">
              <div className="benefit-icon">👑</div>
              <h5>Royal Recipes</h5>
              <p>Authentic dishes inspired by Mewar royal kitchens</p>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">🌾</div>
              <h5>Fresh Ingredients</h5>
              <p>Sourced carefully for quality and authentic taste</p>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">❤️</div>
              <h5>Made with Care</h5>
              <p>Every dish prepared with passion and tradition</p>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">⚡</div>
              <h5>Quick Delivery</h5>
              <p>Fresh orders delivered to your doorstep fast</p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">💬 What Our Customers Say</h2>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">"Absolutely authentic! Tastes just like homemade Rajasthani food. Best quality and quick delivery!"</p>
              <p className="testimonial-author">- Priya Singh</p>
            </div>

            <div className="testimonial-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">"The Dal Baati Churma is incredible! Brings back childhood memories of my grandmother's cooking."</p>
              <p className="testimonial-author">- Rahul Patel</p>
            </div>

            <div className="testimonial-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">"Mewar Delights never disappoints. Every order is packed with care and arrives fresh!"</p>
              <p className="testimonial-author">- Anjali Sharma</p>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Experience Royal Taste at Home</h2>
          <p className="cta-subtitle">Order authentic Rajasthani food today and taste the tradition</p>
          
          <div className="cta-buttons">
            <Link to="/menu">
              <button className="btn-cta primary">Browse Full Menu</button>
            </Link>
            <Link to="/products/main">
              <button className="btn-cta secondary">View Main Course</button>
            </Link>
          </div>
        </div>
      </section>

      {/* NEWSLETTER SECTION */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-box">
            <h3>Subscribe to Our Newsletter</h3>
            <p>Get exclusive offers, recipes, and updates delivered to your inbox</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email" />
              <button className="btn-subscribe">Subscribe</button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;
