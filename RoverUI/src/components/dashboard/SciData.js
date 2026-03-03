import React from 'react';
import { FlaskConical } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const ScienceData = ({ pHValue }) => {
  return (
    <Card className="bg-zinc-900 border-0 rounded-xl shadow-lg">
      <CardHeader className="px-6 py-4">
        <CardTitle className="flex items-center gap-4 text-purple-400">
          <FlaskConical className="w-6 h-6" />
          <h2 className="text-xl font-semibold">Science Data</h2>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 text-gray-300">pH: {pHValue}</CardContent>
    </Card>
  );
};

export default ScienceData;
