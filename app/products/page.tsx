'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { mockProducts, Category, Product } from '@/data/mockProducts';
import { ProductCard } from '@/components/ui/ProductCard';
import { Button } from '@/components/ui/Button';

export default function ProductsPage() {
  return (
    <React.Suspense fallback={
      <div className="container mx-auto px-4 py-24 flex justify-center">
        <div className="animate-pulse w-full h-64 bg-secondary/50 rounded-2xl" />
      </div>
    }>
      <ProductsContent />
    </React.Suspense>
  );
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') as Category | 'All' | null;
  const initialSearch = searchParams.get('q');

  const [category, setCategory] = useState<Category | 'All' | 'Deals'>(initialCategory || 'All');
  const [sortParam, setSortParam] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const categories = ['All', 'Phones', 'Laptops', 'Accessories', 'Gaming', 'Deals'];

  const filteredProducts = useMemo(() => {
    let result = [...mockProducts];

    // Filter by Category
    if (category === 'Deals') {
      result = result.filter(p => p.price < 500); // Simple mock logic for deals
    } else if (category !== 'All') {
      result = result.filter(p => p.category === category);
    }

    // Filter by Search
    if (initialSearch) {
      const q = initialSearch.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }

    // Sort
    if (sortParam === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortParam === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortParam === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      // featured
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [category, sortParam, initialSearch]);

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-black mb-4">
          {initialSearch ? `Search for "${initialSearch}"` : category === 'All' ? 'All Products' : category}
        </h1>
        <p className="text-foreground/60">
          Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex items-center justify-between mb-4">
          <Button variant="outline" onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}>
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          
          <div className="relative inline-flex items-center">
            <SlidersHorizontal className="w-4 h-4 mr-2 text-foreground/60" />
            <select
              className="bg-transparent text-sm font-medium outline-none appearance-none pr-6 cursor-pointer"
              value={sortParam}
              onChange={(e) => setSortParam(e.target.value as any)}
            >
              <option className="bg-background text-foreground" value="featured">Sort by Featured</option>
              <option className="bg-background text-foreground" value="price-asc">Price: Low to High</option>
              <option className="bg-background text-foreground" value="price-desc">Price: High to Low</option>
              <option className="bg-background text-foreground" value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Sidebar Filters */}
        <AnimatePresence>
          {(isMobileFiltersOpen || typeof window !== 'undefined' && window.innerWidth >= 1024) && (
            <motion.aside
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:w-64 flex-shrink-0 flex flex-col gap-8 overflow-hidden lg:overflow-visible"
            >
              <div>
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <Filter className="w-5 h-5 mr-2" /> Categories
                </h3>
                <div className="flex flex-col space-y-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        category === cat ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary text-foreground/80'
                      }`}
                      onClick={() => setCategory(cat as any)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="hidden lg:block">
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <SlidersHorizontal className="w-5 h-5 mr-2" /> Sort By
                </h3>
                <div className="flex flex-col space-y-2">
                  <button onClick={() => setSortParam('featured')} className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${sortParam === 'featured' ? 'bg-secondary font-bold' : 'hover:bg-secondary/50'}`}>Featured</button>
                  <button onClick={() => setSortParam('price-asc')} className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${sortParam === 'price-asc' ? 'bg-secondary font-bold' : 'hover:bg-secondary/50'}`}>Price: Low to High</button>
                  <button onClick={() => setSortParam('price-desc')} className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${sortParam === 'price-desc' ? 'bg-secondary font-bold' : 'hover:bg-secondary/50'}`}>Price: High to Low</button>
                  <button onClick={() => setSortParam('rating')} className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${sortParam === 'rating' ? 'bg-secondary font-bold' : 'hover:bg-secondary/50'}`}>Top Rated</button>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filteredProducts.map(product => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="text-center py-20 bg-secondary/20 rounded-2xl border border-border">
              <h3 className="text-xl font-bold mb-2">No products found</h3>
              <p className="text-foreground/60 mb-6">Try adjusting your filters or search query.</p>
              <Button onClick={() => setCategory('All')}>Clear Filters</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
