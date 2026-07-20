import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { Form } from '../../../components/forms/Form';
import { FormInput } from '../../../components/forms/FormInput';
import { FormSelect } from '../../../components/forms/FormSelect';
import { FormSubmitButton } from '../../../components/forms/FormSubmitButton';
import { Avatar } from '../../../components/ui/Avatar';
import { Button } from '../../../components/ui/Button';
import { TIMEZONES, LANGUAGES } from '../constants/settings.constants';
import { ProfileSettings } from '../types/settings.types';
import { toast } from '../../../components/ui/Toast';
import { Upload } from 'lucide-react';

interface ProfileSettingsTabProps {
  initialValues?: ProfileSettings;
  onSave: (data: Partial<ProfileSettings>) => Promise<void>;
}

export const ProfileSettingsTab: React.FC<ProfileSettingsTabProps> = ({
  initialValues,
  onSave,
}) => {
  const form = useForm<ProfileSettings>({
    defaultValues: initialValues || {
      fullName: 'Rahul Jaggi',
      email: 'rahul.jaggi@enterprise.io',
      phone: '+1 (555) 019-2834',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      timezone: '(UTC+05:30) India Standard Time (IST)',
      language: 'English (US)',
    },
  });

  const handleSubmit = async (data: ProfileSettings) => {
    try {
      await onSave({ profile: data } as any);
      toast.success('Profile settings updated successfully');
    } catch {
      toast.error('Failed to update profile settings');
    }
  };

  return (
    <Card glass>
      <CardHeader>
        <CardTitle>User Profile & Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Avatar Section */}
        <div className="flex items-center gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <Avatar
            src={form.watch('avatar')}
            name={form.watch('fullName')}
            size="xl"
          />
          <div className="space-y-2">
            <h5 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Profile Picture</h5>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                leftIcon={<Upload className="w-3.5 h-3.5" />}
                onClick={() => toast.info('Avatar upload UI simulated')}
              >
                Change Avatar
              </Button>
            </div>
          </div>
        </div>

        <Form form={form} onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput name="fullName" label="Full Name" required />
            <FormInput name="email" label="Email Address" type="email" required />
          </div>

          <FormInput name="phone" label="Phone Number" required />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormSelect
              name="timezone"
              label="Timezone"
              options={TIMEZONES.map((t) => ({ label: t, value: t }))}
              required
            />
            <FormSelect
              name="language"
              label="Preferred Language"
              options={LANGUAGES.map((l) => ({ label: l, value: l }))}
              required
            />
          </div>

          <div className="pt-4 flex justify-end">
            <FormSubmitButton>Save Profile Changes</FormSubmitButton>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
};
