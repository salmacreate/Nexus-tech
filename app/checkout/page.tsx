'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<1 | 2>(1);
  const [isSuccess, setIsSuccess] = useState(false);

  const tax = totalPrice * 0.08;
  const shipping = totalPrice > 50 ? 0 : 15;
  const finalTotal = totalPrice + tax + shipping;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      // Simulate payment processing
      setTimeout(() => {
        setIsSuccess(true);
        clearCart();
      }, 1500);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 15 }}
          className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6"
        >
          <CheckCircle2 className="w-12 h-12" />
        </motion.div>
        <h1 className="text-4xl font-black mb-4">Payment Successful!</h1>
        <p className="text-foreground/60 max-w-md mx-auto mb-8 text-lg">
          Thank you for your order. We've sent a confirmation email with your tracking details.
        </p>
        <Link href="/products">
          <Button size="lg">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  if (items.length === 0 && !isSuccess) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty.</h1>
        <Link href="/products"><Button>Go to Products</Button></Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl min-h-screen">
      <h1 className="text-4xl font-black mb-10 tracking-tight">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Form Area */}
        <div className="flex-1">
          {/* Progress Steps */}
          <div className="flex items-center mb-8">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${step === 1 ? 'bg-primary text-white' : 'bg-green-500 text-white'}`}>
              {step === 2 ? <CheckCircle2 className="w-5 h-5" /> : '1'}
            </div>
            <div className={`flex-1 h-1 mx-2 rounded-full ${step === 2 ? 'bg-primary' : 'bg-border'}`} />
            <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${step === 2 ? 'bg-primary text-white' : 'bg-secondary text-foreground/50'}`}>
              2
            </div>
          </div>

          <form id="checkout-form" onSubmit={handleCheckout} className="space-y-6">
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <h2 className="text-2xl font-bold">Shipping Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">First Name</label>
                    <input required type="text" className="w-full bg-secondary/30 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name</label>
                    <input required type="text" className="w-full bg-secondary/30 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <input required type="email" className="w-full bg-secondary/30 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Street Address</label>
                  <input required type="text" className="w-full bg-secondary/30 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="123 Main St" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">City</label>
                    <input required type="text" className="w-full bg-secondary/30 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="San Francisco" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Zip Code</label>
                    <input required type="text" className="w-full bg-secondary/30 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="94105" />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Payment Details</h2>
                  <button type="button" onClick={() => setStep(1)} className="text-sm text-primary hover:underline">Edit Shipping</button>
                </div>
                
                <div className="bg-secondary/20 p-6 rounded-2xl border border-border space-y-6 relative overflow-hidden">
                  <CreditCard className="absolute -right-10 -bottom-10 w-64 h-64 text-foreground/5 shrink-0" />
                  <div className="relative z-10 space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Card Number</label>
                      <input required type="text" maxLength={19} className="w-full bg-background border border-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent tracking-widest" placeholder="0000 0000 0000 0000" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Expiry Date</label>
                        <input required type="text" maxLength={5} className="w-full bg-background border border-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">CVC</label>
                        <input required type="text" maxLength={4} className="w-full bg-background border border-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="123" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Name on Card</label>
                      <input required type="text" className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="JOHN DOE" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:w-96 shrink-0">
          <div className="bg-secondary/20 border border-border rounded-3xl p-8 sticky top-24">
            <h2 className="text-2xl font-bold mb-6">Your Order</h2>
            
            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4">
                  <img src={item.product.image} className="w-16 h-16 object-contain bg-white/5 rounded-lg border border-border p-1 shrink-0 mix-blend-screen" alt="" />
                  <div className="flex-1">
                    <h4 className="font-bold text-sm line-clamp-1">{item.product.name}</h4>
                    <p className="text-foreground/50 text-xs mt-1">Qty: {item.quantity}</p>
                  </div>
                  <div className="font-bold text-sm text-right shrink-0">
                    ${(item.product.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 mb-6 text-sm border-t border-border pt-6">
              <div className="flex justify-between">
                <span className="text-foreground/60">Subtotal</span>
                <span className="font-medium">${totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/60">Tax (8%)</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/60">Shipping</span>
                <span className="font-medium">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
            </div>

            <div className="border-t border-border pt-4 mb-8">
              <div className="flex justify-between items-end">
                <span className="text-lg font-bold">Total</span>
                <span className="text-3xl font-black text-primary">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <Button form="checkout-form" type="submit" size="lg" fullWidth>
              {step === 1 ? 'Continue to Payment' : 'Pay Now'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
