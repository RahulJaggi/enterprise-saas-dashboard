import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '../ui/Button';

interface FormSubmitButtonProps extends React.ComponentProps<typeof Button> {}

export const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({
  children = 'Submit',
  isLoading,
  disabled,
  ...props
}) => {
  const { formState } = useFormContext();
  const submitting = isLoading !== undefined ? isLoading : formState.isSubmitting;

  return (
    <Button
      type="submit"
      isLoading={submitting}
      disabled={disabled || submitting}
      {...props}
    >
      {children}
    </Button>
  );
};
