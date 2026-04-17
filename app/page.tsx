'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, ShieldCheck, BatteryCharging } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ProductCard } from '@/components/ui/ProductCard';
import { mockProducts } from '@/data/mockProducts';

export default function Home() {
  const featuredProducts = mockProducts.filter(p => p.isFeatured);
  
  const categories = [
    { name: 'Phones', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400&auto=format&fit=crop' },
    { name: 'Laptops', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=400&auto=format&fit=crop' },
    { name: 'Accessories', image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=400&auto=format&fit=crop' },
    { name: 'Gaming', image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=400&auto=format&fit=crop' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 md:pt-32 md:pb-48">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary/10 to-background" />
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
          <motion.h1 
            className="text-5xl md:text-7xl font-black mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            The Future of Tech, <br className="hidden md:block" />
            <span className="text-primary">Delivered Today.</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-foreground/70 max-w-2xl mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover our curated selection of premium smartphones, powerful laptops, and next-gen accessories designed to elevate your digital lifestyle.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Link href="/products" className="w-full sm:w-auto">
              <Button size="lg" fullWidth className="group">
                Shop Now 
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/products?category=Deals" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" fullWidth>
                View Deals
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 border-y border-border bg-secondary/20">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { icon: <Zap className="w-8 h-8 text-primary" />, title: 'Lightning Fast', desc: 'Next-day delivery on all orders over $50.' },
            { icon: <ShieldCheck className="w-8 h-8 text-primary" />, title: 'Secure Checkout', desc: '100% encrypted payment processing.' },
            { icon: <BatteryCharging className="w-8 h-8 text-primary" />, title: 'Extended Warranty', desc: '2-year warranty included on major devices.' }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <div className="mb-4 p-4 rounded-full bg-primary/10">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-foreground/60">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
            <p className="text-foreground/60">Handpicked gear just for you.</p>
          </div>
          <Link href="/products">
            <Button variant="ghost" className="hidden sm:flex">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-8 sm:hidden">
          <Link href="/products" className="block">
            <Button variant="outline" fullWidth>View All Products</Button>
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-secondary/10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((img, i) => (
              <Link key={i} href={`/products?category=${img.name}`}>
                <motion.div 
                  className="relative h-64 rounded-2xl overflow-hidden group border border-border"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
                  <img src={img.image} alt={img.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 p-6 flex items-end z-20">
                    <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">{img.name}</h3>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
