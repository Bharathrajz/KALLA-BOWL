import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { Trash2, ShoppingBag } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
export default function Cart() {
    const {
        cartItems,
        removeFromCart,
        increaseQty,
        decreaseQty,
    } = useContext(CartContext);

    const navigate = useNavigate();

    const total = cartItems.reduce(
        (sum, item) =>
            sum + item.price * item.qty,
        0
    );

    return (
        <section className="cart-page">
            <div className="cart-container">

                <div className="cart-header">
                    <h1>Shopping Cart</h1>
                    <span>{cartItems.length} Items</span>
                </div>
                <Link
                    to="/"
                    className="continue-shopping-btn"
                >
                    <ArrowLeft size={18} />
                    Continue Shopping
                </Link>

                {cartItems.length === 0 ? (
                    <div className="empty-cart">

                        <div className="empty-cart-content">

                            <ShoppingBag
                                size={90}
                                strokeWidth={1.5}
                                className="empty-cart-icon"
                            />

                            <h2>Your Cart Is Empty</h2>

                            <p>
                                Looks like your dog hasn't
                                picked a meal yet.
                            </p>

                            <Link
                                to="/#products"
                                className="browse-products-btn"
                            >
                                Browse Recipes
                            </Link>

                        </div>

                    </div>
                ) : (
                    <div className="cart-layout">

                        <div className="cart-items">
                            {cartItems.map((item, index) => (
                                <div
                                    key={`${item._id}-${index}`}
                                    className="cart-item"
                                >



                                    <div
                                        key={`${item._id}-${index}`}
                                        className="cart-item"
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="cart-item-image"
                                        />

                                        <div className="cart-item-info">
                                            <h3>{item.name}</h3>

                                            <p>{item.description}</p>

                                            <span className="cart-price">
                                                ₹{item.price}
                                            </span>

                                            <div className="qty-controls">
                                                <button
                                                    onClick={() =>
                                                        decreaseQty(item._id)
                                                    }
                                                >
                                                    -
                                                </button>

                                                <span>{item.qty}</span>

                                                <button
                                                    onClick={() =>
                                                        increaseQty(item._id)
                                                    }
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        <button
                                            className="remove-btn"
                                            onClick={() =>
                                                removeFromCart(item._id)
                                            }
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>



                                </div>
                            ))}
                        </div>

                        <div className="cart-summary">
                            <h3>Order Summary</h3>

                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>₹{total}</span>
                            </div>

                            <div className="summary-row">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>

                            <div className="summary-total">
                                <span>Total</span>
                                <span>₹{total}</span>
                            </div>

                            <button
                                className="checkout-btn"
                                onClick={() => navigate("/checkout")}
                            >
                                Proceed to Checkout
                            </button>


                        </div>

                    </div>
                )}
            </div>
        </section>
    );
}