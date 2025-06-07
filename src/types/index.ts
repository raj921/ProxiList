export interface User {
  uid: string;
  email: string | null;
  displayName?: string | null;
  preferred_stores?: Record<string, string>; // categoryId to storeId
}

export type CategoryId = 'groceries' | 'electronics' | 'clothing' | 'homegoods' | 'pharmacy' | 'books' | 'toys' | 'sports' | 'other';

export interface Category {
  id: CategoryId;
  name: string;
  icon?: React.ElementType; // For Lucide icons
}

export interface ShoppingListItem {
  id: string;
  itemName: string;
  categoryId: CategoryId;
  isPurchased: boolean;
  quantity: number;
  notes?: string;
}

export interface ShoppingList {
  id: string;
  userId: string;
  listName: string;
  items: ShoppingListItem[];
  storeId?: string; // Optional: if list is for a specific store
}

export interface StoreStockItem {
  itemName: string;
  categoryId: CategoryId;
  price: number;
  available: boolean;
}

export interface Store {
  id: string;
  storeName: string;
  location: {
    latitude: number;
    longitude: number;
    address?: string; // For display
  };
  stock: StoreStockItem[];
  promotions?: Promotion[]; // Promotions specific to this store can be embedded or linked
  distance?: number; // Calculated, for sorting
}

export interface Promotion {
  id: string;
  storeId: string;
  itemName: string; // Could also be categoryId for category-wide promotions
  discount: string; // e.g., "20% off", "$5 off"
  description?: string;
  validUntil: Date;
}

export interface UserLocation {
  latitude: number;
  longitude: number;
}
