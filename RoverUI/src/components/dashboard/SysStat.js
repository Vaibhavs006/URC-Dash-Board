import React from 'react';
import { Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const SystemStatus = ({ batteryLevel, signalStrength, temperature, roverStatus, ledStatus }) => {
  return (
    <Card className="bg-zinc-900 border-0 rounded-xl shadow-lg">
      <CardHeader className="px-6 py-4">
        <CardTitle className="flex items-center gap-4 text-purple-400">
          <Activity className="w-6 h-6" />
          <h2 className="text-xl font-semibold">System Status</h2>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 text-gray-300 space-y-2">
        <div>Battery: {batteryLevel}%</div>
        <div>Signal: {signalStrength}%</div>
        <div>Temp: {temperature}°C</div>
        <div>Status: {roverStatus}</div>
        <div>LED: {ledStatus}</div>
      </CardContent>
    </Card>
  );
};

export default SystemStatus;
