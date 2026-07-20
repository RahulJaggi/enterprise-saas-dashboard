import React, { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { UploadCloud, File, X } from 'lucide-react';
import { FormLabel } from './FormLabel';
import { FormError } from './FormError';

interface FormFileUploadProps {
  name: string;
  label?: string;
  helperText?: string;
  required?: boolean;
  accept?: string;
}

export const FormFileUpload: React.FC<FormFileUploadProps> = ({
  name,
  label,
  helperText = 'Drag & drop files or browse from device (max 10MB)',
  required,
  accept,
}) => {
  const { control } = useFormContext();
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange }, fieldState }) => (
        <div className="w-full">
          {label && <FormLabel required={required}>{label}</FormLabel>}
          <div className="relative border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-2xl p-6 text-center hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors bg-white dark:bg-slate-900 cursor-pointer">
            <input
              type="file"
              accept={accept}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setFileName(file.name);
                  onChange(file);
                }
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            {fileName ? (
              <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200">
                <File className="w-5 h-5 text-indigo-500" />
                <span>{fileName}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFileName(null);
                    onChange(null);
                  }}
                  className="p-1 rounded-md text-slate-400 hover:text-red-500 z-20"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1.5">
                <UploadCloud className="w-8 h-8 text-indigo-500" />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Click to upload or drag & drop
                </span>
                <span className="text-[11px] text-slate-400">{helperText}</span>
              </div>
            )}
          </div>
          {fieldState.error && <FormError message={fieldState.error.message} />}
        </div>
      )}
    />
  );
};
