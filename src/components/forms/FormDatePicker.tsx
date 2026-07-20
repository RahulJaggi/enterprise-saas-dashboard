import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Calendar } from 'lucide-react';
import { Input } from '../ui/Input';
import { FormLabel } from './FormLabel';
import { FormHelperText } from './FormHelperText';
import { FormError } from './FormError';

interface FormDatePickerProps {
  name: string;
  label?: string;
  helperText?: string;
  required?: boolean;
}

export const FormDatePicker: React.FC<FormDatePickerProps> = ({
  name,
  label,
  helperText,
  required,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="w-full">
          {label && <FormLabel htmlFor={name} required={required}>{label}</FormLabel>}
          <Input
            id={name}
            type="date"
            {...field}
            leftIcon={<Calendar className="w-4 h-4 text-slate-400" />}
            error={fieldState.error?.message}
          />
          {helperText && !fieldState.error && <FormHelperText>{helperText}</FormHelperText>}
          {fieldState.error && <FormError message={fieldState.error.message} />}
        </div>
      )}
    />
  );
};
