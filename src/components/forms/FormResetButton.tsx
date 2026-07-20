import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '../ui/Button';

interface FormResetButtonProps extends React.ComponentProps<typeof Button> {}

export const FormResetButton: React.FC<FormResetButtonProps> = ({
  children = 'Reset',
  onClick,
  ...props
}) => {
  const { reset } = useFormContext();

  return (
    <Button
      type="button"
      variant="outline"
      onClick={(e) => {
        reset();
        if (onClick) onClick(e);
      }}
      {...props}
    >
      {children}
    </Button>
  );
};
