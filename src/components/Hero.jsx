import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Heart } from "lucide-react";

export default function Hero() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const floatAnimation = (delay = 0) => ({
    y: [-8, 8, -8],
    transition: {
      duration: 5,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
      delay,
    },
  });

  return (
    <section className="hero-section">
      <div className="hero-outer">
        <motion.div
          className="hero-inner"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Massive background text */}
          <div className="hero-bg-text-wrapper">
            <h1 className="hero-bg-text">KÄLLA</h1>
          </div>

          <div className="hero-content">
            {/* Left Content Column */}
            <div className="hero-left">
              <motion.div className="hero-badge" variants={itemVariants}>
                <Sparkles size={14} className="badge-icon" />
                <span>NORDIC INGREDIENTS • GENTLY BAKED</span>
              </motion.div>

              <motion.h2 className="hero-main-title" variants={itemVariants}>
                Canine nutrition, <br />
                <span className="text-serif">reimagined.</span>
              </motion.h2>

              <motion.p className="hero-description" variants={itemVariants}>
                A clean, organic meal plan tailored precisely for your dog.
                Gently baked at low temperatures to lock in flavor and gut-boosting prebiotics.
              </motion.p>

              <motion.div className="hero-cta-wrapper" variants={itemVariants}>
                <a href="#recommendation" className="hero-primary-btn">
                  <span>Match Your Dog</span>
                  <ArrowRight size={18} />
                </a>
                <a href="#products" className="hero-secondary-btn">
                  <span>Explore Recipes</span>
                </a>
              </motion.div>

              {/* Mini trust markers */}
              <motion.div className="hero-trust-row" variants={itemVariants}>
                <div className="trust-item">
                  <ShieldCheck size={16} />
                  <span>100% Bio-Organic</span>
                </div>
                <div className="trust-item">
                  <Heart size={16} />
                  <span>Hypoallergenic</span>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Central Hero Package + Floating elements */}
            <div className="hero-right">
              <div className="hero-media-wrapper">
                {/* Custom SVG premium canine bag design */}
                <motion.div
                  className="hero-bag-wrapper"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 1.2,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.4,
                  }}
                >
                  <img
                    src="/dog-hero.png"
                    alt="Healthy Dog"
                    className="hero-dog-image"
                  />

                  {/* Shadow */}
                  <ellipse cx="200" cy="520" rx="140" ry="15" fill="rgba(17,42,29,0.12)" filter="blur(8px)" />

                  {/* Bag Main Body */}
                  <path
                    d="M80 80C80 60 100 40 130 40H270C300 40 320 60 320 80V460C320 485 300 500 270 500H130C100 500 80 485 80 460V80Z"
                    fill="#ffffff"
                    stroke="#112a1d"
                    strokeWidth="6"
                  />

                  {/* Top Seal */}
                  <path d="M80 75H320" stroke="#112a1d" strokeWidth="8" strokeLinecap="round" />
                  <path d="M90 60H310" stroke="#112a1d" strokeWidth="2" strokeDasharray="6 4" />

                  {/* Premium Green Header Arch */}
                  <path
                    d="M83 80V180C140 150 260 150 317 180V80H83Z"
                    fill="#112a1d"
                  />

                  {/* Center Brand Text */}
                  <text x="200" y="125" fill="#f6f5f2" fontFamily="'Outfit', sans-serif" fontWeight="900" fontSize="24" textAnchor="middle" letterSpacing="0.15em">KÄLLA</text>
                  <text x="200" y="145" fill="#d1f23a" fontFamily="'Inter', sans-serif" fontWeight="600" fontSize="10" textAnchor="middle" letterSpacing="0.3em">ORGANIC PET CARE</text>

                  {/* Center Circle Label */}
                  <circle cx="200" cy="270" r="65" fill="#f6f5f2" stroke="#112a1d" strokeWidth="3" />
                  <circle cx="200" cy="270" r="58" fill="none" stroke="#edebe5" strokeWidth="2" />

                  {/* Dog Graphic Inside Circle (Minimalist SVG Dog Head) */}
                  <path
                    d="M185 275C185 275 190 260 200 260C210 260 215 275 215 275M190 280H210M200 280V286M200 286C198 286 195 288 195 290C195 292 200 292 200 292C200 292 205 292 205 290C205 288 202 286 200 286Z"
                    stroke="#112a1d"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Dog Ears */}
                  <path d="M175 255C170 250 168 268 174 274" stroke="#112a1d" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M225 255C230 250 232 268 226 274" stroke="#112a1d" strokeWidth="2.5" strokeLinecap="round" />

                  <text x="200" y="315" fill="#112a1d" fontFamily="'Outfit', sans-serif" fontWeight="700" fontSize="12" textAnchor="middle" letterSpacing="0.05em">ACTIVE BEEF</text>

                  {/* Ingredients Badge */}
                  <rect x="120" y="365" width="160" height="28" rx="14" fill="#edebe5" stroke="#112a1d" strokeWidth="2" />
                  <text x="200" y="383" fill="#112a1d" fontFamily="'Inter', sans-serif" fontWeight="600" fontSize="9" textAnchor="middle" letterSpacing="0.08em">SWEET POTATO & ROSEMARY</text>

                  {/* Weight and seal bottom details */}
                  <text x="200" y="435" fill="#4e5f56" fontFamily="'Inter', sans-serif" fontWeight="500" fontSize="10" textAnchor="middle">GENTLY DEHYDRATED • 2.5 KG</text>

                  {/* Lime Ribbon Accent */}
                  <path
                    d="M305 40L315 25L325 40V70L315 55L305 70V40Z"
                    fill="#d1f23a"
                    stroke="#112a1d"
                    strokeWidth="2"
                  />
                </motion.div>

                {/* Floating Element 1: Nutrition Tag */}
                <motion.div
                  className="floating-card nutrition-card"
                  animate={floatAnimation(0)}
                >
                  <div className="card-bullet" />
                  <div>
                    <span className="card-title">28% Protein</span>
                    <span className="card-subtitle">Fresh grass-fed beef</span>
                  </div>
                </motion.div>

                {/* Floating Element 2: Prebiotic Fibers Tag */}
                <motion.div
                  className="floating-card prebiotic-card"
                  animate={floatAnimation(1.5)}
                >
                  <div className="card-bullet-lime" />
                  <div>
                    <span className="card-title">Prebiotic Fiber</span>
                    <span className="card-subtitle">Optimal digest stability</span>
                  </div>
                </motion.div>

                {/* Floating Ingredient: Decorative Rosemary Stem */}
                <motion.div
                  className="floating-leaf leaf-1"
                  animate={floatAnimation(0.5)}
                >
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 36C22 36 32 26 36 12C36 12 22 16 18 26C14 36 12 36 12 36Z" fill="#d1f23a" stroke="#112a1d" strokeWidth="2" />
                    <path d="M16 28C22 28 26 22 28 16" stroke="#112a1d" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </motion.div>

                {/* Floating Ingredient: Berry */}
                <motion.div
                  className="floating-leaf leaf-2"
                  animate={floatAnimation(2.2)}
                >
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16" cy="16" r="12" fill="#112a1d" />
                    <path d="M12 12C14 10 18 10 20 12" stroke="#d1f23a" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Bottom curve decoration */}
          <div className="hero-curve-bottom">
            <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0C240 60 480 80 720 80C960 80 1200 60 1440 0V80H0V0Z" fill="#f6f5f2" />
            </svg>
          </div>
        </motion.div>
      </div >
    </section >
  );
}
