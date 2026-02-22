"use client";

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What equipment do you use?",
    answer: "Professional-grade signal chain including Neumann and AKG microphones, UAD Apollo interface, Yamaha HS8 monitors, and industry-standard plugins (Waves, FabFilter, UAD, iZotope)."
  },
  {
    question: "What's your turnaround time?",
    answer: "Standard turnaround is 3-5 days for mixing. Rush delivery (24-48 hours) is available with a 40% surcharge for time-sensitive projects."
  },
  {
    question: "Do you work with all genres?",
    answer: "Yes. While I specialize in rap, hip-hop, and alternative music, I work across all genres with the same professional standard."
  },
  {
    question: "How many revisions are included?",
    answer: "Up to 3 revision rounds are included with mixing services. Additional revisions can be arranged if needed."
  },
  {
    question: "Can I attend mixing sessions?",
    answer: "Sessions are typically completed independently for efficiency, but in-person mix sessions can be arranged if preferred."
  },
  {
    question: "What formats do you deliver?",
    answer: "All industry-standard formats: WAV, MP3, stems, and any specific formats required for your distribution or label."
  },
  {
    question: "Do you offer production services?",
    answer: "Yes. Custom production starts at £400 for fully bespoke beats. Additional production work on existing tracks starts at £150."
  },
  {
    question: "Where is the studio located?",
    answer: "Cambridge Street, Manchester, M7 1UY — approximately 10 minutes from Manchester city centre. Easily accessible by public transport or car with nearby parking."
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
