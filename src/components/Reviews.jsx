import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import axios from "axios";

export default function Reviews() {
  const [reviewsData, setReviewsData] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(
        "https://kalla-bowl.onrender.com/api/reviews"
      );

      setReviewsData(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section id="reviews" className="reviews-section">
      {/* Curved decorative line SVG */}
      <div className="reviews-curve-bg">
        <svg
          viewBox="0 0 1440 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="curve-line-svg"
        >
          <path
            d="M-50 100C300 180 600 20 900 120C1200 220 1500 80 1600 100"
            stroke="rgba(17, 42, 29, 0.04)"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="reviews-container">
        <div className="reviews-header">
          <motion.div
            className="quote-icon-wrapper"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Quote size={36} fill="#d1f23a" stroke="none" />
          </motion.div>

          <motion.h2
            className="reviews-heading"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Loved by dogs, <br />
            <span className="text-serif">
              trusted by owners.
            </span>
          </motion.h2>
        </div>

        <div className="reviews-grid">
          {reviewsData.map((rev, idx) => (
            <motion.div
              key={rev._id}
              className="review-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: idx * 0.15,
              }}
            >
              <div className="stars-row">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill="#112a1d"
                    stroke="none"
                  />
                ))}
              </div>

              <blockquote className="review-quote">
                "{rev.comment}"
              </blockquote>

              <div className="review-author-info">
                <span className="author-name">
                  {rev.name}
                </span>

                <span className="author-breed">
                  Verified Customer
                </span>
              </div>

              {/* Decorative corner curve */}
              <div className="card-corner-curve">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M0 24C13.2548 24 24 13.2548 24 0V24H0Z"
                    fill="#edebe5"
                  />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}