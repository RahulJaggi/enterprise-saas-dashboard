import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { Sun, Moon, Laptop, Check } from 'lucide-react';
import { useTheme } from 'next-themes';
import { toast } from '../../../components/ui/Toast';

export const AppearanceSettingsTab: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const themes = [
    {
      id: 'light',
      label: 'Light Mode',
      description: 'Clean bright light interface',
      icon: Sun,
    },
    {
      id: 'dark',
      label: 'Dark Mode',
      description: 'Futuristic glassmorphism dark interface',
      icon: Moon,
    },
    {
      id: 'system',
      label: 'System Default',
      description: 'Automatically match OS appearance preference',
      icon: Laptop,
    },
  ];

  return (
    <Card glass>
      <CardHeader>
        <CardTitle>Interface Theme & Visual Appearance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {themes.map((t) => {
            const Icon = t.icon;
            const isSelected = theme === t.id;
            return (
              <div
                key={t.id}
                onClick={() => {
                  setTheme(t.id);
                  toast.success(`Theme switched to ${t.label}`);
                }}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-400'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-800 text-indigo-500 shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  {isSelected && (
                    <span className="p-1 rounded-full bg-indigo-600 text-white">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
                <div>
                  <h5 className="font-bold text-slate-800 dark:text-slate-200 text-sm">{t.label}</h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
