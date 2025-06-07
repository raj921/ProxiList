import type { ShoppingListItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { CategoryIcon } from '@/components/icons/CategoryIcon';
import { Edit3, Save, Trash2, X } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';

interface ItemRowProps {
  item: ShoppingListItem;
  onTogglePurchased: (itemId: string) => void;
  onUpdateItem: (itemId: string, updates: Partial<ShoppingListItem>) => void;
  onDeleteItem: (itemId: string) => void;
}

export function ItemRow({ item, onTogglePurchased, onUpdateItem, onDeleteItem }: ItemRowProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedName, setEditedName] = React.useState(item.itemName);
  const [editedQuantity, setEditedQuantity] = React.useState(item.quantity);

  const handleSave = () => {
    onUpdateItem(item.id, { itemName: editedName, quantity: editedQuantity });
    setIsEditing(false);
  };

  return (
    <div className={cn(
      "flex items-center gap-3 p-3 border-b hover:bg-muted/50 transition-colors",
      item.isPurchased && "opacity-60"
    )}>
      <Checkbox
        id={`item-${item.id}`}
        checked={item.isPurchased}
        onCheckedChange={() => onTogglePurchased(item.id)}
        aria-label={item.isPurchased ? `Mark ${item.itemName} as not purchased` : `Mark ${item.itemName} as purchased`}
      />
      <CategoryIcon categoryId={item.categoryId} className="h-5 w-5 text-muted-foreground" />
      {isEditing ? (
        <>
          <Input
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="h-8 flex-grow"
            aria-label="Edit item name"
          />
          <Input
            type="number"
            value={editedQuantity}
            onChange={(e) => setEditedQuantity(parseInt(e.target.value, 10) || 1)}
            className="h-8 w-16"
            min="1"
            aria-label="Edit item quantity"
          />
          <Button onClick={handleSave} size="icon" variant="ghost" className="text-green-600 hover:text-green-700">
            <Save className="h-4 w-4" />
          </Button>
          <Button onClick={() => setIsEditing(false)} size="icon" variant="ghost">
            <X className="h-4 w-4" />
          </Button>
        </>
      ) : (
        <>
          <div className="flex-grow">
            <span className={cn("font-medium", item.isPurchased && "line-through")}>{item.itemName}</span>
            <span className="text-xs text-muted-foreground ml-2"> (Qty: {item.quantity})</span>
            {item.notes && <p className="text-xs text-muted-foreground italic">{item.notes}</p>}
          </div>
          <Button onClick={() => setIsEditing(true)} size="icon" variant="ghost" className="text-primary hover:text-primary/80">
            <Edit3 className="h-4 w-4" />
          </Button>
          <Button onClick={() => onDeleteItem(item.id)} size="icon" variant="ghost" className="text-destructive hover:text-destructive/80">
            <Trash2 className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  );
}
