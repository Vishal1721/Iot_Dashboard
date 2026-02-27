import React from 'react';

export const Dialog = ({ children, open, onOpenChange, ...props }) => (
  <div {...props}>
    {children}
  </div>
);

export const DialogTrigger = React.forwardRef(({ children, ...props }, ref) => (
  <button ref={ref} {...props}>
    {children}
  </button>
));
DialogTrigger.displayName = 'DialogTrigger';

export const DialogContent = React.forwardRef(({ children, className, ...props }, ref) => (
  <div
    ref={ref}
    className={`fixed inset-0 z-50 bg-black/50 flex items-center justify-center ${className || ''}`}
    {...props}
  >
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
      {children}
    </div>
  </div>
));
DialogContent.displayName = 'DialogContent';

export const DialogHeader = ({ className, ...props }) => (
  <div className={`mb-4 ${className || ''}`} {...props} />
);

export const DialogTitle = ({ className, ...props }) => (
  <h2 className={`text-lg font-semibold ${className || ''}`} {...props} />
);

export const DialogDescription = ({ className, ...props }) => (
  <p className={`text-sm text-gray-500 ${className || ''}`} {...props} />
);

export const DialogFooter = ({ className, ...props }) => (
  <div className={`mt-6 flex justify-end gap-2 ${className || ''}`} {...props} />
);

export const DialogClose = React.forwardRef(({ children, ...props }, ref) => (
  <button ref={ref} {...props}>
    {children}
  </button>
));
DialogClose.displayName = 'DialogClose';
