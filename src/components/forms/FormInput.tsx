import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Input } from '../ui/Input';
import { FormLabel } from './FormLabel';
import { FormHelperText } from './FormHelperText';
import { FormError } from './FormError';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  helperText?: string;
  required?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  helperText,
  required,
  leftIcon,
  rightIcon,
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
          <Input
            id={name}
            {...field}
            {...props}
            leftIcon={leftIcon}
            rightIcon={rightIcon}
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
