
const { makei18n, makei18nCSV } = require('makei18n');
const defaultI18nLanguageTransfer = () => {}; // your own logic transfer function

makei18n({
  inputCSV:`${__dirname}/example.csv`,
  // inputDir: './_locales',
  // inputFileName: 'messages.json', // messages.json
  // outputFileName: 'messages.json', // messages.json
  // env: 'ChromeExtension',
  // i18nLanguageTransfer = (defaultI18nLanguageTransfer),
});

