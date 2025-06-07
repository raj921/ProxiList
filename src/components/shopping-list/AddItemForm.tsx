import React from 'react';
import type { CategoryId, ShoppingListItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { categories } from '@/lib/mockData';
import { PlusCircle } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface AddItemFormProps {
  onAddItem: (item: Omit<ShoppingListItem, 'id' | 'isPurchased'>) => void;
  listId: string; // To associate item with a list
}

export function AddItemForm({ onAddItem }: AddItemFormProps) {
  const [itemName, setItemName] = React.useState('');
  const [categoryId, setCategoryId] = React.useState<CategoryId | ''>('');
  const [quantity, setQuantity] = React.useState(1);
  const [notes, setNotes] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemName.trim() || !categoryId) {
      // Basic validation, consider using react-hook-form for more complex scenarios
      alert('Item name and category are required.');
      return;
    }
    onAddItem({
      itemName: itemName.trim(),
      categoryId: categoryId as CategoryId,
      quantity,
      notes: notes.trim() || undefined,
    });
    setItemName('');
    setCategoryId('');
    setQuantity(1);
    setNotes('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg bg-card mt-4">
      <h4 className="text-md font-semibold">Add New Item</h4>
      <div>
        <Label htmlFor="itemName">Item Name</Label>
        <Input
          id="itemName"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="e.g., Apples"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="itemCategory">Category</Label>
        <Select value={categoryId} onValueChange={(value) => setCategoryId(value as CategoryId)}>
          <SelectTrigger id="itemCategory">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(cat => (
              <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="itemQuantity">Quantity</Label>
        <Input
          id="itemQuantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 1)}
          min="1"
          required
        />
      </div>

      <div>
        <Label htmlFor="itemNotes">Notes (Optional)</Label>
        <Textarea
          id="itemNotes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="e.g., organic, red ones"
        />
      </div>
      
      <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
        <PlusCircle className="h-4 w-4 mr-2" />
        Add Item
      </Button>
    </form>
  );
}
