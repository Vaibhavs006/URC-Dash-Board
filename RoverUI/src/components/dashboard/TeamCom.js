import React from 'react';
import { MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const TeamCommunication = () => {
  return (
    <Card className="mt-8 bg-zinc-900 border-0 rounded-xl shadow-lg">
      <CardHeader className="px-6 py-4">
        <CardTitle className="flex items-center gap-4 text-purple-400">
          <MessageSquare className="w-6 h-6" />
          <h2 className="text-2xl font-semibold">Team Communication</h2>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 text-gray-300">Comms panel placeholder</CardContent>
    </Card>
  );
};

export default TeamCommunication;
