import Vue from 'vue';
import VueI18n from 'vue-i18n';
import config from '@/../sunrise.config';

Vue.use(VueI18n);

function findFallbackLocale() {
  return config.locales > 0 ? config.locales[0].code : 'en';
}

function findInitialLocale() {
  const storedLocale = localStorage.getItem('locale');
  return storedLocale || findFallbackLocale();
}

function loadMessages() {
  const locales = require.context('@/lang', true, /[a-z0-9]+\.json$/i);
  const messages = {};
  locales.keys().forEach((key) => {
    const matched = key.match(/([a-z0-9]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key);
    }
  });
  return messages;
}

// Create VueI18n instance with options
export const i18n = new VueI18n({
  locale: findInitialLocale(),
  fallbackLocale: findFallbackLocale(),
  messages: loadMessages(),
});

export function setLanguage(lang) {
  i18n.locale = lang;
  document.documentElement.lang = lang;
  localStorage.setItem('locale', lang);
  return lang;
}
