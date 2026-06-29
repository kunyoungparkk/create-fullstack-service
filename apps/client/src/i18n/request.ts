import { cookies, headers } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';

import { en, ko } from '@/locales';

import { defaultLocale, type Locale, localeCookieName, locales } from './config';

const messages = { en, ko } satisfies Record<Locale, typeof en>;

async function resolveLocale(): Promise<Locale> {
  const cookieLocale = (await cookies()).get(localeCookieName)?.value;

  if (cookieLocale && locales.includes(cookieLocale as Locale)) {
    return cookieLocale as Locale;
  }

  const acceptLanguage = (await headers()).get('accept-language') ?? '';

  if (acceptLanguage.toLowerCase().includes('ko')) {
    return 'ko';
  }

  return defaultLocale;
}

export default getRequestConfig(async () => {
  const locale = await resolveLocale();

  return { locale, messages: messages[locale] };
});
