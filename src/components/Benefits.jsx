import { motion } from "framer-motion";
import { Shield, Flame, Activity } from "lucide-react";

export default function Benefits() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const floatAnimation = (duration = 6, yOffset = 10, delay = 0) => ({
    y: [-yOffset, yOffset, -yOffset],
    transition: {
      duration,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
      delay,
    },
  });

  return (
    <section id="benefits" className="benefits-section">
      {/* Organic background abstract shape */}
      <div className="benefits-bg-shape" />

      <div className="benefits-container">
        <div className="benefits-header">
          <span className="benefits-badge">CLINICAL HEALTH BENEFIT</span>
          <h2 className="benefits-heading">
            Nutritional benefits <br />
            <span className="text-serif">you can actually see.</span>
          </h2>
          <p className="benefits-description">
            Our biologically appropriate recipes build health from the inside out. Visibly healthier skin, better stools, and endless energy.
          </p>
        </div>

        <motion.div
          className="benefits-visual-wrapper"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Central Bowl Container */}
          <div className="bowl-centerpiece-container">
            <motion.div
              className="organic-bowl-wrapper"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <svg viewBox="0 0 500 500" fill="none" className="organic-bowl-svg">
                {/* Outer Shadow */}
                <circle cx="250" cy="280" r="190" fill="rgba(17,42,29,0.06)" filter="blur(10px)" />
                
                {/* Bowl Outer Rim (Forest green premium finish) */}
                <circle cx="250" cy="250" r="180" fill="#112a1d" stroke="#d1f23a" strokeWidth="4" />
                
                {/* Bowl Inner Shadow/Depth */}
                <circle cx="250" cy="250" r="160" fill="#0c2016" />
                <circle cx="250" cy="250" r="150" fill="#1b3b22" />
                
                {/* Kibble Fill Layer (Stylized gold/brown texture) */}
                <ellipse cx="250" cy="250" rx="130" ry="130" fill="#a48c5c" opacity="0.95" />
                
                {/* Custom SVG Fresh Toppings Layer */}
                {/* Salmon Slice (Center Left) */}
                <path
                  d="M170 210C170 190 200 170 220 180C240 190 230 220 210 230C190 240 170 230 170 210Z"
                  fill="#f28e82"
                  stroke="#112a1d"
                  strokeWidth="2"
                />
                {/* Salmon fat lines */}
                <path d="M185 205Q195 195 205 205" stroke="#ffffff" strokeWidth="2" />
                <path d="M195 215Q205 205 215 215" stroke="#ffffff" strokeWidth="2" />
                
                {/* Avocado Slice (Center Right) */}
                <path
                  d="M260 270C260 230 290 200 310 220C330 240 310 290 280 290C260 290 260 270 260 270Z"
                  fill="#c8d672"
                  stroke="#112a1d"
                  strokeWidth="2"
                />
                <path
                  d="M275 270C275 245 295 225 305 235C315 245 305 280 285 280C275 280 275 270 275 270Z"
                  fill="#e9f29b"
                />
                
                {/* Blueberries (Scattered) */}
                <circle cx="220" cy="290" r="14" fill="#30446b" stroke="#112a1d" strokeWidth="2" />
                <circle cx="222" cy="288" r="12" fill="#3f588a" />
                <path d="M214 290Q220 288 220 282" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
                
                <circle cx="280" cy="180" r="12" fill="#30446b" stroke="#112a1d" strokeWidth="2" />
                
                {/* Rosemary Sprig (Top Middle) */}
                <path d="M210 140Q250 130 270 160" stroke="#112a1d" strokeWidth="3" strokeLinecap="round" fill="none" />
                {/* Rosemary leaves */}
                <path d="M220 135C218 125 228 128 230 135Z" fill="#112a1d" />
                <path d="M235 130C233 120 243 123 245 130Z" fill="#112a1d" />
                <path d="M250 133C248 123 258 126 260 133Z" fill="#112a1d" />
                
                {/* Sweet Potato Cubes */}
                <rect x="230" y="220" width="22" height="22" rx="4" fill="#e37222" stroke="#112a1d" strokeWidth="2" transform="rotate(15 230 220)" />
                <rect x="190" y="160" width="18" height="18" rx="4" fill="#e37222" stroke="#112a1d" strokeWidth="2" transform="rotate(-10 190 160)" />
              </svg>
            </motion.div>
          </div>

          {/* Floating Health Benefit Cards */}
          {/* Card 1: Shiny Coat (Left Top) */}
          <motion.div
            className="floating-benefit-card benefit-coat"
            animate={floatAnimation(5.5, 12, 0)}
          >
            <div className="benefit-icon-ring green-accent">
              <Flame size={20} />
            </div>
            <div className="benefit-card-details">
              <h4 className="benefit-card-title">Glossy Skin & Coat</h4>
              <p className="benefit-card-desc">Rich in Salmon Omega-3 & Zinc for zero itchiness and high shine.</p>
            </div>
          </motion.div>

          {/* Card 2: Gut Health (Right Mid) */}
          <motion.div
            className="floating-benefit-card benefit-gut"
            animate={floatAnimation(6, 8, 1.5)}
          >
            <div className="benefit-icon-ring lime-accent">
              <Shield size={20} />
            </div>
            <div className="benefit-card-details">
              <h4 className="benefit-card-title">Optimal Gut Health</h4>
              <p className="benefit-card-desc">Baked prebiotics and clean fibers promote steady digestion.</p>
            </div>
          </motion.div>

          {/* Card 3: Active Joints (Left Bottom) */}
          <motion.div
            className="floating-benefit-card benefit-joints"
            animate={floatAnimation(6.5, 15, 0.7)}
          >
            <div className="benefit-icon-ring black-accent">
              <Activity size={20} />
            </div>
            <div className="benefit-card-details">
              <h4 className="benefit-card-title">Strong Joints & Hips</h4>
              <p className="benefit-card-desc">Naturally occurring glucosamine from slow-cooked cartilage.</p>
            </div>
          </motion.div>

          {/* Floating Ingredients surrounding the bowl */}
          {/* Rosemary Leaf */}
          <motion.div
            className="floating-ingredient ing-rosemary"
            animate={floatAnimation(4.5, 20, 0.3)}
          >
            <svg width="60" height="40" viewBox="0 0 60 40" fill="none">
              <path d="M10 30C25 30 45 15 50 5" stroke="#112a1d" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M22 23C20 12 30 15 32 20C34 25 24 25 22 23Z" fill="#112a1d" />
              <path d="M35 17C33 8 41 10 43 15C45 20 37 20 35 17Z" fill="#112a1d" />
            </svg>
          </motion.div>

          {/* Blueberry */}
          <motion.div
            className="floating-ingredient ing-berry"
            animate={floatAnimation(5, 12, 1.8)}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="16" fill="#30446b" stroke="#112a1d" strokeWidth="2" />
              <circle cx="22" cy="18" r="13" fill="#3f588a" />
              <circle cx="20" cy="10" r="4" fill="#d1f23a" />
            </svg>
          </motion.div>

          {/* Salmon chunk */}
          <motion.div
            className="floating-ingredient ing-salmon"
            animate={floatAnimation(7, 18, 1)}
          >
            <svg width="65" height="45" viewBox="0 0 65 45" fill="none">
              <rect x="5" y="5" width="55" height="35" rx="10" fill="#f28e82" stroke="#112a1d" strokeWidth="2" />
              <path d="M12 12C20 18 35 18 53 12" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
              <path d="M12 22C20 28 35 28 53 22" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
              <path d="M12 32C20 38 35 38 53 32" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </motion.div>

          {/* Avocado half */}
          <motion.div
            className="floating-ingredient ing-avocado"
            animate={floatAnimation(5.8, 14, 2.5)}
          >
            <svg width="70" height="90" viewBox="0 0 70 90" fill="none">
              <path d="M35 5C15 5 5 25 5 50C5 75 18 85 35 85C52 85 65 75 65 50C65 25 55 5 35 5Z" fill="#c8d672" stroke="#112a1d" strokeWidth="2" />
              <path d="M35 15C20 15 12 30 12 50C12 70 22 75 35 75C48 75 58 70 58 50C58 30 50 15 35 15Z" fill="#e9f29b" />
              <circle cx="35" cy="52" r="14" fill="#755227" stroke="#112a1d" strokeWidth="2" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
