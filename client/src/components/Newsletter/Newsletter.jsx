import { useState, useCallback, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import "./Newsletter.css";

/**
 * Newsletter Component
 * Handles email subscription with EmailJS integration
 * Includes form validation, error handling, and accessibility features
 */
function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [touched, setTouched] = useState(false);
  const messageTimeoutRef = useRef(null);

  // Initialize EmailJS on component mount
  useEffect(() => {
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    
    // Validate that all required environment variables are configured
    if (!publicKey) {
      console.warn(
        "EmailJS not configured. Newsletter functionality disabled. " +
        "Please set VITE_EMAILJS_PUBLIC_KEY in environment variables."
      );
      return;
    }

    if (!import.meta.env.VITE_EMAILJS_SERVICE_ID) {
      console.warn("VITE_EMAILJS_SERVICE_ID not configured");
      return;
    }

    if (!import.meta.env.VITE_EMAILJS_TEMPLATE_ID) {
      console.warn("VITE_EMAILJS_TEMPLATE_ID not configured");
      return;
    }

    // Initialize EmailJS with public key
    emailjs.init(publicKey);
  }, []);

  // Cleanup timeout on component unmount
  useEffect(() => {
    return () => {
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
    };
  }, []);

  /**
   * Validate email format
   * @param {string} emailValue - Email to validate
   * @returns {boolean} - True if valid email format
   */
  const isValidEmail = useCallback((emailValue) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailValue);
  }, []);

  /**
   * Show notification message with auto-clear
   * @param {string} type - Message type ('success' or 'error')
   * @param {string} text - Message text to display
   */
  const showMessage = useCallback((type, text) => {
    setMessage({ type, text });

    // Clear previous timeout if exists
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }

    // Auto-clear message after 4 seconds
    messageTimeoutRef.current = setTimeout(() => {
      setMessage({ type: "", text: "" });
    }, 4000);
  }, []);

  /**
   * Handle email input change
   */
  const handleEmailChange = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  /**
   * Handle email input blur for touch tracking
   */
  const handleBlur = useCallback(() => {
    setTouched(true);
  }, []);

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);

    // Validation
    if (!email.trim()) {
      showMessage("error", "⚠️ Please enter your email address");
      return;
    }

    if (!isValidEmail(email)) {
      showMessage("error", "❌ Please enter a valid email address");
      return;
    }

    // Check if EmailJS is configured
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error("EmailJS configuration missing:", {
        serviceId: !!serviceId,
        templateId: !!templateId,
        publicKey: !!publicKey,
      });
      showMessage(
        "error",
        "❌ Email service is not configured. Please contact support."
      );
      return;
    }

    setLoading(true);

    try {
      // Send subscription email using EmailJS
      const response = await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: "Mewar Delights Newsletter",
          from_email: email.trim(),
          user_email: email.trim(),
          reply_to: email.trim(),
          message: `Thank you for subscribing to Mewar Delights Newsletter!`,
          subscription_date: new Date().toLocaleDateString()
        }
      );

      if (response.status === 200) {
        showMessage(
          "success",
          "✅ Successfully subscribed! Check your email for exclusive offers."
        );
        setEmail("");
        setTouched(false);
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      console.error("Error status:", error.status);
      console.error("Error message:", error.text);
      showMessage(
        "error",
        "❌ Failed to subscribe. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  // Check if email is invalid
  const isEmailInvalid = touched && email && !isValidEmail(email);

  return (
    <section className="newsletter-section" aria-label="Newsletter subscription">
      <div className="container">
        <div className="newsletter-box">
          <h2 className="newsletter-title">Subscribe to Our Newsletter</h2>
          <p className="newsletter-subtitle">
            Get exclusive offers, authentic recipes, and Mewar Delights updates delivered to your inbox
          </p>

          <form
            className="newsletter-form"
            onSubmit={handleSubmit}
            noValidate
            aria-label="Newsletter subscription form"
          >
            <div className="form-group">
              <input
                type="email"
                className={`newsletter-input ${isEmailInvalid ? "invalid" : ""}`}
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                onBlur={handleBlur}
                disabled={loading}
                required
                aria-label="Email address"
                aria-describedby={isEmailInvalid ? "email-error" : undefined}
                autoComplete="email"
              />
              {isEmailInvalid && (
                <span id="email-error" className="error-text">
                  Please enter a valid email address
                </span>
              )}
            </div>

            <button
              className="btn-subscribe"
              type="submit"
              disabled={loading}
              aria-busy={loading}
              aria-label={loading ? "Subscribing..." : "Subscribe to newsletter"}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Subscribing...
                </>
              ) : (
                "Subscribe"
              )}
            </button>
          </form>

          {message.text && (
            <div
              className={`newsletter-message ${message.type}`}
              role="alert"
              aria-live="polite"
              aria-atomic="true"
            >
              {message.text}
            </div>
          )}

          <p className="newsletter-privacy">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
