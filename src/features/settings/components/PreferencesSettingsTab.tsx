import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { Form } from '../../../components/forms/Form';
import { FormSelect } from '../../../components/forms/FormSelect';
import { FormSubmitButton } from '../../../components/forms/FormSubmitButton';
import { DATE_FORMATS, CURRENCIES, PAGE_SIZES } from '../constants/settings.constants';
import { PreferenceSettings } from '../types/settings.types';
import { toast } from '../../../components/ui/Toast';
import { Sliders } from 'lucide-react';

interface PreferencesSettingsTabProps {
  initialValues?: PreferenceSettings;
  onSave: (data: Partial<PreferenceSettings>) => Promise<void>;
}

export const PreferencesSettingsTab: React.FC<PreferencesSettingsTabProps> = ({
  initialValues,
  onSave,
}) => {
  const form = useForm<PreferenceSettings>({
    defaultValues: initialValues || {
      defaultDashboard: 'Executive Overview',
      tablePageSize: 10,
      dateFormat: 'YYYY-MM-DD',
      currency: 'USD ($)',
    },
  });

  const handleSubmit = async (data: PreferenceSettings) => {
    try {
      await onSave({ preferences: data } as any);
      toast.success('System preferences saved successfully');
    } catch {
      toast.error('Failed to save preferences');
    }
  };

  return (
    <Card glass>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-indigo-500" /> Default System Preferences
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form form={form} onSubmit={handleSubmit} className="space-y-4 max-w-lg">
          <FormSelect
            name="defaultDashboard"
            label="Default View Landing Page"
            options={[
              { label: 'Executive Overview', value: 'Executive Overview' },
              { label: 'Revenue Analytics', value: 'Revenue Analytics' },
              { label: 'User Directory', value: 'User Directory' },
            ]}
          />

          <FormSelect
            name="tablePageSize"
            label="Default Table Rows Per Page"
            options={PAGE_SIZES.map((size) => ({ label: `${size} Rows`, value: String(size) }))}
          />

          <FormSelect
            name="dateFormat"
            label="Global Date Formatting"
            options={DATE_FORMATS.map((fmt) => ({ label: fmt, value: fmt }))}
          />

          <FormSelect
            name="currency"
            label="Primary Display Currency"
            options={CURRENCIES.map((c) => ({ label: c, value: c }))}
          />

          <div className="pt-4 flex justify-end">
            <FormSubmitButton>Save Preferences</FormSubmitButton>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
};
