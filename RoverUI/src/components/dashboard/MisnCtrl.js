import React, { useState } from 'react';
import { Settings, FlaskConical, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const MissionControl = () => {
  const [selectedMission, setSelectedMission] = useState(null);

  const handleMissionClick = (mission) => {
    setSelectedMission(mission === selectedMission ? null : mission);
  };

  const getButtonStyles = (mission) => {
    const isSelected = mission === selectedMission;
    return {
      backgroundColor: isSelected ? 'bg-green-400' : 'bg-zinc-800',
      textColor: isSelected ? 'text-black' : 'text-white',
      iconColor: isSelected ? 'text-black' : 'text-green-400'
    };
  };

  return (
    <Card className="mt-8 bg-zinc-900 border-0 rounded-xl shadow-lg">
      <CardHeader className="px-6 py-4">
        <CardTitle className="flex items-center gap-4 text-purple-400">
          <Settings className="w-6 h-6" />
          <h2 className="text-2xl font-semibold">Mission Control</h2>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            className={`rounded-xl p-6 text-center transition-transform hover:scale-[1.02] cursor-pointer ${getButtonStyles('science').backgroundColor}`}
            onClick={() => handleMissionClick('science')}
          >
            <div className="flex items-center justify-center gap-2">
              <FlaskConical className={`w-6 h-6 ${getButtonStyles('science').iconColor}`} />
              <div className={`font-bold text-xl ${getButtonStyles('science').textColor}`}>Science Mission</div>
            </div>
          </div>

          <div
            className={`rounded-xl p-6 text-center transition-transform hover:scale-[1.02] cursor-pointer ${getButtonStyles('delivery').backgroundColor}`}
            onClick={() => handleMissionClick('delivery')}
          >
            <div className="flex items-center justify-center gap-2">
              <Package className={`w-6 h-6 ${getButtonStyles('delivery').iconColor}`} />
              <div className={`font-bold text-xl ${getButtonStyles('delivery').textColor}`}>Delivery Mission</div>
            </div>
          </div>

          <div
            className={`rounded-xl p-6 text-center transition-transform hover:scale-[1.02] cursor-pointer ${getButtonStyles('equipment').backgroundColor}`}
            onClick={() => handleMissionClick('equipment')}
          >
            <div className="flex items-center justify-center gap-2">
              <Settings className={`w-6 h-6 ${getButtonStyles('equipment').iconColor}`} />
              <div className={`font-bold text-xl ${getButtonStyles('equipment').textColor}`}>Equipment Servicing</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MissionControl;
