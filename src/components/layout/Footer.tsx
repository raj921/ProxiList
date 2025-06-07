
'use client';

import { useState, useEffect } from 'react';

export function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-secondary text-secondary-foreground py-6 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {currentYear !== null ? currentYear : ''} ProxiList. All rights reserved.
        </p>
        <p className="text-xs mt-1">
          Your Smart Shopping Companion.
        </p>
      </div>
    </footer>
  );
}
