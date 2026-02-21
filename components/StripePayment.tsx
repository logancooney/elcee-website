'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

interface PaymentFormProps {
  service: string;
  hours?: number;
  isDeposit?: boolean;
  clientName: string;
  clientEmail: string;
  bookingDate?: string;
  selectedSlots?: string;
  onSuccess: () => void;
  onCancel: () => void;
}

function CheckoutForm({ service, hours, isDeposit, clientName, clientEmail, onSuccess, onCancel }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setError(submitError.message || 'Payment failed');
        setLoading(false);
        return;
      }

      const { error: confirmError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/booking-success`,
        },
      });

      if (confirmError) {
        setError(confirmError.message || 'Payment failed');
        setLoading(false);
      } else {
        // Payment succeeded
        onSuccess();
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />

      {error && (
        <div className="bg-red-900/50 border border-red-600 rounded-lg p-4 text-red-200">
          {error}
        </div>
      )}

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || loading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition"
        >
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </div>

      <p className="text-xs text-gray-400 text-center">
        Secure payment powered by Stripe. Your card details are never stored.
      </p>
    </form>
  );
}

export default function StripePayment(props: PaymentFormProps) {
  const [clientSecret, setClientSecret] = useState('');
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Create payment intent when component mounts
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service: props.service,
        hours: props.hours,
        isDeposit: props.isDeposit,
        clientName: props.clientName,
        clientEmail: props.clientEmail,
        bookingDate: props.bookingDate,
        selectedSlots: props.selectedSlots,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setClientSecret(data.clientSecret);
          setAmount(data.amount);
          setDescription(data.description);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to initialize payment');
        setLoading(false);
      });
  }, [props.service, props.hours, props.isDeposit, props.clientName, props.clientEmail, props.bookingDate, props.selectedSlots]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-400">Setting up secure payment...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/50 border border-red-600 rounded-lg p-6">
        <p className="text-red-200">{error}</p>
        <button
          onClick={props.onCancel}
          className="mt-4 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!clientSecret) {
    return null;
  }

  const options = {
    clientSecret,
    appearance: {
      theme: 'night' as const,
      variables: {
        colorPrimary: '#2563eb',
        colorBackground: '#1f2937',
        colorText: '#ffffff',
        colorDanger: '#dc2626',
        borderRadius: '8px',
      },
    },
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Complete Payment</h2>
        <div className="flex justify-between items-center text-lg">
          <span className="text-gray-300">{description}</span>
          <span className="font-bold text-2xl">£{(amount / 100).toFixed(2)}</span>
        </div>
      </div>

      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm {...props} />
      </Elements>
    </div>
  );
}
