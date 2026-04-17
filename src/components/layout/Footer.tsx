import React from 'react';
import Link from 'next/link';
import { Cpu, Globe, MessageSquare, Camera } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary/30 border-t border-border pt-16 pb-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 group mb-4">
              <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="font-black text-xl tracking-tight">
                NEXUS<span className="text-primary">TECH</span>
              </span>
            </Link>
            <p className="text-sm text-foreground/60 mb-6 max-w-xs">
              The ultimate destination for premium tech gear. Unleash your potential with our curated selection.
            </p>
            <div className="flex gap-4 text-foreground/60">
              <a href="#" className="hover:text-primary transition-colors"><MessageSquare className="w-5 h-5" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Globe className="w-5 h-5" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Camera className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li><Link href="/products?category=Phones" className="hover:text-primary transition-colors">Phones</Link></li>
              <li><Link href="/products?category=Laptops" className="hover:text-primary transition-colors">Laptops</Link></li>
              <li><Link href="/products?category=Accessories" className="hover:text-primary transition-colors">Accessories</Link></li>
              <li><Link href="/products?category=Gaming" className="hover:text-primary transition-colors">Gaming</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li><Link href="#" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">FAQs</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Track Order</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-sm text-foreground/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} NexusTech. All rights reserved.</p>
          <div className="flex gap-4">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>Amex</span>
            <span>PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
