import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, MessageCircle } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How is KÄLLA different from traditional extruded kibble?",
      answer: "Traditional dry foods are extruded at extreme temperatures (often exceeding 180°C) and extreme pressure, which destroys natural nutrients, denatures protein structures, and kills beneficial gut bacteria. KÄLLA is baked slowly at low temperatures (around 90°C). This gentle cooking process preserves natural vitamins, enhances taste naturally without artificial fat sprays, and supports healthy digest-stability.",
    },
    {
      question: "How do I transition my dog to KÄLLA?",
      answer: "We recommend a slow transition over a 7-day period to allow your dog's gut flora to adapt. On Days 1-2, feed 75% old food and 25% KÄLLA. On Days 3-4, feed a 50/50 mix. On Days 5-6, feed 25% old food and 75% KÄLLA. On Day 7, your dog is ready for 100% KÄLLA BOWL! If your dog has a highly sensitive stomach, extend this transition to 10 days.",
    },
    {
      question: "Do you use any fillers or chemical preservatives?",
      answer: "Absolutely not. We are strictly committed to clean, organic, human-grade nutrition. Our recipes contain zero corn, soy, wheat, animal by-products, or gluten. We do not use any artificial colorings, artificial flavors, or synthetic chemical preservatives. Instead, we preserve our food naturally using natural rosemary extract and vitamin E (tocopherols).",
    },
    {
      question: "Can I feed KÄLLA to puppies and seniors?",
      answer: "Yes! KÄLLA is formulated by veterinary nutritionists to exceed the AAFCO dog nutrient profiles for all life stages. For puppies, our nutrient-dense recipes offer the high protein and bio-available fats needed for skeletal growth. For seniors, the low-temperature baking process makes the kibble easy to chew, and the natural glucosamine protects aging joints.",
    },
    {
      question: "How long does a bag stay fresh after opening?",
      answer: "Because we do not use chemical preservatives, we recommend sealing the bag tightly and consuming it within 6 to 8 weeks after opening. Keep the bag stored in a cool, dry place out of direct sunlight. Our bags feature an airtight resealable press-to-lock zipper to maximize ongoing freshness.",
    }
  ];

  const toggleAccordion = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <section id="faq" className="faq-section">
      <div className="faq-container">
        {/* Left column */}
        <div className="faq-left">
          <span className="faq-badge">KNOWLEDGE BASE</span>
          <h2 className="faq-heading">
            Got questions? <br />
            <span className="text-serif">We have answers.</span>
          </h2>
          <p className="faq-desc">
            We are here to help you choose the best diet plan for your pet. If your question is not listed, our veterinary support line is open daily.
          </p>

          <div className="faq-support-box">
            <div className="support-icon-ring">
              <MessageCircle size={22} />
            </div>
            <div className="support-details">
              <span className="support-title">Veterinary Chat Support</span>
              <span className="support-hours">Mon–Fri, 9:00 AM – 6:00 PM CET</span>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=kallabowl.orders@gmail.com"

                className="support-link"
              >
                kallabowl.orders@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Right column (Accordions) */}
        <div className="faq-right">
          <div className="faq-list">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`faq-item ${isOpen ? "open" : ""}`}
                >
                  <button
                    className="faq-trigger"
                    onClick={() => toggleAccordion(idx)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-question">{faq.question}</span>
                    <span className="faq-toggle-icon">
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        className="faq-answer-wrapper"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="faq-answer-inner">
                          <p className="faq-answer">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
