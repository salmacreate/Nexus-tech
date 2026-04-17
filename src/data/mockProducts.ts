export type Category = 'Phones' | 'Laptops' | 'Accessories' | 'Gaming';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  rating: number;
  reviews: number;
  specs: Record<string, string>;
  isFeatured?: boolean;
}

export const mockProducts: Product[] = [
  {
    id: 'p1',
    name: 'X-Phone Pro Max',
    description: 'The ultimate smartphone experience with pro-level cameras and all-day battery life.',
    price: 1099,
    category: 'Phones',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop',
    rating: 4.8,
    reviews: 1240,
    specs: {
      Display: '6.7" OLED',
      Processor: 'A17 Bionic',
      Camera: '48MP Main, 12MP Ultrawide',
      Battery: '4323 mAh'
    },
    isFeatured: true,
  },
  {
    id: 'p2',
    name: 'Galaxy Fold Z',
    description: 'Unfold your world with the latest foldable technology.',
    price: 1799,
    category: 'Phones',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=800&auto=format&fit=crop',
    rating: 4.6,
    reviews: 856,
    specs: {
      Display: '7.6" AMOLED Flexible',
      Processor: 'Snapdragon 8 Gen 2',
      Camera: '50MP Main, 12MP Ultrawide, 10MP Telephoto',
      Battery: '4400 mAh'
    }
  },
  {
    id: 'l1',
    name: 'MacBook Pro 16"',
    description: 'Supercharged for pros with M3 Max chip. Unrivaled performance and battery life.',
    price: 2499,
    category: 'Laptops',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    reviews: 2100,
    specs: {
      Display: '16.2" Liquid Retina XDR',
      Processor: 'M3 Max 14-core',
      Memory: '32GB Unified Memory',
      Storage: '1TB SSD'
    },
    isFeatured: true,
  },
  {
    id: 'l2',
    name: 'ZenBook 14 OLED',
    description: 'Ultra-thin, ultra-light, ultra-powerful. The perfect companion for productivity on the go.',
    price: 999,
    category: 'Laptops',
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=800&auto=format&fit=crop',
    rating: 4.5,
    reviews: 320,
    specs: {
      Display: '14" OLED 90Hz',
      Processor: 'Intel Core i7-1360P',
      Memory: '16GB LPDDR5',
      Storage: '512GB PCIe G4'
    }
  },
  {
    id: 'a1',
    name: 'AirPods Pro 2',
    description: 'Active Noise Cancellation, Adaptive Transparency, and Personalized Spatial Audio.',
    price: 249,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=800&auto=format&fit=crop',
    rating: 4.8,
    reviews: 4500,
    specs: {
      Type: 'In-ear true wireless',
      Battery: 'Up to 6 hours listening time',
      Connectivity: 'Bluetooth 5.3',
      Features: 'Water & sweat resistant (IPX4)'
    },
    isFeatured: true,
  },
  {
    id: 'g1',
    name: 'PlayStation 5 Pro',
    description: 'The ultimate gaming console with enhanced ray tracing and faster frame rates.',
    price: 699,
    category: 'Gaming',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    reviews: 1540,
    specs: {
      Storage: '2TB Custom NVMe SSD',
      Resolution: 'Up to 8K output',
      Features: 'Tempest 3D AudioTech',
      Controller: 'DualSense Wireless Controller included'
    }
  },
  {
    id: 'g2',
    name: 'Razer DeathAdder V3 Pro',
    description: 'Ultra-lightweight wireless ergonomic esports mouse.',
    price: 149,
    category: 'Gaming',
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479ea?q=80&w=800&auto=format&fit=crop',
    rating: 4.7,
    reviews: 890,
    specs: {
      Sensor: 'Focus Pro 30K Optical Sensor',
      Weight: '63g',
      Battery: 'Up to 90 hours',
      Switches: 'Optical Mouse Switches Gen-3'
    }
  },
  {
    id: 'a2',
    name: 'Anker 737 Power Bank',
    description: '24,000mAh 3-Port Portable Charger with 140W Output.',
    price: 129,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?q=80&w=800&auto=format&fit=crop',
    rating: 4.8,
    reviews: 1100,
    specs: {
      Capacity: '24,000 mAh',
      Ports: '2x USB-C, 1x USB-A',
      Output: '140W Max',
      Features: 'Smart Digital Display'
    }
  }
];
