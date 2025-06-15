
import { Product, Category } from '@/types';

export const categories: Category[] = [
  { id: '1', name: 'Electronics', icon: '📱' },
  { id: '2', name: 'Clothing', icon: '👕' },
  { id: '3', name: 'Books', icon: '📚' },
  { id: '4', name: 'Home & Garden', icon: '🏠' },
  { id: '5', name: 'Sports', icon: '⚽' },
];

// Unsplash image URLs
const unsplash = {
  electronics: [
    'https://images.unsplash.com/photo-1518770660439-4636190af475',
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
  ],
  clothing: [
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
  ],
  books: [
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
  ],
  sports: [
    'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86',
  ],
};

export const products: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    description: 'Latest iPhone with advanced camera system and A17 Pro chip',
    price: 999,
    originalPrice: 1099,
    images: [unsplash.electronics[0], unsplash.electronics[1]],
    category: 'Electronics',
    rating: 4.8,
    reviewCount: 2547,
    inStock: true,
    featured: true,
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24',
    description: 'Flagship Android phone with excellent display and camera',
    price: 899,
    images: [unsplash.electronics[2]],
    category: 'Electronics',
    rating: 4.6,
    reviewCount: 1834,
    inStock: true,
    featured: true,
  },
  {
    id: '3',
    name: 'Classic T-Shirt',
    description: 'Comfortable cotton t-shirt in various colors',
    price: 29,
    originalPrice: 39,
    images: [unsplash.clothing[0]],
    category: 'Clothing',
    rating: 4.4,
    reviewCount: 892,
    inStock: true,
  },
  {
    id: '4',
    name: 'JavaScript Guide',
    description: 'Complete guide to modern JavaScript development',
    price: 45,
    images: [unsplash.books[0]],
    category: 'Books',
    rating: 4.7,
    reviewCount: 456,
    inStock: true,
    featured: true,
  },
  {
    id: '5',
    name: 'Wireless Headphones',
    description: 'Premium noise-cancelling wireless headphones',
    price: 199,
    originalPrice: 249,
    images: [unsplash.electronics[1]],
    category: 'Electronics',
    rating: 4.5,
    reviewCount: 1267,
    inStock: true,
  },
  {
    id: '6',
    name: 'Running Shoes',
    description: 'Comfortable running shoes for daily training',
    price: 89,
    images: [unsplash.sports[0]],
    category: 'Sports',
    rating: 4.3,
    reviewCount: 634,
    inStock: true,
  },
];

