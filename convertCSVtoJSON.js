const Json2csvParser = require('json2csv').Parser;
const R = require('ramda');
const fs = require('fs');
const exec = require('child_process').exec;
const getRawLangString = fs.readFileSync(`./clipperMultiLanguage.csv`, 'utf8');
const csv = require('csvtojson');
const langList = ['EN', 'CHT', 'CHS', 'Czech', 'German', 'French', 'Spanish (Spain)', 'Italian',
                'Japanese', 'Korean', 'Polish', 'Russian', 'Turkish', 'Thai', 'Portuguese',
                'Hungarian', 'Romanian', 'Danish', 'Dutch', 'Finnish', 'Greek', 'Norwegian', 'Swedish'];
const generateDir = async (langString) => {
  await exec('rm -r _locales');
  setTimeout(() => {
    R.keys(langString).map( (item, i) => {
      if(i == 0) return fs.mkdirSync('_locales');
      fs.mkdirSync(`./_locales/${item}`);
    });
  }, 10);
}
const getLangString = () => new Promise( (resolve, reject) => {
  csv().fromFile('./clipperMultiLanguage.csv').on('end_parsed',(jsonObj) => resolve(jsonObj));
});
const getLangPrefix = R.cond([
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
  [R.T, R.identity]
]);
const generateLangFile = async () => {
  const langString = await getLangString();
  await generateDir(langString[0]);
  const generate = langList.reduce((acc, val) => {
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
  }, []);
 setTimeout(() => {
  generate.map((item, i) => {
    fs.appendFileSync(`./_locales/${langList[i]}/messages.json`, JSON.stringify(generate[i]), {encoding: 'utf8'})
  });
 }, 20);
}
generateLangFile();
setTimeout(() => {

  fs.readdirSync('_locales').map((item) => {
    fs.renameSync(`./_locales/${item}`, `./_locales/${getLangPrefix(item)}`)
  });
}, 2000);