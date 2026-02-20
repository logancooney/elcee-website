'use client';

import { useState } from 'react';
import BookingCalendar from '@/components/BookingCalendar';
import StripePayment from '@/components/StripePayment';

interface Service {
  name: string;
  price: string;
  type: 'hourly' | 'project';
  stripeId: string;
}

export default function BookingFlow() {
  const [step, setStep] = useState<'form' | 'payment' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    times: [] as string[],
    message: ''
  });
  const [showCalendar, setShowCalendar] = useState(false);

  const services: Service[] = [
    { name: 'Recording & Engineering', price: '£35/hr', type: 'hourly', stripeId: 'recording' },
    { name: 'Ableton Tutoring', price: '£35/hr', type: 'hourly', stripeId: 'tutoring' },
    { name: 'Full Mix & Master', price: '£340 (£170 deposit)', type: 'project', stripeId: 'mixing_full' },
    { name: 'Vocal Mix', price: '£190 (£95 deposit)', type: 'project', stripeId: 'mixing_vocal' },
    { name: 'Mastering', price: '£40 (£20 deposit)', type: 'project', stripeId: 'mastering' },
  ];

  const selectedService = services.find(s => s.name === formData.service);
  const isProjectWork = selectedService?.type === 'project';
  const hours = formData.times.length * 2; // Each slot is 2 hours

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  if (step === 'payment' && selectedService) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => setStep('form')}
            className="text-gray-400 hover:text-white mb-4"
          >
            ← Back to form
          </button>
          <h2 className="text-3xl font-bold mb-2">Complete Payment</h2>
          <div className="text-gray-400">
            <p><strong>Service:</strong> {selectedService.name}</p>
            {!isProjectWork && <p><strong>Duration:</strong> {hours} hours</p>}
            <p><strong>Date:</strong> {new Date(formData.date).toLocaleDateString('en-GB', { 
              weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
            })}</p>
            {!isProjectWork && <p><strong>Time:</strong> {formData.times.join(', ')}</p>}
          </div>
        </div>

        <StripePayment
          service={selectedService.stripeId}
          hours={!isProjectWork ? hours : undefined}
          isDeposit={isProjectWork}
          clientName={formData.name}
          clientEmail={formData.email}
          onSuccess={() => window.location.href = '/booking-success'}
          onCancel={() => setStep('form')}
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold mb-4 text-center">Book a Session</h2>
      <p className="text-center text-gray-400 mb-12">
        {isProjectWork 
          ? 'Fill out the form and pay the 50% deposit to start your project.'
          : 'Fill out the form and complete payment to confirm your session.'}
      </p>
      
      <form onSubmit={handleFormSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Name *</label>
            <input 
              type="text" 
              required
              className="w-full bg-white/5 border border-white/20 px-4 py-3 focus:outline-none focus:border-white text-white"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email *</label>
            <input 
              type="email" 
              required
              className="w-full bg-white/5 border border-white/20 px-4 py-3 focus:outline-none focus:border-white text-white"
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
              className="w-full bg-white/5 border border-white/20 px-4 py-3 focus:outline-none focus:border-white text-white"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Service *</label>
            <select 
              required
              className="w-full bg-white/5 border border-white/20 px-4 py-3 focus:outline-none focus:border-white text-white"
              value={formData.service}
              onChange={(e) => setFormData({...formData, service: e.target.value})}
            >
              <option value="">Select a service</option>
              {services.map((s) => (
                <option key={s.name} value={s.name}>{s.name} - {s.price}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Only show calendar for hourly services */}
        {selectedService?.type === 'hourly' && (
          <>
            {!showCalendar ? (
              <div className="border border-white/20 p-6 text-center">
                {formData.date && formData.times.length > 0 ? (
                  <div className="mb-4">
                    <p className="text-sm text-gray-400 mb-2">Selected session:</p>
                    <p className="text-xl font-bold">
                      {new Date(formData.date).toLocaleDateString('en-GB', { 
                        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
                      })}
                    </p>
                    <p className="text-lg mt-2">
                      {formData.times.join(', ')} ({hours} hours)
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
          </>
        )}

        <div>
          <label className="block text-sm font-medium mb-2">Additional Details</label>
          <textarea 
            rows={4}
            className="w-full bg-white/5 border border-white/20 px-4 py-3 focus:outline-none focus:border-white text-white"
            placeholder="Tell us about your project..."
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
          />
        </div>

        <div className="text-sm text-gray-400">
          <p className="mb-2">
            * {isProjectWork 
              ? '50% deposit required to start. Final payment due on completion.' 
              : 'Full payment required to confirm booking.'}
          </p>
        </div>

        <button 
          type="submit"
          disabled={
            !formData.service || 
            (selectedService?.type === 'hourly' && (!formData.date || formData.times.length === 0))
          }
          className={`
            w-full py-4 font-bold text-lg transition
            ${(formData.service && (selectedService?.type === 'project' || (formData.date && formData.times.length > 0)))
              ? 'bg-white text-black hover:bg-gray-200 cursor-pointer'
              : 'bg-white/20 text-white/40 cursor-not-allowed'
            }
          `}
        >
          {isProjectWork ? 'Continue to Payment (Deposit)' : 'Continue to Payment'}
        </button>
      </form>
    </div>
  );
}
