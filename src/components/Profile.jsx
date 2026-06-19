import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Profile() {
    const [email, setEmail] = useState("");
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const handleSearch = async () => {
        try {
            setLoading(true);

            const { data } = await axios.get(
                "https://kalla-bowl.onrender.com/api/orders"
            );

            const userOrders = data.filter(
                (order) =>
                    order.email.toLowerCase() ===
                    email.toLowerCase()
            );

            setOrders(userOrders);
            setSearched(true);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }

    };

    const totalSpent = orders.reduce(
        (sum, order) => sum + order.total,
        0
    );

    return (<section className="profile-page"> <div className="profile-container">
        <Link
            to="/#products"
            className="profile-back-btn"
        >
            <ArrowLeft size={18} />
            Back to Shop
        </Link>


        <h1 className="profile-title">
            My Orders
        </h1>

        <p className="profile-subtitle">
            View your order history and track
            your dog's meals.
        </p>

        <div className="profile-search">

            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                    setEmail(e.target.value)
                }
            />

            <button
                onClick={handleSearch}
                disabled={loading}
            >
                {loading
                    ? "Searching..."
                    : "Find Orders"}
            </button>

        </div>

        {orders.length > 0 && (
            <div className="profile-stats">

                <div className="profile-stat-card">
                    <h2>{orders.length}</h2>
                    <p>Total Orders</p>
                </div>

                <div className="profile-stat-card">
                    <h2>₹{totalSpent}</h2>
                    <p>Total Spent</p>
                </div>

            </div>
        )}

        {searched && orders.length === 0 && (
            <div className="empty-orders">
                <h3>No Orders Found</h3>

                <p>
                    We couldn't find any orders
                    linked to this email.
                </p>
            </div>
        )}

        {orders.map((order) => {

            const status =
                order.status || "Pending";

            const progressWidth =
                status === "Pending" ||
                    status === "Confirmed"
                    ? "0%"
                    : status === "Preparing"
                        ? "33.33%"
                        : status === "Shipped"
                            ? "66.66%"
                            : status === "Delivered"
                                ? "100%"
                                : "0%";

            return (
                <div
                    key={order._id}
                    className="profile-order-card"
                >

                    <div className="profile-order-header">

                        <div>
                            <h3>
                                Order #
                                {order._id
                                    .slice(-6)
                                    .toUpperCase()}
                            </h3>

                            <p className="order-date">
                                Placed on{" "}
                                {new Date(
                                    order.createdAt
                                ).toLocaleDateString()}
                            </p>
                        </div>

                        <span
                            className={`status-badge status-${status.toLowerCase()}`}
                        >
                            {status}
                        </span>

                    </div>

                    {order.items.map(
                        (item, index) => (
                            <div
                                key={index}
                                className="profile-product"
                            >

                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="profile-product-image"
                                />

                                <div className="profile-product-info">

                                    <h4>{item.name}</h4>

                                    <p>
                                        Quantity:
                                        {" "}
                                        {item.qty}
                                    </p>

                                    <p>
                                        Price:
                                        {" "}
                                        ₹{item.price}
                                    </p>

                                </div>

                            </div>
                        )
                    )}

                    <div className="profile-total">
                        Total:
                        {" "}
                        ₹{order.total}
                    </div>

                    <div
                        className="order-progress"
                        style={{
                            "--progress-width": progressWidth,
                        }}
                    >

                        <div
                            className={`progress-step ${status === "Pending" ||
                                status === "Confirmed" ||
                                status === "Preparing" ||
                                status === "Shipped" ||
                                status === "Delivered"
                                ? "active"
                                : ""
                                }`}
                        >
                            <span>✓</span>
                            <p>Payment</p>
                        </div>

                        <div
                            className={`progress-step ${status === "Preparing" ||
                                status === "Shipped" ||
                                status === "Delivered"
                                ? "active preparing"
                                : ""
                                }`}
                        >
                            <span>●</span>
                            <p>Preparing</p>
                        </div>

                        <div
                            className={`progress-step ${status === "Shipped" ||
                                status === "Delivered"
                                ? "active shipping"
                                : ""
                                }`}
                        >
                            <span>●</span>
                            <p>Delivery</p>
                        </div>

                        <div
                            className={`progress-step ${status === "Delivered"
                                ? "active delivered"
                                : ""
                                }`}
                        >
                            <span>●</span>
                            <p>Delivered</p>
                        </div>

                    </div>

                </div>
            );
        })}
    </div>
    </section>

    );
}