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
    answer: "No. I work with complete beginners through to experienced producers. Sessions are tailored entirely to where you are right now and where you want to get to."
  },
  {
    question: "What equipment do I need?",
    answer: "For online sessions, just a computer, headphones, and your DAW. For in-studio sessions, just show up — everything is here. If you don't have a DAW yet, we can figure that out on your free call."
  },
  {
    question: "Which DAW do you teach?",
    answer: "I specialise in Ableton Live for production. For mixing, I can teach you in any DAW — Logic, FL Studio, Pro Tools, Ableton, whatever you're working in."
  },
  {
    question: "Can I learn online?",
    answer: "Yes. Online sessions run at £40/hour via video call. You share your screen, I guide you through everything in real time. Works just as well as in person."
  },
  {
    question: "How long are sessions?",
    answer: "Standard sessions are 1 hour. If you want longer, that can be arranged — just mention it on your free call."
  },
  {
    question: "How do I pay?",
    answer: "Payment is taken before each session. Bank transfer or card both accepted. Packages are available if you want to block book and save — ask about this on your free call."
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
