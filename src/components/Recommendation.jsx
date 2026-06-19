import { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RefreshCw, ShoppingBag, Check } from "lucide-react";
import { CartContext } from "../context/CartContext";

export default function Recommendation() {
  const [formData, setFormData] = useState({
    dogName: "",
    dogWeight: "medium", // small, medium, large
    activity: "active",  // low, active, high
    concern: "digestion", // digestion, coat, joints, energy
  });

  const [result, setResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToCart } = useContext(CartContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.dogName.trim()) {
      alert("Please enter your dog's name first!");
      return;
    }

    setIsSubmitting(true);
    // Simulate premium AI calculation
    setTimeout(() => {
      let matchedFormula = "";
      let matchedDesc = "";
      let ingredients = [];
      let analysis = {};
      let price = "";

      if (formData.concern === "digestion" || formData.dogWeight === "small") {
        matchedFormula = "KÄLLA BALANCE";
        matchedDesc = "Gently-baked Nordic Salmon, Dill, and Parsnip. Ideal for sensitive tummies and smaller breeds.";
        ingredients = ["Fresh Salmon (42%)", "Parsnips", "Sweet Potatoes", "Dill", "Sea Kelp", "Cold-pressed Flax Oil"];
        analysis = { protein: "26%", fat: "14%", fiber: "3.5%" };
      } else if (formData.concern === "joints" || formData.dogWeight === "large") {
        matchedFormula = "KÄLLA ACTIVE";
        matchedDesc = "Organic grass-fed Beef, Sweet Potato, and Rosemary. Enhanced with natural glucosamine for joint health.";
        ingredients = ["Grass-fed Beef (48%)", "Sweet Potatoes", "Spinach", "Rosemary", "Blueberries", "Green-lipped Mussel"];
        analysis = { protein: "28%", fat: "16%", fiber: "3.0%" };
      } else {
        matchedFormula = "KÄLLA SENSITIVE";
        matchedDesc = "Free-range Duck, Parsnip, and Chamomile. Hypoallergenic formula designed for skin support and anxiety reduction.";
        ingredients = ["Free-range Duck (45%)", "Parsnips", "Carrots", "Chamomile", "Cranberries", "Salmon Oil"];
        analysis = { protein: "24%", fat: "15%", fiber: "4.0%" };
      }

      setResult({
        _id:
          matchedFormula === "KÄLLA ACTIVE"
            ? "6a2a4bbd1fc72c8baafbbd9e"
            : matchedFormula === "KÄLLA BALANCE"
              ? "6a2a4bbd1fc72c8baafbbd9f"
              : "6a2a4bbd1fc72c8baafbbda0",

        name: matchedFormula,

        description: matchedDesc,

        price:
          matchedFormula === "KÄLLA ACTIVE"
            ? 899
            : matchedFormula === "KÄLLA BALANCE"
              ? 999
              : 949,

        image:
          matchedFormula === "KÄLLA ACTIVE"
            ? "/active.png"
            : matchedFormula === "KÄLLA BALANCE"
              ? "/balance.png"
              : "/sensitive.png",

        formula: matchedFormula,
        desc: matchedDesc,
        ingredients,
        analysis,
        dogName: formData.dogName,
      });
      setIsSubmitting(false);
    }, 1200);
  };

  const handleReset = () => {
    setResult(null);
    setFormData({
      dogName: "",
      dogWeight: "medium",
      activity: "active",
      concern: "digestion",
    });
  };

  return (
    <section id="recommendation" className="recommendation-section">
      <div className="recommendation-container">
        <div className="recommendation-header">
          <motion.h2
            className="recommendation-heading"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            Find the perfect recipe <br />
            <span className="text-serif">for your dog.</span>
          </motion.h2>
          <motion.p
            className="recommendation-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            Enter your details below to build a customized, veterinarian-approved nutrition plan.
          </motion.p>
        </div>

        <div className="recommendation-content">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="recommendation-form"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Step 1: Dog's Name */}
                <div className="form-group name-group">
                  <label htmlFor="dogName" className="form-label">
                    What is your dog's name?
                  </label>
                  <input
                    type="text"
                    id="dogName"
                    className="name-input"
                    placeholder="Enter name..."
                    value={formData.dogName}
                    onChange={(e) => setFormData({ ...formData, dogName: e.target.value })}
                    required
                  />
                </div>

                <div className="form-grid">
                  {/* Step 2: Weight class */}
                  <div className="form-group">
                    <span className="form-label">Dog Size / Weight</span>
                    <div className="form-options">
                      {[
                        { val: "small", label: "Toy & Small", sub: "Under 10 kg" },
                        { val: "medium", label: "Medium Breed", sub: "10 – 25 kg" },
                        { val: "large", label: "Large Breed", sub: "Over 25 kg" },
                      ].map((opt) => (
                        <button
                          key={opt.val}
                          type="button"
                          className={`option-btn ${formData.dogWeight === opt.val ? "active" : ""}`}
                          onClick={() => setFormData({ ...formData, dogWeight: opt.val })}
                        >
                          <span className="option-title">{opt.label}</span>
                          <span className="option-subtitle">{opt.sub}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 3: Activity level */}
                  <div className="form-group">
                    <span className="form-label">Daily Activity Level</span>
                    <div className="form-options">
                      {[
                        { val: "low", label: "Couch Potato", sub: "Under 1 hr walks" },
                        { val: "active", label: "Active Companion", sub: "1 – 2 hrs active" },
                        { val: "high", label: "Working / Athlete", sub: "Highly athletic" },
                      ].map((opt) => (
                        <button
                          key={opt.val}
                          type="button"
                          className={`option-btn ${formData.activity === opt.val ? "active" : ""}`}
                          onClick={() => setFormData({ ...formData, activity: opt.val })}
                        >
                          <span className="option-title">{opt.label}</span>
                          <span className="option-subtitle">{opt.sub}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 4: Primary concerns */}
                  <div className="form-group full-width-group">
                    <span className="form-label">Primary Wellness Target</span>
                    <div className="form-options row-options">
                      {[
                        { val: "digestion", label: "Sensitive Digestion" },
                        { val: "coat", label: "Glossy Coat & Skin" },
                        { val: "joints", label: "Hip & Joint Mobility" },
                        { val: "energy", label: "All-Day Energy" },
                      ].map((opt) => (
                        <button
                          key={opt.val}
                          type="button"
                          className={`option-btn pill-btn ${formData.concern === opt.val ? "active" : ""}`}
                          onClick={() => setFormData({ ...formData, concern: opt.val })}
                        >
                          <span className="option-title">{opt.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="form-submit-row">
                  <button
                    type="submit"
                    className={`form-submit-btn ${isSubmitting ? "loading" : ""}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="spinner-icon animate-spin" />
                        <span>Formulating...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles size={18} />
                        <span>Find My Formula</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="result"
                className="recommendation-result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="result-header">
                  <div className="result-badge">MATCH COMPLETED</div>
                  <h3 className="result-title">
                    Perfect Bowl for <span className="highlight-dog">{result.dogName}</span>
                  </h3>
                </div>

                <div className="result-card">
                  <div className="result-card-left">
                    <div className="result-pack-svg">
                      {/* Simple matched bag display */}
                      <svg viewBox="0 0 160 220" fill="none" className="result-bag-icon">
                        <path d="M30 20C30 10 40 5 60 5H100C120 5 130 10 130 20V190C130 205 120 215 100 215H60C40 215 30 205 30 190V20Z" fill={result.formula === "KÄLLA ACTIVE" ? "#112a1d" : result.formula === "KÄLLA BALANCE" ? "#edebe5" : "#e8ece9"} stroke="#112a1d" strokeWidth="3" />
                        <path d="M30 15H130" stroke="#112a1d" strokeWidth="4" />
                        <rect x="45" y="80" width="70" height="70" rx="35" fill={result.formula === "KÄLLA ACTIVE" ? "#d1f23a" : "#112a1d"} />
                        <text x="80" y="115" fill={result.formula === "KÄLLA ACTIVE" ? "#112a1d" : "#ffffff"} fontSize="12" fontWeight="800" textAnchor="middle">{result.formula.split(" ")[1]}</text>
                      </svg>
                    </div>
                    <div className="result-formula-info">
                      <span className="result-formula-name">{result.formula}</span>
                      <p className="result-formula-desc">{result.desc}</p>
                      <span className="result-formula-price">{result.price} <span className="price-unit">/ 2.5kg bag</span></span>
                    </div>
                  </div>

                  <div className="result-card-right">
                    <div className="result-block">
                      <span className="result-block-title">Key Nordic Ingredients</span>
                      <ul className="result-ingredients-list">
                        {result.ingredients.map((ing, i) => (
                          <li key={i} className="ingredient-item">
                            <Check size={14} className="check-icon" />
                            <span>{ing}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="result-block">
                      <span className="result-block-title">Nutritional Profile</span>
                      <div className="result-analysis-grid">
                        {Object.entries(result.analysis).map(([key, val]) => (
                          <div key={key} className="analysis-pill">
                            <span className="analysis-key">{key}</span>
                            <span className="analysis-val">{val}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="result-actions">
                  <button className="reset-btn" onClick={handleReset}>
                    <RefreshCw size={16} />
                    <span>Run Matcher Again</span>
                  </button>
                  <button
                    className="add-cart-btn"
                    onClick={() => addToCart(result)}
                  >
                    <ShoppingBag size={18} />
                    <span>Add matched bag to cart</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
