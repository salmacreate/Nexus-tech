'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  const tax = totalPrice * 0.08; // 8% tax mock
  const shipping = totalPrice > 50 ? 0 : 15; // Free shipping over $50
  const finalTotal = totalPrice + tax + shipping;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-black mb-4">Your Cart is Empty</h1>
        <p className="text-foreground/60 max-w-md mx-auto mb-8">
          Looks like you haven't added any products to your cart yet. Let's get you back to shopping.
        </p>
        <Link href="/products">
          <Button size="lg">Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl min-h-screen">
      <h1 className="text-4xl font-black mb-10 tracking-tight">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items */}
        <div className="flex-1">
          <div className="hidden sm:grid grid-cols-12 gap-4 pb-4 border-b border-border text-sm font-semibold text-foreground/60 uppercase tracking-wider">
            <div className="col-span-6">Product</div>
            <div className="col-span-3 text-center">Quantity</div>
            <div className="col-span-3 text-right">Total</div>
          </div>

          <div className="mt-4 flex flex-col gap-6">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: -20 }}
                  className="flex flex-col sm:grid grid-cols-12 gap-4 sm:items-center py-4 border-b border-border/50"
                >
                  <div className="col-span-6 flex gap-4">
                    <div className="w-24 h-24 bg-white/5 rounded-xl p-2 shrink-0 border border-border">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-contain mix-blend-screen" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <Link href={`/products/${item.product.id}`} className="font-bold text-lg hover:text-primary transition-colors line-clamp-1">
                        {item.product.name}
                      </Link>
                      <p className="text-foreground/60 text-sm mb-2">{item.product.category}</p>
                      <button 
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-500 hover:text-red-400 text-sm font-medium flex items-center w-fit"
                      >
                        <Trash2 className="w-4 h-4 mr-1" /> Remove
                      </button>
                    </div>
                  </div>

                  <div className="col-span-3 flex justify-start sm:justify-center items-center mt-4 sm:mt-0">
                    <div className="flex items-center border border-border rounded-lg bg-secondary/30">
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-2 hover:text-primary transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-2 hover:text-primary transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="col-span-3 text-left sm:text-right font-bold text-lg">
                    ${(item.product.price * item.quantity).toLocaleString()}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-96 shrink-0">
          <div className="bg-secondary/20 border border-border rounded-3xl p-8 sticky top-24">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between">
                <span className="text-foreground/60">Subtotal</span>
                <span className="font-medium">${totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/60">Estimated Tax (8%)</span>
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

            <Link href="/checkout" className="block">
              <Button size="lg" fullWidth className="group">
                Proceed to Checkout
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <div className="mt-4 text-center">
              <p className="text-xs text-foreground/40">Secure Checkout powered by NextShop</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
