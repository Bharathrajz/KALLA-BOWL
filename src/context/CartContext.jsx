import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

// Helper: safely read cart from localStorage
const loadCartFromStorage = () => {
    try {
        const stored = localStorage.getItem("kalla_cart");
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(loadCartFromStorage);

    // Sync cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("kalla_cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems((prev) => {
            const existing = prev.find(
                (item) => item._id === product._id
            );

            if (existing) {
                return prev.map((item) =>
                    item._id === product._id
                        ? {
                            ...item,
                            qty: item.qty + 1,
                        }
                        : item
                );
            }

            return [
                ...prev,
                {
                    ...product,
                    qty: 1,
                },
            ];
        });
    };



    const increaseQty = (id) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item._id === id
                    ? {
                        ...item,
                        qty: item.qty + 1,
                    }
                    : item
            )
        );
    };

    const decreaseQty = (id) => {
        setCartItems((prev) =>
            prev
                .map((item) =>
                    item._id === id
                        ? {
                            ...item,
                            qty: item.qty - 1,
                        }
                        : item
                )
                .filter((item) => item.qty > 0)
        );
    };

    const removeFromCart = (id) => {
        setCartItems(
            cartItems.filter((item) => item._id !== id)
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                increaseQty,
                decreaseQty,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;