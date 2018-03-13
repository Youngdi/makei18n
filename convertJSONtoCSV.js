const Json2csvParser = require('json2csv').Parser;
const R = require('ramda');
const fs = require('fs');
const { defaultConvertLangPrefix } = require('./lib/utility');
const fields = ['key', 'EN', 'CHT', 'CHS', 'Czech', 'German', 'French', 'Spanish (Spain)', 'Italian',
                'Japanese', 'Korean', 'Polish', 'Russian', 'Turkish', 'Thai', 'Portuguese',
                'Hungarian', 'Romanian', 'Danish', 'Dutch', 'Finnish', 'Greek', 'Norwegian', 'Swedish'];
const printKeyConcatValue = (langPrefix) => R.useWith(R.merge, [R.pipe(checkChromeExtension, R.objOf(langPrefix)), R.objOf('key')]);
const getLangString = R.curryN(2, R.pipe(
  R.useWith(R.mapObjIndexed, [printKeyConcatValue, R.identity]),
  R.values,
));
const checkChromeExtension = R.cond([
  [R.prop('message'), R.prop('message')],
  [R.T, R.identity],
]);

const getRawLangString = (inputDir, inputFileName, lang) => JSON.parse(fs.readFileSync(`${inputDir}/${lang}/${inputFileName}`, 'utf8'));
const json2csvParser = new Json2csvParser({ fields });
const normalizationLang = (inputDir, inputFileName, dirList) => dirList.reduce((acc, val, i) => {
    const langPrefix = defaultConvertLangPrefix(val);
    const langString = getLangString(langPrefix, getRawLangString(inputDir, inputFileName, val));
    return i == 0 ? langString: R.zipWith(R.merge, langString, acc);
}, []);
const getDirList = (inputDir) => fs.readdirSync(inputDir);

exports.makei18nCSV = ({inputDir, inputFileName, outputFile}) => {
  const dirList = getDirList(inputDir);
  const data = json2csvParser.parse(normalizationLang(inputDir, inputFileName, dirList));
  fs.writeFileSync(`./${outputFile}`, data, {encoding: 'utf8'});
}

