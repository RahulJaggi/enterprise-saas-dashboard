import { useState } from 'react';
import { Table } from '@tanstack/react-table';
import { SearchInput } from '../ui/SearchInput';
import { Button } from '../ui/Button';
import { Columns, X } from 'lucide-react';

interface TableToolbarProps<TData> {
  table: Table<TData>;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  placeholder?: string;
}

export function TableToolbar<TData>({
  table,
  globalFilter,
  setGlobalFilter,
  placeholder = 'Filter records...',
}: TableToolbarProps<TData>) {
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);
  const isFiltered = globalFilter.length > 0 || table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-b border-slate-200 dark:border-slate-800/80">
      <div className="flex items-center gap-2 w-full sm:w-80">
        <SearchInput
          placeholder={placeholder}
          value={globalFilter ?? ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
          onClear={() => setGlobalFilter('')}
        />
        {isFiltered && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setGlobalFilter('');
              table.resetColumnFilters();
            }}
            className="text-xs"
          >
            Reset <X className="w-3.5 h-3.5 ml-1" />
          </Button>
        )}
      </div>

      <div className="relative flex items-center gap-2 self-end sm:self-auto">
        <Button
          variant="outline"
          size="sm"
          leftIcon={<Columns className="w-4 h-4" />}
          onClick={() => setShowColumnDropdown(!showColumnDropdown)}
        >
          Columns
        </Button>

        {showColumnDropdown && (
          <div className="absolute right-0 top-11 z-30 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl p-2 space-y-1">
            <p className="text-[10px] uppercase font-bold text-slate-400 px-2 py-1">Toggle Columns</p>
            <div className="max-h-48 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <label
                      key={column.id}
                      className="flex items-center gap-2 px-2 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 rounded cursor-pointer capitalize"
                    >
                      <input
                        type="checkbox"
                        checked={column.getIsVisible()}
                        onChange={(e) => column.toggleVisibility(e.target.checked)}
                        className="rounded border-slate-300 dark:border-slate-700 text-indigo-600"
                      />
                      <span>{column.id}</span>
                    </label>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
