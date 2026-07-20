import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Checkbox } from '../ui/Checkbox';
import { FormError } from './FormError';

interface FormCheckboxProps {
  name: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export const FormCheckbox: React.FC<FormCheckboxProps> = ({
  name,
  label,
  description,
  disabled,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div>
          <Checkbox
            id={name}
            checked={!!field.value}
            onChange={(e) => field.onChange(e.target.checked)}
            label={label}
            description={description}
            disabled={disabled}
          />
          {fieldState.error && <FormError message={fieldState.error.message} />}
        </div>
      )}
    />
  );
};
