import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Textarea } from '../ui/Textarea';
import { FormLabel } from './FormLabel';
import { FormHelperText } from './FormHelperText';
import { FormError } from './FormError';

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  helperText?: string;
  required?: boolean;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  name,
  label,
  helperText,
  required,
  className,
  rows = 3,
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
          <Textarea
            id={name}
            rows={rows}
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
