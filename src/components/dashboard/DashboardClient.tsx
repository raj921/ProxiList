'use client';

import React from 'react';
import type { Store, ShoppingList, Promotion, ShoppingListItem, CategoryId } from '@/types';
import { mockStores, mockShoppingLists, mockPromotions } from '@/lib/mockData';
import { NearbyStoresView } from '@/components/store/NearbyStoresView';
import { ShoppingListsView } from '@/components/shopping-list/ShoppingListsView';
import { SmartSuggestSection } from '@/components/ai/SmartSuggestSection';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

export function DashboardClient() {
  const [stores, setStores] = React.useState<Store[]>(mockStores);
  const [shoppingLists, setShoppingLists] = React.useState<ShoppingList[]>(mockShoppingLists);
  const [promotions, setPromotions] = React.useState<Promotion[]>(mockPromotions);
  const [selectedStore, setSelectedStore] = React.useState<Store | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = React.useState(false);
  
  const { toast } = useToast();

  // Simulate fetching/updating stores based on location
  const handleUpdateLocation = async (locationQuery: string) => {
    setIsLoadingLocation(true);
    toast({ title: "Updating Location", description: `Searching for stores near "${locationQuery}"...` });
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock logic: filter stores if query matches, otherwise show all or a subset
    // In a real app, this would be an API call to a backend service with geolocation.
    const newStores = mockStores.filter(store => 
        store.storeName.toLowerCase().includes(locationQuery.toLowerCase()) ||
        store.location.address?.toLowerCase().includes(locationQuery.toLowerCase())
    );
    
    setStores(newStores.length > 0 ? newStores : mockStores.slice(0,2).map(s=> ({...s, distance: (s.distance ?? 1) * 1.5}))); // Show some stores if specific not found
    setIsLoadingLocation(false);
    toast({ title: "Location Updated", description: `Showing stores near "${locationQuery}".` });
  };


  const handleSelectStore = (storeId: string) => {
    const store = stores.find(s => s.id === storeId);
    setSelectedStore(store || null);
    toast({ title: "Store Selected", description: `${store?.storeName || 'Store'} details loaded.` });
  };

  // Shopping List CRUD operations
  const handleCreateList = (listName: string) => {
    const newList: ShoppingList = {
      id: `list-${Date.now()}`,
      userId: 'user-123', // Mock user
      listName,
      items: [],
      storeId: selectedStore?.id // Assign to selected store if any
    };
    setShoppingLists(prev => [...prev, newList]);
    toast({ title: "List Created", description: `"${listName}" has been added.`});
  };

  const handleUpdateList = (listId: string, updates: Partial<ShoppingList>) => {
    setShoppingLists(prev => prev.map(l => l.id === listId ? { ...l, ...updates } : l));
    toast({ title: "List Updated", description: `List details saved.`});
  };

  const handleDeleteList = (listId: string) => {
    setShoppingLists(prev => prev.filter(l => l.id !== listId));
    toast({ title: "List Deleted", variant: "destructive" });
  };

  const handleAddItemToList = (listId: string, itemData: Omit<ShoppingListItem, 'id' | 'isPurchased'>) => {
    const newItem: ShoppingListItem = {
      ...itemData,
      id: `item-${Date.now()}`,
      isPurchased: false,
    };
    setShoppingLists(prev => prev.map(l => {
      if (l.id === listId) {
        return { ...l, items: [...l.items, newItem] };
      }
      return l;
    }));
    toast({ title: "Item Added", description: `"${newItem.itemName}" added to list.` });
  };

  const handleUpdateItemInList = (listId: string, itemId: string, updates: Partial<ShoppingListItem>) => {
    setShoppingLists(prev => prev.map(l => {
      if (l.id === listId) {
        return { ...l, items: l.items.map(i => i.id === itemId ? { ...i, ...updates } : i) };
      }
      return l;
    }));
    toast({ title: "Item Updated" });
  };

  const handleDeleteItemFromList = (listId: string, itemId: string) => {
    setShoppingLists(prev => prev.map(l => {
      if (l.id === listId) {
        return { ...l, items: l.items.filter(i => i.id !== itemId) };
      }
      return l;
    }));
    toast({ title: "Item Deleted", variant: "destructive" });
  };

  const handleToggleItemPurchased = (listId: string, itemId: string) => {
    setShoppingLists(prev => prev.map(l => {
      if (l.id === listId) {
        return { ...l, items: l.items.map(i => i.id === itemId ? { ...i, isPurchased: !i.isPurchased } : i) };
      }
      return l;
    }));
  };

  const listsToDisplay = selectedStore 
    ? shoppingLists.filter(list => list.storeId === selectedStore.id || !list.storeId) // Show store-specific and general lists
    : shoppingLists; // Show all lists if no store selected

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 space-y-8">
        <NearbyStoresView 
          stores={stores} 
          promotions={promotions}
          onSelectStore={handleSelectStore}
          onUpdateLocation={handleUpdateLocation}
          isLoadingLocation={isLoadingLocation}
        />
        <Separator />
        <SmartSuggestSection />
      </div>

      <div className="lg:col-span-2">
        <ShoppingListsView
          lists={listsToDisplay}
          selectedStoreName={selectedStore?.storeName}
          onCreateList={handleCreateList}
          onUpdateList={handleUpdateList}
          onDeleteList={handleDeleteList}
          onAddItemToList={handleAddItemToList}
          onUpdateItemInList={handleUpdateItemInList}
          onDeleteItemFromList={handleDeleteItemFromList}
          onToggleItemPurchased={handleToggleItemPurchased}
        />
      </div>
    </div>
  );
}
