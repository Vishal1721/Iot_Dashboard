import React from "react";

export const Button = ({ children, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${className}`}
    >
      {children}
    </button>
  );
};
