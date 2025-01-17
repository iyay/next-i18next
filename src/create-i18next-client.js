import isNode from 'detect-node';
import i18next from 'i18next';
import i18nextXHRBackend from 'i18next-xhr-backend';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';

const i18n = i18next.default ? i18next.default : i18next;

export default config => {
  if (!i18n.isInitialized) {
    if (isNode) {
      const i18nextNodeBackend = eval("require('i18next-node-fs-backend')");
      const i18nextMiddleware = eval("require('i18next-express-middleware')");
      i18n.use(i18nextNodeBackend);
      if (config.serverLanguageDetection) {
        const serverDetectors = new i18nextMiddleware.LanguageDetector();
        config.customDetectors.forEach(detector =>
          serverDetectors.addDetector(detector)
        );
        i18n.use(serverDetectors);
      }
    } else {
      i18n.use(i18nextXHRBackend);
      if (config.browserLanguageDetection) {
        const browserDetectors = new I18nextBrowserLanguageDetector();
        config.customDetectors.forEach(detector =>
          browserDetectors.addDetector(detector)
        );
        i18n.use(browserDetectors);
      }
    }

    config.use.forEach(x => i18n.use(x));
    i18n.languages = config.otherLanguages;
    i18n.init(config);
  }
  return i18n;
};
