import React from 'react';
import { Controller, ControllerProps, FieldPath, FieldValues, useFormContext } from 'react-hook-form';

export interface FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<ControllerProps<TFieldValues, TName>, 'render'> {
  children: (props: {
    field: ReturnType<typeof useFormContext>['register'] extends (name: TName) => infer R ? R : any;
    fieldState: ReturnType<typeof useFormContext>['getFieldState'] extends (name: TName) => infer S ? S : any;
  }) => React.ReactElement;
}

export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ name, control, children, ...props }: FormFieldProps<TFieldValues, TName>) {
  const formContext = useFormContext<TFieldValues>();
  const activeControl = control || formContext?.control;

  if (!activeControl) {
    throw new Error('FormField must be used within a <Form> or provided a control prop.');
  }

  return (
    <Controller
      name={name}
      control={activeControl}
      {...props}
      render={({ field, fieldState }) => children({ field: field as any, fieldState: fieldState as any })}
    />
  );
}
