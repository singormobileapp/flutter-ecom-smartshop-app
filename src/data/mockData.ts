
import { Product, Category } from '@/types';

export const categories: Category[] = [
  { id: '1', name: 'Electronics', icon: 'smartphone' },
  { id: '2', name: 'Fashion', icon: 'shirt' },
  { id: '3', name: 'Home & Garden', icon: 'home' },
  { id: '4', name: 'Sports', icon: 'dumbbell' },
  { id: '5', name: 'Books', icon: 'book' },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'Premium wireless headphones with noise cancellation and 30-hour battery life.',
    price: 199.99,
    originalPrice: 249.99,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500'
    ],
    category: 'Electronics',
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
    featured: true
  },
  {
    id: '2',
    name: 'Smart Watch',
    description: 'Advanced fitness tracking with heart rate monitor and GPS.',
    price: 299.99,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500'
    ],
    category: 'Electronics',
    rating: 4.8,
    reviewCount: 89,
    inStock: true,
    featured: true
  },
  {
    id: '3',
    name: 'Laptop Backpack',
    description: 'Water-resistant laptop backpack with multiple compartments.',
    price: 79.99,
    originalPrice: 99.99,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
      'https://images.unsplash.com/photo-1581605405669-fcdf81983e85?w=500'
    ],
    category: 'Fashion',
    rating: 4.3,
    reviewCount: 56,
    inStock: true
  },
  {
    id: '4',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with thermal carafe and auto-shutoff.',
    price: 149.99,
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500',
      'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=500'
    ],
    category: 'Home & Garden',
    rating: 4.6,
    reviewCount: 234,
    inStock: true,
    featured: true
  },
  {
    id: '5',
    name: 'Running Shoes',
    description: 'Lightweight running shoes with superior cushioning and breathability.',
    price: 129.99,
    originalPrice: 159.99,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500'
    ],
    category: 'Sports',
    rating: 4.4,
    reviewCount: 167,
    inStock: true
  },
  {
    id: '6',
    name: 'Wireless Earbuds',
    description: 'True wireless earbuds with active noise cancellation.',
    price: 89.99,
    images: [
      'https://images.unsplash.com/photo-1590658165737-15a047b3fb9e?w=500',
      'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500'
    ],
    category: 'Electronics',
    rating: 4.2,
    reviewCount: 98,
    inStock: true
  }
];
