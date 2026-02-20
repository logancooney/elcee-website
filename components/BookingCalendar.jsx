import { useState } from 'react';

export default function BookingCalendar() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    duration: '2',
    service: '',
    message: ''
  });
  
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const services = [
    { value: 'recording', label: 'Recording Session', price: '£35/hr' },
    { value: 'mixing', label: 'Mixing', price: '£190 (Vocal) / £340 (Full)' },
    { value: 'mastering', label: 'Mastering', price: '£40' },
    { value: 'tutoring', label: 'Ableton Tutoring', price: '£35/hr' },
    { value: 'production', label: 'Production', price: '£400+' }
  ];

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', 
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: '',
          time: '',
          duration: '2',
          service: '',
          message: ''
        });
      } else {
        setStatus('error');
        setErrorMessage(data.message || 'Booking failed. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Something went wrong. Please email elcee.mgmt@gmail.com directly.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Get minimum date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="booking-calendar bg-zinc-900 rounded-lg p-8 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-2">Book a Session</h2>
      <p className="text-zinc-400 mb-6">
        Select a time and service. You'll receive confirmation via email.
      </p>

      {status === 'success' && (
        <div className="bg-green-900/20 border border-green-700 rounded-lg p-4 mb-6">
          <p className="text-green-400 font-semibold">✅ Booking Request Sent!</p>
          <p className="text-sm text-zinc-300 mt-1">
            Check your email for confirmation. I'll be in touch shortly about deposit payment.
          </p>
        </div>
      )}

      {status === 'error' && (
        <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 mb-6">
          <p className="text-red-400 font-semibold">❌ Booking Failed</p>
          <p className="text-sm text-zinc-300 mt-1">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-orange-500"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-orange-500"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            Phone (optional)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-orange-500"
          />
        </div>

        {/* Service */}
        <div>
          <label htmlFor="service" className="block text-sm font-medium mb-2">
            Service *
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-orange-500"
          >
            <option value="">Select a service...</option>
            {services.map(service => (
              <option key={service.value} value={service.value}>
                {service.label} - {service.price}
              </option>
            ))}
          </select>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium mb-2">
              Date *
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={minDate}
              required
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label htmlFor="time" className="block text-sm font-medium mb-2">
              Start Time *
            </label>
            <select
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-orange-500"
            >
              <option value="">Select time...</option>
              {timeSlots.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Duration */}
        <div>
          <label htmlFor="duration" className="block text-sm font-medium mb-2">
            Duration (hours)
          </label>
          <select
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-orange-500"
          >
            <option value="1">1 hour</option>
            <option value="2">2 hours</option>
            <option value="3">3 hours</option>
            <option value="4">4 hours</option>
            <option value="6">6 hours</option>
            <option value="8">8 hours</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Project Details (optional)
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            placeholder="Tell me about your project, genre, reference tracks, etc."
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-orange-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? 'Submitting...' : 'Request Booking'}
        </button>

        <p className="text-sm text-zinc-400 text-center">
          A deposit is required to confirm your booking. Payment details will be sent via email.
        </p>
      </form>

      {/* Pricing Summary */}
      <div className="mt-8 p-4 bg-zinc-800 rounded-lg border border-zinc-700">
        <h3 className="font-semibold mb-2">Studio Rates</h3>
        <ul className="text-sm text-zinc-300 space-y-1">
          <li>• Hourly: £35/hr (pay-as-you-go)</li>
          <li>• Loyalty: £30/hr (£240/month subscription)</li>
          <li>• Full Mix & Master: £340</li>
          <li>• Vocal Mix: £190</li>
          <li>• Mastering: £40</li>
          <li>• Add-ons: Vocal tune £40, Stem separation £75</li>
        </ul>
      </div>
    </div>
  );
}
