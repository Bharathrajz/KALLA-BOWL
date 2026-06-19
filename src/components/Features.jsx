import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ShieldAlert, ThermometerSun } from "lucide-react";

export default function Features() {
  const [activeTab, setActiveTab] = useState("baked"); // baked, raw, grainfree

  const tabData = {
    baked: {
      title: "Gently Baked at 90°C",
      subtitle: "Unlocking maximum nutrient bio-availability",
      desc: "Unlike mass-produced kibble extruded at intense heat (up to 200°C) which destroys natural vitamins and enzymes, we bake our recipes slowly. This locks in the natural goodness, produces a crunchy texture dogs love, and keeps sensitive nutrients fully intact.",
      icon: <ThermometerSun size={24} />,
      points: [
        "Retains 95% of natural enzymes",
        "Easy on sensitive stomachs",
        "No artificial flavor enhancers needed",
      ],
      color: "#edebe5",
      svg: (
        <svg viewBox="0 0 200 200" className="features-graphic">
          <rect x="20" y="20" width="160" height="160" rx="30" fill="rgba(209,242,58,0.15)" stroke="#112a1d" strokeWidth="2" />
          <circle cx="100" cy="100" r="50" fill="none" stroke="#112a1d" strokeWidth="3" strokeDasharray="8 6" />
          {/* Baking waves */}
          <path d="M85 100Q92.5 90 100 100T115 100" stroke="#112a1d" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M85 115Q92.5 105 100 115T115 115" stroke="#112a1d" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M85 85Q92.5 75 100 85T115 85" stroke="#112a1d" strokeWidth="3" strokeLinecap="round" fill="none" />
          {/* Sparkles */}
          <path d="M45 45L55 55M55 45L45 55" stroke="#112a1d" strokeWidth="2" />
          <path d="M145 145L155 155M155 145L145 155" stroke="#112a1d" strokeWidth="2" />
        </svg>
      ),
    },
    raw: {
      title: "Freeze-Dried Raw Coating",
      subtitle: "The raw ancestral nutrition your dog craves",
      desc: "Before packaging, each piece of gently baked kibble is tumbled in a rich coating of premium freeze-dried raw beef liver and heart. This provides an explosion of raw aroma and ancestral nutrition that entices even the pickiest eaters.",
      icon: <Award size={24} />,
      points: [
        "Pure freeze-dried raw organ meats",
        "Exceptional palatability for picky dogs",
        "Packed with amino acids and iron",
      ],
      color: "#e8ece9",
      svg: (
        <svg viewBox="0 0 200 200" className="features-graphic">
          <rect x="20" y="20" width="160" height="160" rx="30" fill="rgba(17,42,29,0.06)" stroke="#112a1d" strokeWidth="2" />
          {/* Kibble piece */}
          <path d="M80 60C95 50 115 50 130 65C145 80 145 105 130 120C115 135 90 135 75 120C60 105 60 75 80 60Z" fill="#112a1d" />
          {/* Raw particles */}
          <circle cx="65" cy="50" r="4" fill="#d1f23a" stroke="#112a1d" strokeWidth="1.5" />
          <circle cx="145" cy="60" r="5" fill="#d1f23a" stroke="#112a1d" strokeWidth="1.5" />
          <circle cx="130" cy="140" r="4.5" fill="#d1f23a" stroke="#112a1d" strokeWidth="1.5" />
          <circle cx="55" cy="120" r="6" fill="#d1f23a" stroke="#112a1d" strokeWidth="1.5" />
          <circle cx="95" cy="150" r="4" fill="#d1f23a" stroke="#112a1d" strokeWidth="1.5" />
          {/* Text label */}
          <rect x="75" y="90" width="50" height="18" rx="9" fill="#d1f23a" stroke="#112a1d" strokeWidth="1.5" />
          <text x="100" y="102" fill="#112a1d" fontSize="8" fontWeight="800" textAnchor="middle">RAW</text>
        </svg>
      ),
    },
    grainfree: {
      title: "100% Grain-Free & Gluten-Free",
      subtitle: "Clean starch alternatives for high-energy needs",
      desc: "We completely omit cheap fillers like corn, soy, wheat, or gluten which can cause allergies and glucose spikes. Instead, we use prebiotic-rich sweet potato and fiber-loaded parsnips to provide steady energy and promote solid stool consistency.",
      icon: <ShieldAlert size={24} />,
      points: [
        "Zero corn, soy, wheat, or gluten",
        "Slow-burning complex carbs only",
        "Prebiotic fibers for stool quality",
      ],
      color: "#ffffff",
      svg: (
        <svg viewBox="0 0 200 200" className="features-graphic">
          <rect x="20" y="20" width="160" height="160" rx="30" fill="#ffffff" stroke="#112a1d" strokeWidth="2" />
          {/* Sweet potato outline */}
          <path d="M60 140C40 100 80 40 120 60C150 75 160 120 140 140C120 160 80 180 60 140Z" fill="none" stroke="#112a1d" strokeWidth="3" />
          <path d="M80 110C95 100 110 105 125 120" stroke="#112a1d" strokeWidth="2" strokeLinecap="round" />
          {/* Leaf */}
          <path d="M120 60C130 50 145 50 150 40C140 45 130 40 120 60Z" fill="#d1f23a" stroke="#112a1d" strokeWidth="1.5" />
          {/* Sparkles */}
          <circle cx="50" cy="60" r="3" fill="#112a1d" />
          <circle cx="160" cy="100" r="3" fill="#112a1d" />
        </svg>
      ),
    },
  };

  return (
    <section id="features" className="features-section">
      <div className="features-container">
        {/* Left Column: Heading and Segments */}
        <div className="features-left">
          <span className="features-badge">NUTRITIONAL PHILOSOPHY</span>
          <h2 className="features-heading">
            Crafted for <br />
            longevity. <br />
            <span className="text-serif">Baked with care.</span>
          </h2>
          
          <p className="features-left-desc">
            We focus on biological appropriateness. Every single ingredient has a clinical reason to be in your dog's bowl.
          </p>

          {/* Large Segmented Toggle Buttons */}
          <div className="segmented-toggle">
            {[
              { val: "baked", label: "Gently Baked" },
              { val: "raw", label: "Raw Coated" },
              { val: "grainfree", label: "Grain-Free" },
            ].map((btn) => (
              <button
                key={btn.val}
                className={`toggle-btn ${activeTab === btn.val ? "active" : ""}`}
                onClick={() => setActiveTab(btn.val)}
              >
                {btn.label}
                {activeTab === btn.val && (
                  <motion.div
                    className="toggle-active-bg"
                    layoutId="activeToggle"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Tab Content */}
        <div className="features-right">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="features-content-card"
              style={{ backgroundColor: tabData[activeTab].color }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="card-top">
                <div className="card-icon-wrapper">
                  {tabData[activeTab].icon}
                </div>
                {tabData[activeTab].svg}
              </div>

              <div className="card-body">
                <h3 className="card-title">{tabData[activeTab].title}</h3>
                <span className="card-subtitle">{tabData[activeTab].subtitle}</span>
                <p className="card-description">{tabData[activeTab].desc}</p>
                
                <div className="card-points">
                  {tabData[activeTab].points.map((pt, index) => (
                    <div key={index} className="card-point-row">
                      <div className="point-dot" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
