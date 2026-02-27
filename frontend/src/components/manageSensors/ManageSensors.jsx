import React from 'react';

const ManageSensors = ({ projectId }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Manage Sensors</h2>
      <p className="text-gray-600">Sensor management interface for project: {projectId}</p>
      {/* Add sensor management functionality here */}
    </div>
  );
};

export default ManageSensors;
