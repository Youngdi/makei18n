const Json2csvParser = require('json2csv').Parser;
const R = require('ramda');
const fs = require('fs');
const exec = require('child_process').exec;
const rimraf = require('rimraf');
const csv = require('csvtojson');

const printKeyConcatValue = (langPrefix) => R.useWith(R.merge, [R.pipe(checkChromeExtension, R.objOf(langPrefix)), R.objOf('key')]);
const getI18nLangString = R.curryN(2, R.pipe(
  R.useWith(R.mapObjIndexed, [printKeyConcatValue, R.identity]),
  R.values,
));
const getRawLangString = (inputDir, inputFileName, lang) => fs.existsSync(`${inputDir}/${lang}/${inputFileName}`) ? JSON.parse(fs.readFileSync(`${inputDir}/${lang}/${inputFileName}`, 'utf8')) : {};
const checkChromeExtension = R.cond([
  [R.prop('message'), R.prop('message')],
  [R.T, R.identity],
]);

exports.defaultFields = [
'key', 'EN', 'CHT', 'CHS', 'Czech', 'German', 'French', 'Spanish (Spain)', 'Italian',
'Japanese', 'Korean', 'Polish', 'Russian', 'Turkish', 'Thai', 'Portuguese',
'Hungarian', 'Romanian', 'Danish', 'Dutch', 'Finnish', 'Greek', 'Norwegian', 'Swedish'
];
exports.normalizationLang = R.curryN(4, (inputDir, inputFileName, convertLangPrefix, dirList) => dirList.reduce((acc, val, i) => {
  const langPrefix = convertLangPrefix(val);
  const langString = getI18nLangString(langPrefix, getRawLangString(inputDir, inputFileName, val));
  return i == 0 ? langString: R.zipWith(R.merge, langString, acc);
}, []));
exports.json2csvConverter = R.curryN(2, (fields, data) => new Json2csvParser({ fields }).parse(data));
exports.getDirList = (inputDir) => fs.readdirSync(inputDir);
exports.makeCSVFile = R.curryN(2 , (outputFile, data) => fs.writeFileSync(`./${outputFile}`, data, {encoding: 'utf8'}));
exports.generateDir = (langList, getLangPrefix, inputCSV) => new Promise((resolve, reject) => {
  const exists = fs.existsSync('./_locales');
  if(exists) {
    langList.map( (item, i) => {
      const i18nExists = fs.existsSync(`./_locales/${getLangPrefix(item)}`);
      !i18nExists && fs.mkdirSync(`./_locales/${getLangPrefix(item)}`);
    });
  } else {
    rimraf.sync('./_locales');
    fs.mkdirSync('_locales');
    langList.map( (item, i) => {
      fs.mkdirSync(`./_locales/${getLangPrefix(item)}`);
    });
  }
  resolve(inputCSV);
});
exports.getLangString = (path) => new Promise((resolve, reject) => {
  csv().fromFile(path).on('end_parsed', (jsonObj) => resolve(jsonObj));
});
exports.defaultGetLangPrefix = R.cond([
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
exports.defaultConvertLangPrefix = R.cond([
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
exports.makeJSONfile = R.curryN(5, (langList, getLangPrefix, env, outputFileName, mappingLangList) => new Promise((resolve, reject) => {
  mappingLangList.map((item, i) => {
    const outFilePath = (env == 'ChromeExtension') ? `./_locales/${getLangPrefix(langList[i])}/messages.json` : `./_locales/${getLangPrefix(langList[i])}/${outputFileName}`
    fs.writeFileSync(outFilePath, JSON.stringify(mappingLangList[i]), {encoding: 'utf8'})
  });
  resolve();
}));
exports.generateLangList = R.curryN(6, (langList, env, inputFileName, inputDir, getLangPrefix, langString) => new Promise((resolve, reject) => resolve(langList.reduce((acc, val) => {
  const makeLangJSON = R.pipe(
    R.converge(R.zipObj, 
      [
        R.pluck('key'),
        R.pipe(
          R.pluck(val),
          R.map(env == 'ChromeExtension' ? R.objOf('message') : R.identity)
        )
      ]
    ),
  );
  const newLangJSON = makeLangJSON(langString);
  const previousJSON = getRawLangString(inputDir, inputFileName, getLangPrefix(val));
  const migrationJSON = R.merge(previousJSON, newLangJSON);
  return [...acc, migrationJSON];
}, []))));
exports.defaultLangList = [
  'EN', 'CHT', 'CHS', 'Czech', 'German', 'French', 'Spanish (Spain)', 'Italian',
  'Japanese', 'Korean', 'Polish', 'Russian', 'Turkish', 'Thai', 'Portuguese',
  'Hungarian', 'Romanian', 'Danish', 'Dutch', 'Finnish', 'Greek', 'Norwegian', 'Swedish'
]; //23 countries
