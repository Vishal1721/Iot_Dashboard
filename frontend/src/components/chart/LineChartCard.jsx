import React from 'react';

export const LineChartCard = ({ data, sensorName }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">{sensorName}</h3>
      <div className="h-64 flex items-center justify-center">
        {data && data.length > 0 ? (
          <div className="w-full h-full relative">
            <svg className="w-full h-full" viewBox="0 0 400 200">
              <polyline
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
                points={data
                  .slice(-20)
                  .map((item, index) => {
                    const x = (index / Math.max(data.slice(-20).length - 1, 1)) * 400;
                    const y = 200 - (item.value / Math.max(...data.map(d => d.value))) * 200;
                    return `${x},${y}`;
                  })
                  .join(' ')}
              />
            </svg>
          </div>
        ) : (
          <p className="text-gray-400">No data available</p>
        )}
      </div>
    </div>
  );
};
