'use client';

import React, { useState } from 'react';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { Star, Shield, Car, RefreshCw, ShoppingCart, Minus, Plus, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { mockProducts } from '@/data/mockProducts';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';

// Using a standard client component here, could also pre-resolve the ID on the server
export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  const product = mockProducts.find(p => p.id === params.id);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  if (!product) {
    return notFound();
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Link href="/products" className="inline-flex items-center text-primary font-medium hover:underline mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-b border-border pb-16">
        {/* Gallery */}
        <motion.div 
          className="bg-white/5 rounded-3xl p-8 flex items-center justify-center min-h-[400px]"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.img 
            src={product.image} 
            alt={product.name} 
            className="object-contain w-full h-full max-h-[500px] drop-shadow-2xl" 
            whileHover={{ scale: 1.05 }}
          />
        </motion.div>

        {/* Details */}
        <motion.div 
          className="flex flex-col"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="mb-2 flex items-center gap-4">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full">
              {product.category}
            </span>
            {product.isFeatured && (
              <span className="text-sm font-semibold text-yellow-500 uppercase tracking-wider bg-yellow-500/10 px-3 py-1 rounded-full">
                Featured
              </span>
            )}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center text-yellow-500 bg-yellow-500/10 px-3 py-1 rounded-lg">
              <Star className="w-4 h-4 fill-current mr-1" />
              <span className="font-bold">{product.rating}</span>
            </div>
            <span className="text-foreground/50 text-sm">{product.reviews} Reviews</span>
          </div>

          <p className="text-xl text-foreground/80 mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="text-5xl font-black tracking-tighter mb-8">
            ${product.price.toLocaleString()}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="flex items-center border border-border rounded-xl px-4 py-2 bg-secondary/30 w-full sm:w-auto justify-between sm:justify-start">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:text-primary transition-colors disabled:opacity-50"
                disabled={quantity <= 1}
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="font-bold text-xl w-12 text-center">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 hover:text-primary transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <Button size="lg" className="flex-1 text-lg" onClick={handleAddToCart}>
              <ShoppingCart className="w-5 h-5 mr-3" />
              Add to Cart
            </Button>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto border border-border p-6 rounded-2xl bg-secondary/10">
            <div className="flex items-center gap-3">
              <Car className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Free Express Delivery</span>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">2 Year Warranty</span>
            </div>
            <div className="flex items-center gap-3">
              <RefreshCw className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">30-Day Returns</span>
            </div>
            <div className="flex items-center gap-3 text-green-500">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm font-medium">In Stock and Ready to Ship</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Specifications */}
      <div className="py-16">
        <h2 className="text-3xl font-bold mb-8">Technical Specifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(product.specs).map(([key, value], i) => (
            <div key={key} className="border border-border p-6 rounded-2xl bg-secondary/5">
              <h3 className="text-sm text-foreground/50 uppercase tracking-wider mb-2">{key}</h3>
              <p className="text-lg font-medium">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
