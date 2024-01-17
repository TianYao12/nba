import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
 .use(initReactI18next)
 .init({
    debug:true,
   resources: {
     en: {
       translation: require('../public/locales/en/translation.json'),
     },
     zh: {
       translation: require('../public/locales/zh/translation.json'),
     },
   },
   lng: 'en',
   fallbackLng: 'en',
   interpolation: {
     escapeValue: false,
   },
 });

export default i18n;
