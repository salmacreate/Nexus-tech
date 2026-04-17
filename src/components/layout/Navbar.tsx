'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Search, User, Menu, X, Cpu } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '../ui/Button';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, logout } = useAuth();

  const navLinks = [
    { name: 'Products', href: '/products' },
    { name: 'Deals', href: '/products?category=Deals' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/70 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
            className="bg-primary text-primary-foreground p-1.5 rounded-lg"
          >
            <Cpu className="w-5 h-5" />
          </motion.div>
          <span className="font-black text-xl tracking-tight hidden sm:block">
            NEXUS<span className="text-primary">TECH</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" size="sm" className="p-2 h-9 w-9 rounded-full hidden sm:flex">
            <Search className="w-4 h-4" />
          </Button>
          
          <Link href="/cart">
            <Button variant="ghost" size="sm" className="relative p-2 h-9 w-9 rounded-full">
              <ShoppingCart className="w-4 h-4" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </Link>

          <div className="hidden sm:block">
            {user ? (
              <Button variant="ghost" size="sm" className="gap-2 rounded-full" onClick={logout}>
                <User className="w-4 h-4" />
                <span className="text-sm hidden lg:block">{user.name}</span>
              </Button>
            ) : (
              <Link href="/login">
                <Button variant="secondary" size="sm" className="rounded-full">
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="p-2 h-9 w-9 rounded-full md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background"
          >
            <nav className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium p-2 hover:bg-secondary rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-border my-2" />
              {user ? (
                <Button variant="outline" className="w-full justify-start" onClick={() => { logout(); setIsMobileMenuOpen(false); }}>
                  <User className="w-4 h-4 mr-2" />
                  Logout ({user.name})
                </Button>
              ) : (
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full">
                    Login / Register
                  </Button>
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
