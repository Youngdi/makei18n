

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
const getRawLangString = R.curryN(3, (inputDir, inputFileName, lang) => fs.existsSync(`${inputDir}/${lang}/${inputFileName}`) ? JSON.parse(fs.readFileSync(`${inputDir}/${lang}/${inputFileName}`, 'utf8')) : {});
const checkChromeExtension = R.cond([
  [R.pipe(R.prop('message'), R.isEmpty), R.always('')],
  [R.prop('message'), R.prop('message')],
  [R.T, R.identity],
]);

exports.normalizationLang = (inputDir, inputFileName, i18nLanguageTransfer) => (langList) => langList.reduce((acc, lang, i) => {
    const i18nlang = i18nLanguageTransfer(lang);
    const langString = getI18nLangString(lang, getRawLangString(inputDir, inputFileName, i18nlang));
    return (i < 2) ? langString: R.zipWith(R.merge, langString, acc);
}, []);

exports.i18nKeyToCSVwithPreload = (i18nKeyToCSV) => (dirlangList) => R.pipe(R.map(i18nKeyToCSV),R.insert(0, 'key'))(dirlangList),

exports.json2csvConverter = R.curryN(2, (data, fields) => new Json2csvParser({ fields }).parse(data));

exports.getDirList = (inputDir) => fs.readdirSync(inputDir);

exports.makeCSVFile = R.curryN(2 , (outputFileName, data) => fs.writeFileSync(`./${outputFileName}`, data, {encoding: 'utf8'}));

exports.generateDir = async (langList, i18nLanguageTransfer) =>  {
  const exists = fs.existsSync('./_locales');
  if(exists) {
    langList.forEach((item, i) => {
      const i18nExists = fs.existsSync(`./_locales/${i18nLanguageTransfer(item)}`);
      !i18nExists && fs.mkdirSync(`./_locales/${i18nLanguageTransfer(item)}`);
    });
  } else {
    rimraf.sync('./_locales');
    fs.mkdirSync('_locales');
    langList.forEach((item, i) => {
      fs.mkdirSync(`./_locales/${i18nLanguageTransfer(item)}`);
    });
  }
};

exports.getCSVLangList = (path) => () => new Promise((resolve, reject) => {
  csv().fromFile(path).on('end_parsed', (jsonObj) => resolve(jsonObj));
});

exports.defaultI18nLanguageTransfer = R.cond([
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

exports.defaultI18nKeyToCSV = R.cond([
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

exports.makeJSONfile = (dirLangList, i18nLanguageTransfer, env, outputFileName) => async (mappingLangList) => {
  mappingLangList.forEach((item, i) => {
    const outFilePath = (env == 'ChromeExtension') ? `./_locales/${i18nLanguageTransfer(dirLangList[i])}/messages.json` : `./_locales/${i18nLanguageTransfer(dirLangList[i])}/${outputFileName}`;
    fs.writeFileSync(outFilePath, JSON.stringify(item), {encoding: 'utf8'})
  });
};

exports.makeLangJSON = (envPreloadFN) => (val) => (langString) => R.pipe(
  R.converge(R.zipObj, 
    [
      R.pluck('key'),
      R.pipe(
        R.pluck(val),
        R.map(envPreloadFN)
      )
    ]
  ),
)(langString);

exports.migrateJSON =  (env, inputDir, inputFileName, makeLangJSONWithEnv) => (langString, val, langPrefix) => 
   R.useWith(R.merge, [
    getRawLangString(inputDir, inputFileName), // previousJSON
    makeLangJSONWithEnv(val), // newLangJSON
  ])
  (langPrefix, langString)

/**
 * migrateJSONWithConfig :: [Object] dirLangList, String val  => (dirLangList, val, i18nLanguageTransfer) -> Object
 * generateLangList :: ([String], String -> String, migrateJSONWithConfig) -> [Object] -> Promise [Object]
 */
exports.generateLangList = (dirLangList, i18nLanguageTransfer, migrateJSONWithConfig) => async (csvLangList) => dirLangList.reduce((acc, val) => [...acc, migrateJSONWithConfig(csvLangList, val, i18nLanguageTransfer(val))], []);

exports.getDirLangList = (path) => new Promise((resolve, reject) => {
  csv().fromFile(path).on('end_parsed', (jsonObj) => resolve(R.without(['key'], R.keys(jsonObj[0]))));
});

