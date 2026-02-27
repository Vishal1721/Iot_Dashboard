import React from 'react';
import { ScaleLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div className="h-full flex justify-center items-center">
      <div className="flex flex-col items-center space-y-2">
        <ScaleLoader className='block' height={80} width={10} radius={20} />
        <p className='pl-3 text-2xl font-medium'>Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
