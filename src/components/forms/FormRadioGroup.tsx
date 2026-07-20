import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Radio } from '../ui/Radio';
import { FormLabel } from './FormLabel';
import { FormError } from './FormError';

export interface RadioOption {
  label: string;
  value: string;
  description?: string;
}

interface FormRadioGroupProps {
  name: string;
  label?: string;
  options: RadioOption[];
  required?: boolean;
}

export const FormRadioGroup: React.FC<FormRadioGroupProps> = ({
  name,
  label,
  options,
  required,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="space-y-2">
          {label && <FormLabel required={required}>{label}</FormLabel>}
          <div className="space-y-2">
            {options.map((opt) => (
              <Radio
                key={opt.value}
                id={`${name}-${opt.value}`}
                name={name}
                value={opt.value}
                checked={field.value === opt.value}
                onChange={() => field.onChange(opt.value)}
                label={opt.label}
                description={opt.description}
              />
            ))}
          </div>
          {fieldState.error && <FormError message={fieldState.error.message} />}
        </div>
      )}
    />
  );
};
