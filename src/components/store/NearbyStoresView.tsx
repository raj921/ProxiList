'use client';

import type { Store, Promotion } from '@/types';
import { StoreCard } from './StoreCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, Search } from 'lucide-react';
import React from 'react';

interface NearbyStoresViewProps {
  stores: Store[];
  promotions: Promotion[];
  onSelectStore: (storeId: string) => void;
  onUpdateLocation: (location: string) => void;
  isLoadingLocation: boolean;
}

export function NearbyStoresView({ stores, promotions, onSelectStore, onUpdateLocation, isLoadingLocation }: NearbyStoresViewProps) {
  const [locationSearch, setLocationSearch] = React.useState('');
  
  const handleSearch = () => {
    if (locationSearch.trim()) {
      onUpdateLocation(locationSearch.trim());
    }
  };

  // Sort stores by distance if available
  const sortedStores = React.useMemo(() => {
    return [...stores].sort((a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity));
  }, [stores]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-headline font-semibold flex items-center">
        <MapPin className="h-6 w-6 mr-2 text-primary" />
        Nearby Stores
      </h2>
      
      <div className="flex gap-2">
        <Input 
          type="text" 
          placeholder="Enter your location (e.g., 'near Safeway')" 
          value={locationSearch}
          onChange={(e) => setLocationSearch(e.target.value)}
          className="flex-grow"
          aria-label="Enter your location"
        />
        <Button onClick={handleSearch} disabled={isLoadingLocation}>
          <Search className="h-4 w-4 mr-2" />
          {isLoadingLocation ? 'Updating...' : 'Update'}
        </Button>
      </div>

      {isLoadingLocation && <p className="text-sm text-muted-foreground">Fetching stores based on your location...</p>}
      
      {!isLoadingLocation && stores.length === 0 && (
        <p className="text-muted-foreground">No stores found nearby, or try updating your location.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedStores.map(store => (
          <StoreCard key={store.id} store={store} onSelectStore={onSelectStore} promotions={promotions} />
        ))}
      </div>
    </div>
  );
}
