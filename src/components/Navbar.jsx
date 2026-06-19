import { useState, useEffect, useContext } from "react";
import { Search, ShoppingBag, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";



export default function Navbar() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { cartItems } = useContext(CartContext);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Shop", href: "#products" },
    { name: "Ingredients", href: "#features" },
    { name: "Bowl Matcher", href: "#recommendation" },
    { name: "Benefits", href: "#benefits" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <>
      <motion.nav
        className={`navbar ${isScrolled ? "navbar-scrolled" : ""
          }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <div className="navbar-container">

          {/* Left Links */}
          <div className="nav-col nav-col-left">
            {navLinks.slice(0, 3).map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="nav-link"
              >
                {link.name}
                <span className="nav-link-dot" />
              </a>
            ))}
          </div>

          {/* Logo */}
          <div className="nav-col nav-col-center">
            <a href="#" className="nav-logo">
              KÄLLA
              <span className="logo-accent">
                BOWL
              </span>
            </a>
          </div>

          {/* Right Side */}
          <div className="nav-col nav-col-right">

            {navLinks.slice(3).map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="nav-link nav-link-right-extra"
              >
                {link.name}
                <span className="nav-link-dot" />
              </a>
            ))}

            {/* Search */}
            <button
              className="nav-icon-btn"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            {/* Cart */}
            <Link to="/cart" className="nav-icon-btn">
              <ShoppingBag size={20} />

              {cartItems.length > 0 && (
                <span className="cart-badge">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* User */}
            <button
              className="nav-icon-btn user-btn"
              aria-label="Profile"
              onClick={() => navigate("/profile")}
            >
              <User size={20} />
            </button>
            {/* CTA */}
            <a
              href="#recommendation"
              className="nav-cta-btn"
            >
              <span>Build Bowl</span>
            </a>

            {/* Mobile Menu */}
            <button
              className={`mobile-menu-toggle ${mobileMenuOpen ? "open" : ""
                }`}
              onClick={() =>
                setMobileMenuOpen(
                  !mobileMenuOpen
                )
              }
              aria-label="Toggle Menu"
            >
              <span className="bar" />
              <span className="bar" />
            </button>

          </div>
        </div>
      </motion.nav >

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="mobile-menu-inner">

              <div className="mobile-links">
                {navLinks.map(
                  (link, idx) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      className="mobile-link"
                      onClick={() =>
                        setMobileMenuOpen(
                          false
                        )
                      }
                      initial={{
                        opacity: 0,
                        y: 15,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay:
                          idx * 0.08,
                        duration: 0.4,
                      }}
                    >
                      {link.name}
                    </motion.a>
                  )
                )}
              </div>

              <div className="mobile-actions">
                <a
                  href="#recommendation"
                  className="mobile-cta-btn"
                  onClick={() =>
                    setMobileMenuOpen(
                      false
                    )
                  }
                >
                  Build Bowl Now
                </a>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}