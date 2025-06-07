import type { Store, Promotion } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface StoreCardProps {
  store: Store;
  onSelectStore: (storeId: string) => void;
  promotions: Promotion[];
}

export function StoreCard({ store, onSelectStore, promotions }: StoreCardProps) {
  const storePromotions = promotions.filter(p => p.storeId === store.id);

  return (
    <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="font-headline text-xl">{store.storeName}</CardTitle>
        <CardDescription className="flex items-center text-sm">
          <MapPin className="h-4 w-4 mr-1" /> {store.location.address || `Lat: ${store.location.latitude.toFixed(2)}, Lon: ${store.location.longitude.toFixed(2)}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {store.distance && <p className="text-sm text-muted-foreground mb-2">Distance: {store.distance.toFixed(1)} miles</p>}
        {storePromotions.length > 0 && (
          <div className="mt-2">
            <h4 className="text-xs font-semibold mb-1 text-accent flex items-center">
              <Tag className="h-3 w-3 mr-1" />
              Active Promotions:
            </h4>
            <div className="flex flex-wrap gap-1">
              {storePromotions.slice(0, 2).map(promo => (
                <Badge key={promo.id} variant="secondary" className="text-xs bg-accent/10 text-accent-foreground border-accent/30">
                  {promo.itemName}: {promo.discount}
                </Badge>
              ))}
              {storePromotions.length > 2 && <Badge variant="outline" className="text-xs">+{storePromotions.length-2} more</Badge>}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={() => onSelectStore(store.id)} variant="outline" className="w-full">
          View Details & Lists
        </Button>
      </CardFooter>
    </Card>
  );
}
