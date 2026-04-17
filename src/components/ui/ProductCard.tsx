'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Product } from '@/data/mockProducts';
import { Star, ShoppingCart } from 'lucide-react';
import { Button } from './Button';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link href={`/products/${product.id}`}>
      <motion.div
        className="group relative flex flex-col overflow-hidden rounded-2xl bg-card border border-border transition-all hover:border-primary/50"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.4 }}
        whileHover={{ y: -5 }}
      >
        {/* Image Area */}
        <div className="relative aspect-square overflow-hidden bg-white/5 p-6 flex flex-col items-center justify-center">
          <motion.img
            src={product.image}
            alt={product.name}
            className="object-contain w-full h-full drop-shadow-xl"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>

        {/* Content Area */}
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
              {product.category}
            </span>
            <div className="flex items-center text-yellow-500 text-xs font-medium">
              <Star className="w-3 h-3 fill-current mr-1" />
              {product.rating}
            </div>
          </div>

          <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-sm text-foreground/60 line-clamp-2 mb-4 flex-1">
            {product.description}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <span className="text-xl font-black text-foreground">
              ${product.price.toLocaleString()}
            </span>
            <Button size="sm" variant="secondary" className="rounded-full px-3" onClick={handleAddToCart}>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
