import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ShoppingBag,
  CheckCircle,
  Loader,
  MapPin,
  User,
  Mail,
  Phone,
  Home,
  Building2,
  Map,
  Hash,
} from "lucide-react";
import axios from "axios";

const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");

    script.src =
      "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
};


export default function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();




  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.customerName.trim())
      newErrors.customerName = "Full name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    if (!formData.address.trim())
      newErrors.address = "Address is required";

    if (!formData.city.trim())
      newErrors.city = "City is required";

    if (!formData.state.trim())
      newErrors.state = "State is required";

    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Enter a valid 6-digit pincode";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const res = await loadRazorpay();

      if (!res) {
        alert("Razorpay SDK failed to load");
        return;
      }

      const paymentOrder = await axios.post(
        "http://localhost:5000/api/payment/create-order",
        {
          amount: total,
        }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,

        amount: paymentOrder.data.amount,

        currency: paymentOrder.data.currency,

        name: "KÄLLA BOWL",

        description: "Dog Food Order",

        order_id: paymentOrder.data.id,

        handler: async function () {
          try {
            const orderData = {
              ...formData,

              items: cartItems.map((item) => ({
                productId: item._id,
                name: item.name,
                price: item.price,
                qty: item.qty,
                image: item.image,
              })),

              total,
            };

            const { data } = await axios.post(
              "http://localhost:5000/api/orders",
              orderData
            );

            setOrderId(data._id);

            setOrderPlaced(true);

            clearCart();
          } catch (err) {
            console.log(err);
            alert("Order save failed");
          }
        },

        theme: {
          color: "#c7f136",
        },
      };

      const razorpay = new window.Razorpay(
        options
      );

      razorpay.open();
    } catch (error) {
      console.log(error);

      alert("Payment Failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Empty cart guard
  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <section className="checkout-page">
        <div className="checkout-container">
          <div className="checkout-empty">
            <ShoppingBag size={60} />
            <h2>Your cart is empty</h2>
            <p>Add items to your cart before checking out.</p>
            <Link to="/" className="checkout-back-link">
              <ArrowLeft size={18} />
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // Order success
  if (orderPlaced) {
    return (
      <section className="checkout-page">
        <div className="checkout-container">
          <motion.div
            className="checkout-success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="success-icon-wrapper">
              <CheckCircle size={72} />
            </div>
            <h2>Order Placed Successfully!</h2>
            <p className="success-order-id">
              Order ID: <strong>{orderId}</strong>
            </p>
            <p className="success-message">
              Thank you for your order. We&apos;ll send you a confirmation
              email shortly.
            </p>
            <button
              className="success-home-btn"
              onClick={() => navigate("/")}
            >
              Back to Home
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-page">
      <div className="checkout-container">
        {/* Header */}
        <motion.div
          className="checkout-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/cart" className="checkout-back-link">
            <ArrowLeft size={18} />
            Back to Cart
          </Link>
          <h1>Checkout</h1>
          <p>Complete your order details below</p>
        </motion.div>

        <div className="checkout-layout">
          {/* Form */}
          <motion.form
            className="checkout-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="checkout-form-section">
              <h3 className="form-section-title">
                <User size={20} />
                Personal Information
              </h3>

              <div className="checkout-field">
                <label htmlFor="customerName">
                  <User size={16} />
                  Full Name
                </label>
                <input
                  id="customerName"
                  type="text"
                  name="customerName"
                  placeholder="Enter your full name"
                  value={formData.customerName}
                  onChange={handleChange}
                  className={errors.customerName ? "field-error" : ""}
                />
                {errors.customerName && (
                  <span className="error-text">
                    {errors.customerName}
                  </span>
                )}
              </div>

              <div className="checkout-field-row">
                <div className="checkout-field">
                  <label htmlFor="email">
                    <Mail size={16} />
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "field-error" : ""}
                  />
                  {errors.email && (
                    <span className="error-text">{errors.email}</span>
                  )}
                </div>

                <div className="checkout-field">
                  <label htmlFor="phone">
                    <Phone size={16} />
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    placeholder="10-digit number"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? "field-error" : ""}
                  />
                  {errors.phone && (
                    <span className="error-text">{errors.phone}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="checkout-form-section">
              <h3 className="form-section-title">
                <MapPin size={20} />
                Shipping Address
              </h3>

              <div className="checkout-field">
                <label htmlFor="address">
                  <Home size={16} />
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  placeholder="Street address, apartment, etc."
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  className={errors.address ? "field-error" : ""}
                />
                {errors.address && (
                  <span className="error-text">{errors.address}</span>
                )}
              </div>

              <div className="checkout-field-row">
                <div className="checkout-field">
                  <label htmlFor="city">
                    <Building2 size={16} />
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    name="city"
                    placeholder="Your city"
                    value={formData.city}
                    onChange={handleChange}
                    className={errors.city ? "field-error" : ""}
                  />
                  {errors.city && (
                    <span className="error-text">{errors.city}</span>
                  )}
                </div>

                <div className="checkout-field">
                  <label htmlFor="state">
                    <Map size={16} />
                    State
                  </label>
                  <input
                    id="state"
                    type="text"
                    name="state"
                    placeholder="Your state"
                    value={formData.state}
                    onChange={handleChange}
                    className={errors.state ? "field-error" : ""}
                  />
                  {errors.state && (
                    <span className="error-text">{errors.state}</span>
                  )}
                </div>

                <div className="checkout-field">
                  <label htmlFor="pincode">
                    <Hash size={16} />
                    Pincode
                  </label>
                  <input
                    id="pincode"
                    type="text"
                    name="pincode"
                    placeholder="6-digit pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className={errors.pincode ? "field-error" : ""}
                  />
                  {errors.pincode && (
                    <span className="error-text">{errors.pincode}</span>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="checkout-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader size={20} className="spinner-icon" />
                  Placing Order...
                </>
              ) : (
                <>
                  <CheckCircle size={20} />
                  Place Order — ₹{total}
                </>
              )}
            </button>
          </motion.form>

          {/* Order Summary Sidebar */}
          <motion.div
            className="checkout-summary"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3>Order Summary</h3>
            <div className="checkout-summary-items">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="checkout-summary-item"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="checkout-item-thumb"
                  />
                  <div className="checkout-item-details">
                    <span className="checkout-item-name">
                      {item.name}
                    </span>
                    <span className="checkout-item-qty">
                      Qty: {item.qty}
                    </span>
                  </div>
                  <span className="checkout-item-price">
                    ₹{item.price * item.qty}
                  </span>
                </div>
              ))}
            </div>

            <div className="checkout-summary-divider" />

            <div className="checkout-summary-row">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>
            <div className="checkout-summary-row">
              <span>Shipping</span>
              <span className="free-shipping">Free</span>
            </div>

            <div className="checkout-summary-divider" />

            <div className="checkout-summary-total">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
