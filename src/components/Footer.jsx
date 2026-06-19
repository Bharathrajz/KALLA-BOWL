import { ArrowUp } from "lucide-react";

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer-section">
      <div className="footer-container">
        {/* Row 1: Brand details and Newsletter */}
        <div className="footer-top-row">
          <div className="footer-brand-col">
            <a href="#" className="footer-logo">
              KÄLLA<span className="logo-accent">BOWL</span>
            </a>
            <p className="footer-brand-tagline">
              Premium, gently-baked canine nutrition from organic Nordic ingredients. Cultivating longevity for our most loyal companions.
            </p>
            <div className="social-links-row">
              <a href="#" aria-label="Instagram" className="social-icon-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="#" aria-label="Facebook" className="social-icon-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="#" aria-label="Pinterest" className="social-icon-btn">
                {/* Custom Pinterest SVG */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 4.27 2.68 7.9 6.47 9.33-.08-.8-.16-2.02.03-2.89.18-.78 1.16-4.9 1.16-4.9s-.3-.59-.3-1.46c0-1.37.79-2.39 1.78-2.39.84 0 1.25.63 1.25 1.39 0 .85-.54 2.11-.82 3.29-.23.99.49 1.79 1.47 1.79 1.76 0 3.12-1.86 3.12-4.54 0-2.37-1.7-4.03-4.14-4.03-2.82 0-4.48 2.11-4.48 4.3 0 .85.33 1.76.74 2.26.08.1.09.19.07.29-.07.3-.24.99-.27 1.13-.04.18-.15.22-.34.13-1.25-.58-2.03-2.42-2.03-3.89 0-3.17 2.3-6.08 6.64-6.08 3.49 0 6.2 2.48 6.2 5.8 0 3.46-2.18 6.25-5.21 6.25-1.02 0-1.98-.53-2.3-.15l-.63 2.39c-.23.86-.84 1.94-1.25 2.61C10.07 21.78 11.02 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-newsletter-col">
            <span className="newsletter-title">Subscribe to our journal</span>
            <p className="newsletter-desc">Get health tips, vet insights, and 10% off your first order.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Your email address" className="newsletter-input" required />
              <button type="submit" className="newsletter-submit-btn">
                <span>Join</span>
              </button>
            </form>
          </div>
        </div>

        {/* Row 2: 4-Column Layout */}
        <div className="footer-grid-row">
          {/* Column 1: Products */}
          <div className="footer-grid-col">
            <span className="footer-col-title">Our Formulas</span>
            <ul className="footer-links">
              <li><a href="#products">KÄLLA Active Beef</a></li>
              <li><a href="#products">KÄLLA Balance Salmon</a></li>
              <li><a href="#products">KÄLLA Sensitive Duck</a></li>
              <li><a href="#recommendation">Bowl Matcher Quiz</a></li>
              <li><a href="#benefits">Trial Starter Pack</a></li>
            </ul>
          </div>

          {/* Column 2: Support */}
          <div className="footer-grid-col">
            <span className="footer-col-title">Support & Care</span>
            <ul className="footer-links">
              <li><a href="#faq">Delivery & Shipping</a></li>
              <li><a href="#faq">Returns & Refunds</a></li>
              <li><a href="#faq">Frequently Asked Questions</a></li>
              <li><a href="#faq">Veterinary Support</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="footer-grid-col">
            <span className="footer-col-title">Contact</span>
            <p className="footer-contact-detail">
              KÄLLA BOWL India <br />
              Hyderabad 500018 <br />
              India
            </p>
            <p className="footer-contact-detail">
              <a href="tel:+918008175820" className="tel-link">+91 8008175820</a> <br />
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=kallabowl.orders@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mail-link"
              >
                kallabowl.orders@gmail.com
              </a>
            </p>
          </div>

          {/* Column 4: Business Hours */}
          <div className="footer-grid-col">
            <span className="footer-col-title">Business Hours</span>
            <ul className="footer-hours">
              <li><span className="day">Monday - Friday</span> <span className="time">09:00 - 18:00</span></li>
              <li><span className="day">Saturday</span> <span className="time">10:00 - 16:00</span></li>
              <li><span className="day">Sunday</span> <span className="time">Closed</span></li>
            </ul>
            <span className="timezone-label">IST (Indian Standard Time)</span>
          </div>
        </div>

        {/* Row 3: Bottom Copyright & Badges */}
        <div className="footer-bottom-row">
          <div className="footer-copyright">
            <span>© {new Date().getFullYear()} KÄLLA BOWL. All rights reserved.</span>
            <div className="legal-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie settings</a>
            </div>
          </div>

          {/* Payment Badges (Clean SVG layouts) */}
          <div className="payment-badges-row">
            {/* Visa */}
            <svg width="32" height="20" viewBox="0 0 32 20" fill="none" className="payment-svg" aria-label="Visa">
              <rect width="32" height="20" rx="3" fill="#ffffff" />
              <path d="M11 6.5L9.2 13.5H7.5L9.3 6.5H11ZM17.4 6.6C17.1 6.3 16.5 6.2 15.9 6.2C14.1 6.2 13.1 7.1 13 8.3C13 9.3 14 9.8 14.7 10.1C15.4 10.4 15.6 10.6 15.6 10.9C15.6 11.4 15 11.7 14.3 11.7C13.5 11.7 13 11.5 12.6 11.3L12.3 12.6C12.8 12.8 13.5 13 14.2 13C16 13 17.2 12.1 17.3 10.8C17.3 9.8 16.6 9.3 15.6 8.8C14.9 8.5 14.6 8.3 14.6 8C14.6 7.6 15.1 7.2 15.9 7.2C16.6 7.2 17.1 7.4 17.4 7.6L17.4 6.6ZM22.5 6.5L20.8 13.5H19.2L17.5 6.5H19.2L20 10.9L20.8 6.5H22.5ZM25.5 6.5L26 9.7L26.7 6.5H28.5L26.8 13.5H25.1L24 8.7L23.4 13.5H21.7L23.6 6.5H25.5Z" fill="#1A1F71" />
            </svg>
            {/* Mastercard */}
            <svg width="32" height="20" viewBox="0 0 32 20" fill="none" className="payment-svg" aria-label="Mastercard">
              <rect width="32" height="20" rx="3" fill="#ffffff" />
              <circle cx="13" cy="10" r="6" fill="#EB001B" />
              <circle cx="19" cy="10" r="6" fill="#F79E1B" opacity="0.85" />
            </svg>
            {/* Apple Pay */}
            <svg width="32" height="20" viewBox="0 0 32 20" fill="none" className="payment-svg" aria-label="Apple Pay">
              <rect width="32" height="20" rx="3" fill="#ffffff" />
              <text x="16" y="14" fill="#000000" fontFamily="system-ui" fontWeight="bold" fontSize="10" textAnchor="middle">Pay</text>
            </svg>
            {/* PayPal */}
            <svg width="32" height="20" viewBox="0 0 32 20" fill="none" className="payment-svg" aria-label="PayPal">
              <rect width="32" height="20" rx="3" fill="#ffffff" />
              <path d="M12.5 5.5H8.5V14.5H11.5L12.1 11H13.6C15.6 11 16.9 10 17.3 8C17.6 6.6 17 5.5 15 5.5H12.5ZM19 7.5C18.6 9.5 17.3 10.5 15.3 10.5H13.6L13.1 13.5H11.5L13 5.5H15C17 5.5 18.2 6.5 18.5 7.5H19Z" fill="#003087" />
            </svg>
          </div>

          {/* Back to top button */}
          <button className="back-to-top-btn" onClick={handleScrollToTop} aria-label="Scroll to top">
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
