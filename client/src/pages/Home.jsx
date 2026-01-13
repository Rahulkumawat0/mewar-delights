import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">

        {/* HERO CAROUSEL */}
        <div
            id="mewarCarousel"
            className="carousel slide"
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
                {/* Mobile image */}
                <source
                media="(max-width: 768px)"
                srcSet="/src/assets/images/sweets-banner-1.png"
                />

                {/* Desktop image (default) */}
                <img
                src="/src/assets/images/sweets-banner-1.png"
                className="d-block w-100 carousel-img"
                alt="Dal Baati Churma"
                />
            </picture>
            <div className="carousel-caption">
              <h1>Authentic Rajasthani Flavours</h1>
              <p>The royal taste of Mewar</p>
            </div>
          </div>

          <div className="carousel-item">
            <picture>
                {/* Mobile image */}
                <source
                media="(max-width: 768px)"
                srcSet="/src/assets/images/daal-baati-chruma-platter.png"
                />

                {/* Desktop image (default) */}
                <img
                src="/src/assets/images/daal-baati-chruma-platter.png"
                className="d-block w-100 carousel-img"
                alt="Rajasthani Thali"
                />
            </picture>
            <div className="carousel-caption">
              <h1>Cooked with Tradition</h1>
              <p>Passed through generations</p>
            </div>
          </div>

          <div className="carousel-item">
            <picture>
                {/* Mobile image */}
                <source
                media="(max-width: 768px)"
                srcSet="/src/assets/images/sweets-banner.png"
                />

                {/* Desktop image (default) */}
                <img
                src="/src/assets/images/sweets-banner.png"
                className="d-block w-100 carousel-img"
                alt="Indian Sweets"
                />
            </picture>
            <div className="carousel-caption">
              <h1>Royal Sweets of Rajasthan</h1>
              <p>A taste of celebration</p>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURED DISHES */}
      <section className="featured-section text-center">
        <h2>Signature Dishes</h2>
        <p className="section-subtitle">
          Handpicked delicacies loved across Rajasthan
        </p>

        <div className="container">
          <div className="row g-4">
            <div className="col-md-4">
              <div className="dish-card">
                <img
                    src="/src/assets/images/daal-baati-chruma-platter.png"
                    alt="Dal Baati Churma"
                    className="dish-img img-fluid"
                />
                <h4>Dal Baati Churma</h4>
                <p>Iconic Mewar specialty cooked traditionally</p>
                </div>
            </div>

            <div className="col-md-4">
              <div className="dish-card">
                <img
                    src="/src/assets/images/gatte-ki-sabji.png"
                    alt="Gatte ki Sabji"
                    className="dish-img img-fluid" 
                />
                <h4>Gatte ki Sabzi</h4>
                <p>Spiced gram flour dumplings in yogurt gravy</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="dish-card">
                <img
                    src="/src/assets/images/ker-sangri.png"
                    alt="Gatte ki Sabji"
                    className="dish-img img-fluid" 
                />
                <h4>Ker Sangri</h4>
                <p>A desert delicacy with rich flavors</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY MEWAR DELIGHTS */}
      <section className="why-section">
        <div className="container text-center">
          <h2>Why Mewar Delights?</h2>

          <div className="row mt-4">
            <div className="col-md-4">
              <h5>Royal Recipes</h5>
              <p>Authentic dishes inspired by Mewar kitchens</p>
            </div>

            <div className="col-md-4">
              <h5>Fresh Ingredients</h5>
              <p>Sourced carefully for quality and taste</p>
            </div>

            <div className="col-md-4">
              <h5>Made with Care</h5>
              <p>Every dish prepared with passion</p>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="cta-section text-center">
        <h2>Experience Royal Taste at Home</h2>
        <p>Order authentic Rajasthani food today</p>
        <Link to='/menu'><button className="btn hero-btn">Browse Menu</button></Link>
      </section>

    </div>
  );
}

export default Home;
