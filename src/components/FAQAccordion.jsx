// ============================================================
// MESOB - FAQ Accordion Component
// ============================================================

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaMinus, FaQuestionCircle } from 'react-icons/fa';

/**
 * Single FAQ item
 */
const FAQItem = ({ faq, isOpen, onToggle }) => {
  return (
    <div
      className={`border rounded-xl overflow-hidden transition-all duration-200 ${
        isOpen
          ? 'border-primary-200 bg-primary-50/30 shadow-sm'
          : 'border-gray-200 bg-white hover:border-primary-200'
      }`}
    >
      {/* Question / Toggle */}
      <button
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.id}`}
        id={`faq-question-${faq.id}`}
      >
        <div className="flex items-start gap-3 flex-1">
          <FaQuestionCircle
            className={`w-4 h-4 mt-0.5 flex-shrink-0 transition-colors duration-200 ${
              isOpen ? 'text-primary' : 'text-gray-400'
            }`}
            aria-hidden="true"
          />
          <span
            className={`font-semibold text-sm leading-relaxed transition-colors duration-200 ${
              isOpen ? 'text-primary' : 'text-dark'
            }`}
          >
            {faq.question}
          </span>
        </div>

        {/* Toggle icon */}
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
            isOpen ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'
          }`}
        >
          {isOpen ? (
            <FaMinus className="w-3 h-3" aria-hidden="true" />
          ) : (
            <FaPlus className="w-3 h-3" aria-hidden="true" />
          )}
        </div>
      </button>

      {/* Answer */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${faq.id}`}
            role="region"
            aria-labelledby={`faq-question-${faq.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-6 pb-5 pl-[52px]">
              <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/**
 * FAQ Accordion - renders a list of FAQ items
 * Supports single or multiple open at once
 */
const FAQAccordion = ({ faqs, allowMultiple = false }) => {
  const [openIds, setOpenIds] = useState([]);

  const toggleItem = (id) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className="flex flex-col gap-3" role="list">
      {faqs.map((faq) => (
        <div key={faq.id} role="listitem">
          <FAQItem
            faq={faq}
            isOpen={openIds.includes(faq.id)}
            onToggle={() => toggleItem(faq.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;
