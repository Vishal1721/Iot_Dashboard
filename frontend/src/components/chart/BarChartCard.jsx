import React from 'react';

export const BarChartCard = ({ data, sensorName }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">{sensorName}</h3>
      <div className="h-64 flex items-end justify-around gap-2">
        {data && data.length > 0 ? (
          data.slice(-10).map((item, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div
                className="w-full bg-blue-500 rounded-t"
                style={{
                  height: `${(item.value / Math.max(...data.map(d => d.value))) * 100}%`,
                  minHeight: '4px'
                }}
              />
              <span className="text-xs mt-2 text-gray-600">{item.value}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No data available</p>
        )}
      </div>
    </div>
  );
};
