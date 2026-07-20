import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Select } from '../ui/Select';
import { FormLabel } from './FormLabel';
import { FormHelperText } from './FormHelperText';
import { FormError } from './FormError';

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label?: string;
  options: { label: string; value: string }[];
  helperText?: string;
  required?: boolean;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  name,
  label,
  options,
  helperText,
  required,
  className,
  ...props
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="w-full">
          {label && <FormLabel htmlFor={name} required={required}>{label}</FormLabel>}
          <Select
            id={name}
            options={options}
            {...field}
            {...props}
            error={fieldState.error?.message}
            className={className}
          />
          {helperText && !fieldState.error && <FormHelperText>{helperText}</FormHelperText>}
          {fieldState.error && <FormError message={fieldState.error.message} />}
        </div>
      )}
    />
  );
};
