const R = require('ramda');
const { normalizationLang, defaultConvertLangPrefix, makeCSVFile, getDirList, json2csvConverter, defaultFields} = require('./lib/utility');

exports.makei18nCSV = ({
  inputDir,
  inputFileName,
  outputFile,
  convertLangPrefix = defaultConvertLangPrefix,
  fields = defaultFields,
}) =>
R.pipe(
  getDirList,
  normalizationLang(inputDir, inputFileName, convertLangPrefix),
  json2csvConverter(fields),
  makeCSVFile(outputFile)
)(inputDir);
