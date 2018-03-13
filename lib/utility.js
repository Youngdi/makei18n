const Json2csvParser = require('json2csv').Parser;
const R = require('ramda');
const fs = require('fs');
const exec = require('child_process').exec;
const rimraf = require('rimraf');
const csv = require('csvtojson');

exports.generateDir = (langList, getLangPrefix, inputCSV) => new Promise((resolve, reject) => {
  rimraf.sync('./_locales');
  fs.mkdirSync('_locales');
  langList.map( (item, i) => {
    fs.mkdirSync(`./_locales/${getLangPrefix(item)}`);
  });
  resolve(inputCSV);
});
exports.getLangString = (path) => new Promise((resolve, reject) => {
  csv().fromFile(path).on('end_parsed',(jsonObj) => resolve(jsonObj));
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
exports.generateFile = R.curryN(3, (langList, getLangPrefix, mappingLangList) => new Promise((resolve, reject) => {
  mappingLangList.map((item, i) => fs.appendFileSync(`./_locales/${getLangPrefix(langList[i])}/messages.json`, JSON.stringify(mappingLangList[i]), {encoding: 'utf8'}));
  resolve();
}));
exports.generateLangList = R.curryN(2, (langList, langString) => new Promise((resolve, reject) => resolve(langList.reduce((acc, val) => {
  const makeLangJson = R.pipe(
    R.converge(R.zipObj, 
      [
        R.pluck('key'),
        R.pipe(
          R.pluck(val),
          R.map(R.objOf('message'))
        )
      ]
    ),
  );
  const langJson = makeLangJson(langString);
  return [...acc, langJson];
}, []))));
exports.defaultLangList = [
  'EN', 'CHT', 'CHS', 'Czech', 'German', 'French', 'Spanish (Spain)', 'Italian',
  'Japanese', 'Korean', 'Polish', 'Russian', 'Turkish', 'Thai', 'Portuguese',
  'Hungarian', 'Romanian', 'Danish', 'Dutch', 'Finnish', 'Greek', 'Norwegian', 'Swedish'
]; //23 countries

// exports.makei18n = async ({inputCSV, langList = defaultLangList, getLangPrefix = defaultGetLangPrefix}) => {
//   await generateDir(langList, getLangPrefix, inputCSV);
//   const langString = await getLangString(inputCSV);
//   const mappingLangList = await generateLangList(langList, langString);
//   await generateFile(langList, getLangPrefix, mappingLangList);
// }
