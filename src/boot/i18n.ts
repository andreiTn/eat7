import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';

import messages from 'src/i18n';

export default boot(({ app }) => {
  let locale = '';
  if (navigator.language === 'en-GB' || navigator.language === 'ro') {
    locale = navigator.language;
  } else {
    locale = 'en-GB';
  }

  const i18n = createI18n({
    locale,
    messages,
  });

  // Set i18n instance on app
  app.use(i18n);
});
