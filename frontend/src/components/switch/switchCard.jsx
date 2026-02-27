import React, { useState } from 'react';

const SwitchCard = ({ data, sensorName, onToggle }) => {
  const [isOn, setIsOn] = useState(data?.value || false);

  const handleToggle = () => {
    const newValue = !isOn;
    setIsOn(newValue);
    if (onToggle) {
      onToggle(newValue);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">{sensorName}</h3>
      <div className="flex items-center justify-center">
        <button
          onClick={handleToggle}
          className={`relative inline-flex h-12 w-24 items-center rounded-full transition-colors ${
            isOn ? 'bg-blue-600' : 'bg-gray-300'
          }`}
        >
          <span
            className={`inline-block h-10 w-10 transform rounded-full bg-white transition-transform ${
              isOn ? 'translate-x-12' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
      <p className="text-center text-gray-500 mt-2">
        {isOn ? 'ON' : 'OFF'}
      </p>
    </div>
  );
};

export default SwitchCard;
