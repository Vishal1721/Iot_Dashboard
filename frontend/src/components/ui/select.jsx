import React from 'react';

export const Select = ({ children, ...props }) => (
  <div {...props} className={`relative ${props.className || ''}`}>
    {children}
  </div>
);

export const SelectTrigger = React.forwardRef(({ children, className, ...props }, ref) => (
  <button
    ref={ref}
    className={`w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500 ${className || ''}`}
    {...props}
  >
    {children}
  </button>
));
SelectTrigger.displayName = 'SelectTrigger';

export const SelectValue = ({ placeholder, ...props }) => (
  <span {...props}>{placeholder}</span>
);

export const SelectContent = ({ children, className, ...props }) => (
  <div
    className={`absolute z-50 bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto ${className || ''}`}
    {...props}
  >
    {children}
  </div>
);

export const SelectGroup = ({ children, ...props }) => (
  <div {...props}>{children}</div>
);

export const SelectLabel = ({ className, ...props }) => (
  <div className={`px-2 py-1.5 text-sm font-semibold text-gray-700 ${className || ''}`} {...props} />
);

export const SelectItem = ({ value, children, className, ...props }) => (
  <div
    className={`px-3 py-2 cursor-pointer hover:bg-blue-100 ${className || ''}`}
    {...props}
  >
    {children}
  </div>
);
