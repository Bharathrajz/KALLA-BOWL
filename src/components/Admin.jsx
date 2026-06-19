import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  ShoppingCart,
  Star,
  MessageSquare,
  Trash2,
  ChevronDown,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

const API = "http://localhost:5000/api";

const STATUS_OPTIONS = [
  "Confirmed",
  "Preparing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const STATUS_COLORS = {
  Confirmed: "#e8a317",
  Preparing: "#3b82f6",
  Shipped: "#8b5cf6",
  Delivered: "#22c55e",
  Cancelled: "#ef4444",
};

export default function Admin() {
  const [activeTab, setActiveTab] = useState("orders");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [prodRes, orderRes, reviewRes, contactRes] =
        await Promise.all([
          axios.get(`${API}/products`),
          axios.get(`${API}/orders`),
          axios.get(`${API}/reviews`),
          axios.get(`${API}/contact`),
        ]);

      setProducts(prodRes.data);
      setOrders(orderRes.data);
      setReviews(reviewRes.data);
      setContacts(contactRes.data);
    } catch (error) {
      console.error("Admin fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      const { data } = await axios.put(
        `${API}/orders/${id}`,
        { status }
      );
      setOrders((prev) =>
        prev.map((o) => (o._id === id ? data : o))
      );
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  const deleteOrder = async (id) => {
    if (!window.confirm("Delete this order permanently?"))
      return;
    try {
      await axios.delete(`${API}/orders/${id}`);
      setOrders((prev) => prev.filter((o) => o._id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const tabs = [
    { key: "orders", label: "Orders", icon: ShoppingCart },
    { key: "products", label: "Products", icon: Package },
    { key: "reviews", label: "Reviews", icon: Star },
    { key: "messages", label: "Messages", icon: MessageSquare },
  ];

  const stats = [
    {
      label: "Total Products",
      value: products.length,
      icon: Package,
      color: "#d1f23a",
    },
    {
      label: "Total Orders",
      value: orders.length,
      icon: ShoppingCart,
      color: "#3b82f6",
    },
    {
      label: "Total Reviews",
      value: reviews.length,
      icon: Star,
      color: "#f59e0b",
    },
    {
      label: "Total Messages",
      value: contacts.length,
      icon: MessageSquare,
      color: "#8b5cf6",
    },
  ];

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section className="admin-page">
      <div className="admin-container">
        {/* Header */}
        <motion.div
          className="admin-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="admin-header-left">
            <Link to="/" className="admin-back-link">
              <ArrowLeft size={18} />
              Back to Store
            </Link>
            <h1>
              KÄLLA <span className="admin-logo-accent">ADMIN</span>
            </h1>
            <p>Manage your store, orders, and customers</p>
          </div>
          <button
            className="admin-refresh-btn"
            onClick={fetchAll}
            disabled={loading}
          >
            <RefreshCw
              size={18}
              className={loading ? "spinner-icon" : ""}
            />
            Refresh
          </button>
        </motion.div>

        {/* Stat Cards */}
        <motion.div
          className="admin-stats"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="admin-stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
            >
              <div
                className="stat-icon-wrapper"
                style={{ backgroundColor: stat.color + "20" }}
              >
                <stat.icon
                  size={22}
                  style={{ color: stat.color }}
                />
              </div>
              <div className="stat-info">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tabs */}
        <div className="admin-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`admin-tab ${activeTab === tab.key ? "active" : ""
                }`}
              onClick={() => setActiveTab(tab.key)}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="admin-content"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {loading ? (
              <div className="admin-loading">
                <RefreshCw size={32} className="spinner-icon" />
                <p>Loading data...</p>
              </div>
            ) : (
              <>
                {/* ORDERS TAB */}
                {activeTab === "orders" && (
                  <div className="admin-table-wrapper">
                    {orders.length === 0 ? (
                      <div className="admin-empty">
                        <ShoppingCart size={48} />
                        <p>No orders yet</p>
                      </div>
                    ) : (
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Items</th>
                            <th>Total</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map((order) => (
                            <tr key={order._id}>
                              <td className="order-id-cell">
                                {order._id.slice(-8).toUpperCase()}
                              </td>
                              <td>
                                <div className="customer-cell">
                                  <strong>
                                    {order.customerName}
                                  </strong>
                                  <span>{order.email}</span>
                                </div>
                              </td>
                              <td>{order.items.length} items</td>
                              <td className="price-cell">
                                ₹{order.total}
                              </td>
                              <td>
                                {formatDate(order.createdAt)}
                              </td>
                              <td>
                                <div className="status-select-wrapper">
                                  <select
                                    className="status-select"
                                    value={order.status}
                                    onChange={(e) =>
                                      updateOrderStatus(
                                        order._id,
                                        e.target.value
                                      )
                                    }
                                    style={{
                                      borderColor:
                                        STATUS_COLORS[
                                        order.status
                                        ],
                                      color:
                                        STATUS_COLORS[
                                        order.status
                                        ],
                                    }}
                                  >
                                    {STATUS_OPTIONS.map((s) => (
                                      <option key={s} value={s}>
                                        {s}
                                      </option>
                                    ))}
                                  </select>
                                  <ChevronDown
                                    size={14}
                                    className="select-chevron"
                                  />
                                </div>
                              </td>
                              <td>
                                <button
                                  className="admin-delete-btn"
                                  onClick={() =>
                                    deleteOrder(order._id)
                                  }
                                  title="Delete order"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}

                {/* PRODUCTS TAB */}
                {activeTab === "products" && (
                  <div className="admin-table-wrapper">
                    {products.length === 0 ? (
                      <div className="admin-empty">
                        <Package size={48} />
                        <p>No products found</p>
                      </div>
                    ) : (
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map((prod) => (
                            <tr key={prod._id}>
                              <td>
                                <img
                                  src={prod.image}
                                  alt={prod.name}
                                  className="admin-product-img"
                                />
                              </td>
                              <td>
                                <strong>{prod.name}</strong>
                              </td>
                              <td>
                                <span className="category-badge">
                                  {prod.category}
                                </span>
                              </td>
                              <td className="price-cell">
                                ₹{prod.price}
                              </td>
                              <td>{prod.stock}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}

                {/* REVIEWS TAB */}
                {activeTab === "reviews" && (
                  <div className="admin-table-wrapper">
                    {reviews.length === 0 ? (
                      <div className="admin-empty">
                        <Star size={48} />
                        <p>No reviews yet</p>
                      </div>
                    ) : (
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Customer</th>
                            <th>Rating</th>
                            <th>Comment</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reviews.map((review) => (
                            <tr key={review._id}>
                              <td>
                                <strong>{review.name}</strong>
                              </td>
                              <td>
                                <div className="rating-stars">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      size={14}
                                      fill={
                                        i < review.rating
                                          ? "#d1f23a"
                                          : "transparent"
                                      }
                                      stroke={
                                        i < review.rating
                                          ? "#d1f23a"
                                          : "#ccc"
                                      }
                                    />
                                  ))}
                                </div>
                              </td>
                              <td className="comment-cell">
                                {review.comment}
                              </td>
                              <td>
                                {formatDate(review.createdAt)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}

                {/* MESSAGES TAB */}
                {activeTab === "messages" && (
                  <div className="admin-table-wrapper">
                    {contacts.length === 0 ? (
                      <div className="admin-empty">
                        <MessageSquare size={48} />
                        <p>No messages yet</p>
                      </div>
                    ) : (
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Message</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {contacts.map((msg) => (
                            <tr key={msg._id}>
                              <td>
                                <strong>{msg.name}</strong>
                              </td>
                              <td>{msg.email}</td>
                              <td className="comment-cell">
                                {msg.message}
                              </td>
                              <td>
                                {formatDate(msg.createdAt)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
