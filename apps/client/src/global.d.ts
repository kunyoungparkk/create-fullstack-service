import type { Locale } from '@/i18n/config';
import type { Messages } from '@/locales';

declare module 'next-intl' {
  interface AppConfig {
    Messages: Messages;
    Locale: Locale;
  }
}
