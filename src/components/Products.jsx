import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Star, Check } from "lucide-react";
import axios from "axios";
import { CartContext } from "../context/CartContext";

export default function Products() {
  const { addToCart } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [addedProduct, setAddedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchReviews();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        "https://kalla-bowl.onrender.com/api/products"
      );


      setProducts(data);
    } catch (error) {
      console.log("Products Error:", error);
    }

  };

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(
        "https://kalla-bowl.onrender.com/api/reviews"
      );

      setReviews(data);
    } catch (error) {
      console.log("Reviews Error:", error);
    }


  };

  const handleAddToCart = (id, product) => {
    setAddedProduct(id);

    addToCart(product);

    setTimeout(() => {
      setAddedProduct(null);
    }, 2000);

  };




  return (<section id="products" className="products-section"> <div className="products-container"> <div className="products-header"> <span className="products-badge">
    OUR DIET FORMULAS </span>

    <h2 className="products-heading">
      Gently baked recipes,
      <br />
      <span className="text-serif">
        freshly prepared.
      </span>
    </h2>

    <p className="products-description">
      Available in pre-portioned bags. High meat content,
      zero binders, and boosted with organic cold-pressed oils.
    </p>
  </div>

    <div className="products-grid">
      {products.map((prod) => {
        const productReviews = reviews.filter(
          (review) =>
            String(review.productId) === String(prod._id)
        );

        return (
          <motion.div
            key={prod._id}
            className="product-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="product-media-container">
              <div className="product-media-inner">
                <img
                  src={prod.image}
                  alt={prod.name}
                  style={{
                    width: "400px",
                    height: "400px",
                    objectFit: "contain",
                  }}
                />
              </div>

              <div className="product-media-tags">
                <span className="media-tag">
                  {prod.category}
                </span>
              </div>
            </div>

            <div className="product-details-content">
              <div className="product-rating-row">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      fill="#d1f23a"
                      stroke="none"
                    />
                  ))}
                </div>

                <span className="reviews-count">
                  {productReviews.length} Reviews
                </span>
              </div>

              <h3 className="product-title">
                {prod.name}
              </h3>

              <span className="product-flavor">
                {prod.description}
              </span>

              <p>
                Stock: {prod.stock}
              </p>

              <div className="product-card-bottom">
                <span className="product-price">
                  ₹{prod.price}
                </span>

                <button
                  className={`product-add-btn ${addedProduct === prod._id
                    ? "added"
                    : ""
                    }`}
                  onClick={() =>
                    handleAddToCart(
                      prod._id,
                      prod
                    )
                  }
                >
                  {addedProduct === prod._id ? (
                    <Check size={18} />
                  ) : (
                    <ShoppingBag size={18} />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  </div>
  </section>

  );
}
