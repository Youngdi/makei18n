/** @module makei18nCSV */

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
/**
 * @description 
 *  <p>makei18nCSV helps your to make a standard format of your i18n csv file</p>
 *  <p><b style="color:red">Note: </b><b>_locales folder structure must follows the pattern</b></p>
 * ```sh
_locales
  cs -> messages.json 
  de -> messages.json
  en -> messages.json
  fr -> messages.json
  ja -> messages.json
  zh_TW -> messages.json
  zh_CN -> messages.json
  ...others i18n -> messages.json
```
 *  <b><a href="https://github.com/Youngdi/makei18n/tree/master/_locales">Check _locales structure here</a></b>
* ## Default params
```
const defaultI18nKeyToCSV = R.cond([
  [R.equals('zh_CN'), R.always('CHS')],
  [R.equals('zh_TW'), R.always('CHT')],
  [R.equals('en'), R.always('EN')],
  [R.equals('ko'), R.always('Korean')],
  [R.equals('ja'), R.always('Japanese')],
  [R.equals('it'), R.always('Italian')],
  [R.equals('da'), R.always('Danish')],
  [R.equals('hu'), R.always('Hungarian')],
  [R.equals('sv'), R.always('Swedish')],
  [R.equals('ru'), R.always('Russian')],
  [R.equals('cs'), R.always('Czech')],
  [R.equals('nl'), R.always('Dutch')],
  [R.equals('fi'), R.always('Finnish')],
  [R.equals('fr'), R.always('French')],
  [R.equals('de'), R.always('German')],
  [R.equals('el'), R.always('Greek')],
  [R.equals('no'), R.always('Norwegian')],
  [R.equals('pl'), R.always('Polish')],
  [R.equals('es'), R.always('Spanish (Spain)')],
  [R.equals('tr'), R.always('Turkish')],
  [R.equals('th'), R.always('Thai')],
  [R.equals('ro'), R.always('Romanian')],
  [R.equals('pt'), R.always('Portuguese')],
  [R.T, R.identity]
]);
```
```
const defaultI18nLanguageTransfer = R.cond([
  [R.equals('CHS'), R.always('zh_CN')],
  [R.equals('CHT'), R.always('zh_TW')],
  [R.equals('EN'), R.always('en')],
  [R.equals('Korean'), R.always('ko')],
  [R.equals('Japanese'), R.always('ja')],
  [R.equals('Italian'), R.always('it')],
  [R.equals('Danish'), R.always('da')],
  [R.equals('Hungarian'), R.always('hu')],
  [R.equals('Swedish'), R.always('sv')],
  [R.equals('Russian'), R.always('ru')],
  [R.equals('Czech'), R.always('cs')],
  [R.equals('Dutch'), R.always('nl')],
  [R.equals('Finnish'), R.always('fi')],
  [R.equals('French'), R.always('fr')],
  [R.equals('German'), R.always('de')],
  [R.equals('Greek'), R.always('el')],
  [R.equals('Norwegian'), R.always('no')],
  [R.equals('Polish'), R.always('pl')],
  [R.equals('Spanish (Spain)'), R.always('es')],
  [R.equals('Turkish'), R.always('tr')],
  [R.equals('Thai'), R.always('th')],
  [R.equals('Romanian'), R.always('ro')],
  [R.equals('Portuguese'), R.always('pt')],
  [R.T, R.identity]
]);
```
* @example <caption>Example usage: </caption>
const { makei18nCSV } = require('makei18n');
makei18nCSV({
  inputDir: './_locales',
  // inputFileName: 'messages.json',
  // outputFileName: 'translation.csv',
  // i18nKeyToCSV = defaultI18nKeyToCSV, // optional 
  // i18nLanguageTransfer = defaultI18nLanguageTransfer, // optional 
});
 * @param {string} inputDir - the path of your i18n folder
 * @param {string} [inputFileName = 'messages.json'] - the name of your i18n json file
 * @param {string} [outputFileName = 'translation.csv'] - the name of your output csv file
 * @param {function} [i18nKeyToCSV = String -> String] - you can customize your own logic function to transfer your i18n key. Note: it must be a symmetry with i18nLanguageTransfer
 * @param {function} [i18nLanguageTransfer = String -> String] - you can customize your own logic function to transfer your language list.  Note: it must be a symmetry with i18nKeyToCSV
 */
exports.makei18nCSV = async ({
  inputDir,
  inputFileName = 'messages.json',
  outputFileName = 'translation.csv',
  i18nKeyToCSV = defaultI18nKeyToCSV,
  i18nLanguageTransfer = defaultI18nLanguageTransfer,
}) =>
  R.pipe(
    getDirList,
    i18nKeyToCSVwithPreload(i18nKeyToCSV),
    R.chain(json2csvConverter, normalizationLang(inputDir, inputFileName, i18nLanguageTransfer)),
    makeCSVFile(outputFileName)
  )(inputDir)
