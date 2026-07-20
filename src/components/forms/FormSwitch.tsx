import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Switch } from '../ui/Switch';
import { FormError } from './FormError';

interface FormSwitchProps {
  name: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export const FormSwitch: React.FC<FormSwitchProps> = ({
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
          <Switch
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
