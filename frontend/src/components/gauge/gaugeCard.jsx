import React from 'react';

const GaugeCard = ({ data, sensorName }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">{sensorName}</h3>
      <div className="flex items-center justify-center">
        <div className="text-4xl font-bold text-blue-600">
          {data?.value || '0'}
        </div>
      </div>
      <p className="text-center text-gray-500 mt-2">{data?.unit || ''}</p>
    </div>
  );
};

export default GaugeCard;
