import { getTranslations } from 'next-intl/server';

export default async function Home() {
  const t = await getTranslations();

  return (
    <div className="p-2">
      <h3>{t('welcome')}</h3>
    </div>
  );
}
