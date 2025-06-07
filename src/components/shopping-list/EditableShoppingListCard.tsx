import type { ShoppingList, ShoppingListItem, CategoryId } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ItemRow } from './ItemRow';
import { AddItemForm } from './AddItemForm';
import { Edit3, Save, Trash2, PlusCircle, X } from 'lucide-react';
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';

interface EditableShoppingListCardProps {
  list: ShoppingList;
  onUpdateList: (listId: string, updates: Partial<ShoppingList>) => void;
  onDeleteList: (listId: string) => void;
  onAddItemToList: (listId: string, item: Omit<ShoppingListItem, 'id' | 'isPurchased'>) => void;
  onUpdateItemInList: (listId: string, itemId: string, updates: Partial<ShoppingListItem>) => void;
  onDeleteItemFromList: (listId: string, itemId: string) => void;
  onToggleItemPurchased: (listId: string, itemId: string) => void;
}

export function EditableShoppingListCard({
  list,
  onUpdateList,
  onDeleteList,
  onAddItemToList,
  onUpdateItemInList,
  onDeleteItemFromList,
  onToggleItemPurchased,
}: EditableShoppingListCardProps) {
  const [isRenaming, setIsRenaming] = React.useState(false);
  const [newName, setNewName] = React.useState(list.listName);
  const [showAddItemForm, setShowAddItemForm] = React.useState(false);

  const handleRename = () => {
    if (newName.trim() && newName !== list.listName) {
      onUpdateList(list.id, { listName: newName.trim() });
    }
    setIsRenaming(false);
  };

  const purchasedItemsCount = list.items.filter(item => item.isPurchased).length;
  const totalItemsCount = list.items.length;

  return (
    <Card className="w-full shadow-lg flex flex-col">
      <CardHeader>
        {isRenaming ? (
          <div className="flex items-center gap-2">
            <Input value={newName} onChange={(e) => setNewName(e.target.value)} className="h-9" aria-label="Rename list"/>
            <Button onClick={handleRename} size="icon" variant="ghost" className="text-green-600 hover:text-green-700">
              <Save className="h-5 w-5" />
            </Button>
            <Button onClick={() => setIsRenaming(false)} size="icon" variant="ghost">
              <X className="h-5 w-5" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <CardTitle className="font-headline text-xl">{list.listName}</CardTitle>
            <div className="flex items-center gap-1">
              <Button onClick={() => setIsRenaming(true)} size="icon" variant="ghost" className="text-primary hover:text-primary/80">
                <Edit3 className="h-5 w-5" />
              </Button>
              <Button onClick={() => onDeleteList(list.id)} size="icon" variant="ghost" className="text-destructive hover:text-destructive/80">
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )}
        <CardDescription>
          {purchasedItemsCount} of {totalItemsCount} items purchased.
          {list.storeId && <span className="ml-2 text-xs">(For store: {list.storeId})</span>}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ScrollArea className="h-[250px] pr-3"> {/* Adjust height as needed */}
          {list.items.length > 0 ? (
            list.items.map(item => (
              <ItemRow
                key={item.id}
                item={item}
                onTogglePurchased={() => onToggleItemPurchased(list.id, item.id)}
                onUpdateItem={(itemId, updates) => onUpdateItemInList(list.id, itemId, updates)}
                onDeleteItem={() => onDeleteItemFromList(list.id, item.id)}
              />
            ))
          ) : (
            <p className="text-muted-foreground text-sm py-4 text-center">No items in this list yet.</p>
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex-col items-stretch">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="add-item" className="border-none">
            <AccordionTrigger 
              onClick={() => setShowAddItemForm(prev => !prev)}
              className="py-2 hover:no-underline text-sm font-medium text-accent hover:text-accent/90"
            >
              <PlusCircle className="h-4 w-4 mr-2" /> Add New Item
            </AccordionTrigger>
            <AccordionContent>
              <AddItemForm
                listId={list.id}
                onAddItem={(item) => {
                  onAddItemToList(list.id, item);
                  // Optionally close form: setShowAddItemForm(false);
                }}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardFooter>
    </Card>
  );
}
