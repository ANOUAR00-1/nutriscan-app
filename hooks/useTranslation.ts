import { useUser } from '@/contexts/UserContext';
import { translations, Language } from '@/constants/translations';

export function useTranslation() {
  const { settings } = useUser();
  const lang = (settings.language || 'en') as Language;
  
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[lang];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };
  
  const isRTL = lang === 'ar';
  
  return { t, lang, isRTL };
}
