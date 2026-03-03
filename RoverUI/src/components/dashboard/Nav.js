import React from 'react';
import { Compass } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const NavigationSection = () => {
  return (
    <Card className="bg-zinc-900 border-0 rounded-xl shadow-lg">
      <CardHeader className="px-6 py-4">
        <CardTitle className="flex items-center gap-4 text-purple-400">
          <Compass className="w-6 h-6" />
          <h2 className="text-xl font-semibold">Navigation</h2>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 text-gray-300">Navigation panel placeholder</CardContent>
    </Card>
  );
};

export default NavigationSection;
