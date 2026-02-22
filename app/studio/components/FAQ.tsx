"use client";

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How much does studio time cost in Manchester?",
    answer: "Our hourly rate is £35 for ad-hoc sessions, or £30/hr with a loyalty subscription (£240/month). We also offer package deals: 3-song package for £920 and 5-song package for £1,450."
  },
  {
    question: "What services do you offer?",
    answer: "We provide recording, mixing, mastering, vocal tuning, music production, and Ableton tutoring. All services are available as standalone or packages. Full mix & master is £340, vocal mix is £190."
  },
  {
    question: "Where is the studio located?",
    answer: "We're based in Manchester city centre, easily accessible from Salford, Stockport, Bolton, Oldham, and surrounding areas."
  },
  {
    question: "How quickly can I get my mix back?",
    answer: "Standard turnaround is 3-5 days. Same-day mixing is available for rush projects with a 40% surcharge."
  },
  {
    question: "Do you work with all music genres?",
    answer: "Yes! While we specialize in rap, hip-hop, and alternative music, we work with all genres including R&B, pop, rock, and more."
  },
  {
    question: "What should I bring to my first session?",
    answer: "Just bring your lyrics (memorized if possible), reference tracks on your phone or USB, and a water bottle. All equipment is provided. Arrive 10 minutes early if it's your first time."
  },
  {
    question: "Can I book the studio for just 1 hour?",
    answer: "Sessions start at 2 hours minimum to ensure quality results. Most recording sessions benefit from at least 2-3 hours for vocals."
  },
  {
    question: "Do you provide beats/instrumentals?",
    answer: "Yes! Custom production starts at £400 for bespoke tracks, or £150+ for additional production work on existing material."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 px-6 bg-white text-black">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 text-center mb-12">
          Common questions about recording in our Manchester studio
        </p>
        
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
          <a
            href="/contact"
            className="inline-block bg-black text-white px-8 py-3 font-semibold hover:bg-gray-800 transition"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
