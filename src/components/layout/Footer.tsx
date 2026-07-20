import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="h-12 border-t border-slate-200 dark:border-slate-800/80 px-6 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xs">
      <div>
        © {new Date().getFullYear()} Enterprise SaaS Inc. All rights reserved.
      </div>
      <div className="flex items-center gap-4 text-[11px]">
        <a href="#privacy" className="hover:underline">Privacy Policy</a>
        <a href="#terms" className="hover:underline">Terms of Service</a>
        <span className="font-mono text-indigo-500 font-semibold">v1.0.0</span>
      </div>
    </footer>
  );
};
