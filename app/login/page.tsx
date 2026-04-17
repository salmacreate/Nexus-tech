'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Cpu, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, isLogin ? 'User' : name || 'New User');
    router.push('/');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 group mb-6">
            <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
              <Cpu className="w-6 h-6" />
            </div>
            <span className="font-black text-2xl tracking-tight">
              NEXUS<span className="text-primary">TECH</span>
            </span>
          </Link>
          <h2 className="text-3xl font-bold mb-2 text-foreground">
            {isLogin ? 'Welcome back' : 'Create an account'}
          </h2>
          <p className="text-foreground/60">
            {isLogin 
              ? 'Enter your details to access your account.' 
              : 'Sign up to get started with NexusTech.'}
          </p>
        </div>

        <motion.div 
          className="bg-card border border-border p-8 rounded-3xl shadow-xl shadow-black/50"
          initial={false}
          animate={{ height: 'auto' }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="popLayout">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0, translateY: -20 }}
                  animate={{ opacity: 1, height: 'auto', translateY: 0 }}
                  exit={{ opacity: 0, height: 0, translateY: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2"
                >
                  <label className="text-sm font-medium">Full Name</label>
                  <input 
                    required={!isLogin}
                    type="text" 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" 
                    placeholder="John Doe" 
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <input 
                required 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" 
                placeholder="you@example.com" 
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Password</label>
                {isLogin && <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>}
              </div>
              <input 
                required 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" 
                placeholder="••••••••" 
                minLength={6}
              />
            </div>

            <Button type="submit" fullWidth size="lg">
              {isLogin ? 'Sign In' : 'Sign Up'} <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="text-sm text-foreground/60 hover:text-primary transition-colors"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
