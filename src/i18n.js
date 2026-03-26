import { locales } from './locales/en.js';

export function setLocale(locale) {
  if (locales[locale]) {
    currentLocale = locale;
  }
}

export function getLocale() {
  return currentLocale;
}

export function i18n(locale, key) {
  const keys = key.split('.');
  let value = locales[locale] || locales['en'];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
}

let currentLocale = 'en';
