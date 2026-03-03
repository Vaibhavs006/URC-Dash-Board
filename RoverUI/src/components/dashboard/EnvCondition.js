import React from 'react';
import { CloudSun } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const EnvironmentalConditions = () => {
  return (
    <Card className="bg-zinc-900 border-0 rounded-xl shadow-lg">
      <CardHeader className="px-6 py-4">
        <CardTitle className="flex items-center gap-4 text-purple-400">
          <CloudSun className="w-6 h-6" />
          <h2 className="text-xl font-semibold">Environmental Conditions</h2>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 text-gray-300">Env conditions placeholder</CardContent>
    </Card>
  );
};

export default EnvironmentalConditions;
