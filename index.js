const { makei18n } = require('./convertCSVtoJSON');
const { makei18nCSV } = require('./convertJSONtoCSV');
makei18n({
  inputCSV:`${__dirname}/example.csv`,
  outputFileName: 'messages.json',
  // env: 'RN',
});
// makei18nCSV({
//   inputDir: './test',
//   inputFileName: 'cht.json',
//   outputFile: 'test.csv',
// });