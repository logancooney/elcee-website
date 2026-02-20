"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import StudioGallery from "./components/StudioGallery";
import BookingCalendar from "@/components/BookingCalendar";

export default function StudioPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    times: [] as string[], // Changed to array for multiple slots
    message: ""
  });

  const [showCalendar, setShowCalendar] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (result.success) {
        alert("Booking request submitted! We'll be in touch within 24 hours.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          date: "",
          times: [],
          message: ""
        });
      } else {
        alert("Failed to submit booking. Please try again or email directly.");
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert("Failed to submit booking. Please try again or email directly.");
    }
  };

  const services = [
    { name: "Recording & Engineering", price: "£35/hr (ad-hoc) | £30/hr (subscription)" },
    { name: "Full Mix & Master", price: "£340" },
    { name: "Vocal Mix", price: "£190" },
    { name: "Mastering", price: "£40" },
    { name: "Music Production", price: "£400+ (bespoke)" },
    { name: "Ableton Tutoring", price: "£35/hr" }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-sm z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/">
            <Image 
              src="/logos/eta-logo-white.png" 
              alt="Elcee the Alchemist" 
              width={120} 
              height={40}
              className="h-10 w-auto"
            />
          </Link>
          <div className="flex gap-8 text-sm font-medium">
            <Link href="/" className="hover:text-gray-400 transition">Home</Link>
            <Link href="/studio" className="hover:text-gray-400 transition">Studio</Link>
            <Link href="/shop" className="hover:text-gray-400 transition">Shop</Link>
            <Link href="/contact" className="hover:text-gray-400 transition">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">STUDIO SERVICES</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Professional recording, mixing, mastering, and production in Manchester. 
            Six years of experience transforming artists' visions into reality.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-12 px-6 bg-white text-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Services & Pricing</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service) => (
              <div key={service.name} className="border border-black p-6">
                <h3 className="text-2xl font-bold mb-2">{service.name}</h3>
                <p className="text-gray-600">{service.price}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 p-8 bg-black text-white">
            <h3 className="text-2xl font-bold mb-4">Add-ons & Packages</h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <p className="font-semibold">Vocal Tuning: £40</p>
              </div>
              <div>
                <p className="font-semibold">Stem Separation: £75</p>
              </div>
              <div>
                <p className="font-semibold">Rush Service: +40%</p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="font-semibold mb-2">Bulk Packages:</p>
              <p className="text-gray-400">3-Track Package: £920 | 5-Track Package: £1,450</p>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Gallery */}
      <StudioGallery />

      {/* Booking Form */}
      <section className="py-20 px-6 bg-black text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">Book a Session</h2>
          <p className="text-center text-gray-400 mb-12">
            Fill out the form below and we'll get back to you within 24 hours to confirm availability.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name *</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-white/5 border border-white/20 px-4 py-3 focus:outline-none focus:border-white"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <input 
                  type="email" 
                  required
                  className="w-full bg-white/5 border border-white/20 px-4 py-3 focus:outline-none focus:border-white"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input 
                  type="tel" 
                  className="w-full bg-white/5 border border-white/20 px-4 py-3 focus:outline-none focus:border-white"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Service *</label>
                <select 
                  required
                  className="w-full bg-white/5 border border-white/20 px-4 py-3 focus:outline-none focus:border-white"
                  value={formData.service}
                  onChange={(e) => setFormData({...formData, service: e.target.value})}
                >
                  <option value="">Select a service</option>
                  {services.map((s) => (
                    <option key={s.name} value={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date & Time Selection */}
            {!showCalendar ? (
              <div className="border border-white/20 p-6 text-center">
                {formData.date && formData.times.length > 0 ? (
                  <div className="mb-4">
                    <p className="text-sm text-gray-400 mb-2">Selected session:</p>
                    <p className="text-xl font-bold">
                      {new Date(formData.date).toLocaleDateString('en-GB', { 
                        weekday: 'long', 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </p>
                    <p className="text-lg mt-2">
                      {formData.times.join(', ')} ({formData.times.length * 2} hours)
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-400 mb-4">Choose your preferred date and time slots</p>
                )}
                
                <button
                  type="button"
                  onClick={() => setShowCalendar(!showCalendar)}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 transition font-semibold"
                >
                  {formData.date && formData.times.length > 0 ? 'Change Time Slots' : 'Select Time Slots'}
                </button>
              </div>
            ) : (
              <div className="border border-white/20 p-6">
                <BookingCalendar 
                  onSelectSlots={(date, times) => {
                    setFormData({...formData, date, times});
                    setShowCalendar(false);
                  }}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Additional Details</label>
              <textarea 
                rows={4}
                className="w-full bg-white/5 border border-white/20 px-4 py-3 focus:outline-none focus:border-white"
                placeholder="Tell us about your project..."
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />
            </div>

            <div className="text-sm text-gray-400">
              <p className="mb-2">* By submitting this form, you agree to our service terms and contractual agreements.</p>
              <a href="#" className="underline hover:text-white">Download Service Agreement (PDF)</a>
            </div>

            <button 
              type="submit"
              disabled={!formData.date || formData.times.length === 0}
              className={`
                w-full py-4 font-bold text-lg transition
                ${formData.date && formData.times.length > 0
                  ? 'bg-white text-black hover:bg-gray-200 cursor-pointer'
                  : 'bg-white/20 text-white/40 cursor-not-allowed'
                }
              `}
            >
              {formData.date && formData.times.length > 0
                ? 'Submit Booking Request' 
                : 'Select time slots to continue'
              }
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">© 2026 Elcee the Alchemist. All rights reserved.</p>
          <Image 
            src="/logos/ankh.png" 
            alt="Ankh" 
            width={30} 
            height={30}
            className="opacity-50"
          />
        </div>
      </footer>
    </div>
  );
}
