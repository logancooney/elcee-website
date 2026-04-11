"use client";

import { useState } from 'react';
import Link from 'next/link';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Do I need any experience?",
    answer: "None. I've worked with people who've never opened a DAW before and people with years of experience who just felt stuck. Sessions start wherever you are."
  },
  {
    question: "What equipment do I need?",
    answer: "For online sessions — a computer, headphones, and your DAW. For in-studio, just show up. Everything's here. No DAW yet? We'll sort that on the call."
  },
  {
    question: "Which DAW do you teach?",
    answer: "I teach production in Ableton Live. For mixing I can work with you in any DAW — Logic, FL Studio, Pro Tools, whatever you're on."
  },
  {
    question: "Can I learn online?",
    answer: "Yes. £40/hour via video call. You share your screen, I walk you through everything live. Works just as well as being here in person."
  },
  {
    question: "How long are sessions?",
    answer: "Standard sessions are 1 hour. If you want longer, that can be arranged. Just mention it on your free session."
  },
  {
    question: "How do I pay?",
    answer: "Payment is taken before each session. Bank transfer or card both accepted. Packages are available if you want to block book and save. Ask about this on your free session."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 px-6 bg-white text-black">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-black">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50 transition"
              >
                <h3 className="text-xl font-semibold pr-8">{faq.question}</h3>
                <span className="text-2xl shrink-0">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Still have questions? Get in touch.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-black text-white px-8 py-3 font-semibold hover:bg-gray-800 transition"
          >
            Contact
          </Link>
        </div>
      </div>
    </section>
  );
}
