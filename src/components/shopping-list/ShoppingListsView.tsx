'use client';

import type { ShoppingList, ShoppingListItem } from '@/types';
import { EditableShoppingListCard } from './EditableShoppingListCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';
import { ListPlus, ShoppingBag } from 'lucide-react';

interface ShoppingListsViewProps {
  lists: ShoppingList[];
  onCreateList: (listName: string) => void;
  onUpdateList: (listId: string, updates: Partial<ShoppingList>) => void;
  onDeleteList: (listId: string) => void;
  onAddItemToList: (listId: string, item: Omit<ShoppingListItem, 'id' | 'isPurchased'>) => void;
  onUpdateItemInList: (listId: string, itemId: string, updates: Partial<ShoppingListItem>) => void;
  onDeleteItemFromList: (listId: string, itemId: string) => void;
  onToggleItemPurchased: (listId: string, itemId: string) => void;
  selectedStoreName?: string;
}

export function ShoppingListsView({
  lists,
  onCreateList,
  onUpdateList,
  onDeleteList,
  onAddItemToList,
  onUpdateItemInList,
  onDeleteItemFromList,
  onToggleItemPurchased,
  selectedStoreName,
}: ShoppingListsViewProps) {
  const [newListName, setNewListName] = React.useState('');

  const handleCreateList = () => {
    if (newListName.trim()) {
      onCreateList(newListName.trim());
      setNewListName('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-headline font-semibold flex items-center">
          <ShoppingBag className="h-6 w-6 mr-2 text-primary" />
          Your Shopping Lists {selectedStoreName && <span className="text-base text-muted-foreground ml-2">(for {selectedStoreName})</span>}
        </h2>
      </div>
      
      <div className="flex gap-2 p-4 border rounded-lg bg-card shadow">
        <Input
          type="text"
          placeholder="New list name (e.g., Weekend Groceries)"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          className="flex-grow"
          aria-label="New shopping list name"
        />
        <Button onClick={handleCreateList} className="bg-primary hover:bg-primary/90">
          <ListPlus className="h-4 w-4 mr-2" />
          Create List
        </Button>
      </div>

      {lists.length === 0 && (
        <p className="text-muted-foreground py-4 text-center">You don't have any shopping lists yet. Create one above!</p>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {lists.map(list => (
          <EditableShoppingListCard
            key={list.id}
            list={list}
            onUpdateList={onUpdateList}
            onDeleteList={onDeleteList}
            onAddItemToList={onAddItemToList}
            onUpdateItemInList={onUpdateItemInList}
            onDeleteItemFromList={onDeleteItemFromList}
            onToggleItemPurchased={onToggleItemPurchased}
          />
        ))}
      </div>
    </div>
  );
}
