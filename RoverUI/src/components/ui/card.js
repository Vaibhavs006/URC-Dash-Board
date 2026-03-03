import React from 'react';

export const Card = ({ className = '', children }) => (
  <div className={`rounded-xl border border-zinc-800 bg-zinc-900 ${className}`}>
    {children}
  </div>
);

export const CardHeader = ({ className = '', children }) => (
  <div className={`border-b border-zinc-800 ${className}`}>
    {children}
  </div>
);

export const CardTitle = ({ className = '', children }) => (
  <div className={`text-white ${className}`}>
    {children}
  </div>
);

export const CardContent = ({ className = '', children }) => (
  <div className={className}>{children}</div>
);
