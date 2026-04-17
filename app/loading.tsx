import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
      <p className="text-foreground/60 font-medium">Loading...</p>
    </div>
  );
}
