const R = require('ramda');
const { 
  normalizationLang,
  i18nKeyToCSVwithPreload,
  defaultI18nKeyToCSV,
  defaultI18nLanguageTransfer,
  makeCSVFile,
  getDirList,
  json2csvConverter
} = require('./lib/utility');

exports.makei18nCSV = ({
  inputDir,
  inputFileName,
  outputFile,
  i18nKeyToCSV = defaultI18nKeyToCSV,
  i18nLanguageTransfer = defaultI18nLanguageTransfer,
}) =>
  R.pipe(
    getDirList,
    i18nKeyToCSVwithPreload(i18nKeyToCSV),
    R.chain(json2csvConverter, normalizationLang(inputDir, inputFileName, i18nLanguageTransfer)),
    makeCSVFile(outputFile)
  )(inputDir)
