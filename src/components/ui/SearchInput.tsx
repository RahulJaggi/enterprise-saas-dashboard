import React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from './Input';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onClear,
  placeholder = 'Search...',
  ...props
}) => {
  return (
    <Input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      leftIcon={<Search className="w-4 h-4 text-slate-400" />}
      rightIcon={
        value ? (
          <button
            type="button"
            onClick={onClear}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        ) : undefined
      }
      {...props}
    />
  );
};
