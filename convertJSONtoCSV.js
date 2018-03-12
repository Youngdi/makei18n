const Json2csvParser = require('json2csv').Parser;
const R = require('ramda');
const fs = require('fs');
const fields = ['key', 'EN', 'CHT', 'CHS', 'Czech', 'German', 'French', 'Spanish (Spain)', 'Italian',
                'Japanese', 'Korean', 'Polish', 'Russian', 'Turkish', 'Thai', 'Portuguese',
                'Hungarian', 'Romanian', 'Danish', 'Dutch', 'Finnish', 'Greek', 'Norwegian', 'Swedish'];
const printKeyConcatValue = (langPrefix) => R.useWith(R.merge, [R.pipe(R.prop('message'), R.objOf(langPrefix)), R.objOf('key')]);
const getLangString = R.curryN(2, R.pipe(
  R.useWith(R.mapObjIndexed, [printKeyConcatValue, R.identity]),
  R.values,
));
const getLnagPrefix = R.cond([
  [R.equals('en'), R.always('EN')],
  [R.equals('zh_CN'), R.always('CHS')],
  [R.equals('zh_TW'), R.always('CHT')]
]);
const getRawLangString = (lang) => JSON.parse(fs.readFileSync(`./_locales/${lang}/messages.json`, 'utf8'));
const json2csvParser = new Json2csvParser({ fields });
const normalizationLang = fs.readdirSync('_locales').reduce((acc, val, i) => {
    const langPrefix = getLnagPrefix(val);
    const langString = getLangString(langPrefix, getRawLangString(val));
    return i == 0 ? langString: R.zipWith(R.merge, langString, acc);
}, []);
fs.writeFileSync('./clipperMultiLanguage.csv', json2csvParser.parse(normalizationLang), {encoding: 'utf8'});


