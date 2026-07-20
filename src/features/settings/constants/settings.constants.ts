export const TIMEZONES = [
  '(UTC-08:00) Pacific Time (US & Canada)',
  '(UTC-05:00) Eastern Time (US & Canada)',
  '(UTC+00:00) UTC / London',
  '(UTC+01:00) Central European Time (Paris, Berlin)',
  '(UTC+05:30) India Standard Time (IST)',
  '(UTC+08:00) Singapore / Hong Kong',
] as const;

export const LANGUAGES = [
  'English (US)',
  'English (UK)',
  'Spanish (Español)',
  'German (Deutsch)',
  'French (Français)',
  'Japanese (日本語)',
] as const;

export const DATE_FORMATS = [
  'YYYY-MM-DD',
  'MM/DD/YYYY',
  'DD/MM/YYYY',
  'MMM DD, YYYY',
] as const;

export const CURRENCIES = ['USD ($)', 'EUR (€)', 'GBP (£)', 'INR (₹)', 'CAD ($)'] as const;

export const PAGE_SIZES = [5, 10, 20, 50] as const;
