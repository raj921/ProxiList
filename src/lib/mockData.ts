import type { Store, ShoppingList, Promotion, Category, CategoryId } from '@/types';
import { ShoppingBasket, Laptop, Shirt, Home, Pill, BookOpen, ToyBrick, Bike, Package } from 'lucide-react';

export const categories: Category[] = [
  { id: 'groceries', name: 'Groceries', icon: ShoppingBasket },
  { id: 'electronics', name: 'Electronics', icon: Laptop },
  { id: 'clothing', name: 'Clothing', icon: Shirt },
  { id: 'homegoods', name: 'Home Goods', icon: Home },
  { id: 'pharmacy', name: 'Pharmacy', icon: Pill },
  { id: 'books', name: 'Books', icon: BookOpen },
  { id: 'toys', name: 'Toys', icon: ToyBrick },
  { id: 'sports', name: 'Sports', icon: Bike },
  { id: 'other', name: 'Other', icon: Package },
];

export const getCategoryById = (id: CategoryId): Category | undefined => categories.find(c => c.id === id);

export const mockStores: Store[] = [
  {
    id: 'store-1',
    storeName: 'FreshMart Downtown',
    location: { latitude: 34.0522, longitude: -118.2437, address: '123 Main St, Los Angeles, CA' },
    stock: [
      { itemName: 'Organic Apples', categoryId: 'groceries', price: 2.99, available: true },
      { itemName: 'Milk (1 Gallon)', categoryId: 'groceries', price: 3.49, available: true },
      { itemName: 'Whole Wheat Bread', categoryId: 'groceries', price: 2.79, available: false },
      { itemName: 'Laptop Charger X', categoryId: 'electronics', price: 49.99, available: true },
    ],
    distance: 1.2,
  },
  {
    id: 'store-2',
    storeName: 'TechHub Central',
    location: { latitude: 34.0550, longitude: -118.2500, address: '456 Tech Ave, Los Angeles, CA' },
    stock: [
      { itemName: 'Smartphone Z', categoryId: 'electronics', price: 699.00, available: true },
      { itemName: 'Wireless Headphones', categoryId: 'electronics', price: 129.50, available: true },
      { itemName: 'Laptop Charger X', categoryId: 'electronics', price: 45.99, available: true },
    ],
    distance: 2.5,
  },
  {
    id: 'store-3',
    storeName: 'StyleSphere Boutique',
    location: { latitude: 34.0490, longitude: -118.2480, address: '789 Fashion Rd, Los Angeles, CA' },
    stock: [
      { itemName: 'Summer Dress', categoryId: 'clothing', price: 59.90, available: true },
      { itemName: 'Men\'s T-Shirt', categoryId: 'clothing', price: 24.99, available: true },
    ],
    distance: 1.8,
  },
  {
    id: 'store-4',
    storeName: 'Home Essentials',
    location: { latitude: 34.0600, longitude: -118.2300, address: '321 Home St, Los Angeles, CA' },
    stock: [
      { itemName: 'Coffee Maker', categoryId: 'homegoods', price: 39.99, available: true },
      { itemName: 'Towel Set', categoryId: 'homegoods', price: 19.99, available: true },
      { itemName: 'Organic Apples', categoryId: 'groceries', price: 3.19, available: true },
    ],
    distance: 3.1,
  }
];

export const mockShoppingLists: ShoppingList[] = [
  {
    id: 'list-1',
    userId: 'user-123',
    listName: 'Weekly Groceries',
    items: [
      { id: 'item-1', itemName: 'Organic Apples', categoryId: 'groceries', isPurchased: false, quantity: 6 },
      { id: 'item-2', itemName: 'Milk (1 Gallon)', categoryId: 'groceries', isPurchased: true, quantity: 1 },
      { id: 'item-3', itemName: 'Whole Wheat Bread', categoryId: 'groceries', isPurchased: false, quantity: 1 },
    ],
  },
  {
    id: 'list-2',
    userId: 'user-123',
    listName: 'Tech Upgrades',
    items: [
      { id: 'item-4', itemName: 'Wireless Headphones', categoryId: 'electronics', isPurchased: false, quantity: 1 },
      { id: 'item-5', itemName: 'Laptop Charger X', categoryId: 'electronics', isPurchased: false, quantity: 1, notes: "Need the new model" },
    ],
  },
];

export const mockPromotions: Promotion[] = [
  {
    id: 'promo-1',
    storeId: 'store-1',
    itemName: 'Organic Apples',
    discount: '10% off',
    description: 'Fresh organic apples, now 10% off!',
    validUntil: new Date(new Date().setDate(new Date().getDate() + 7)), // Valid for 7 days
  },
  {
    id: 'promo-2',
    storeId: 'store-2',
    itemName: 'Smartphone Z',
    discount: '$50 off',
    description: 'Get $50 off the new Smartphone Z!',
    validUntil: new Date(new Date().setDate(new Date().getDate() + 14)), // Valid for 14 days
  },
  {
    id: 'promo-3',
    storeId: 'store-1',
    itemName: 'Milk (1 Gallon)',
    discount: 'Buy 1 Get 1 Free',
    validUntil: new Date(new Date().setDate(new Date().getDate() + 3)),
  }
];
