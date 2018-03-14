/** @module makei18n */
const R = require('ramda');
const { 
  generateDir,
  getCSVLangList,
  defaultI18nLanguageTransfer,
  makeJSONfile,
  generateLangList,
  defaultLangList,
  migratedJSON,
  makeLangJSON,
  getDirLangList
} = require('./lib/utility');

/**
 * @description 
 *  To make your chrome extension i18n so easy. There is 23 countries language prefix in default and feel free to customize your own. <br>
 *  <p><b style="color:red">Note: </b><b>csv file must follows this pattern "key","EN","CHT","CHS","Czech","German","French","Others..."</b></p>
 *  <b><a href="https://github.com/Youngdi/makei18n/blob/master/example.csv">Check example.csv here</a></b>
 * ## csv file format
<style>
td {
  font-family: Consolas, Monaco, 'Andale Mono', monospace;
  box-sizing: border-box;
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
th {
  font-family: Consolas, Monaco, 'Andale Mono', monospace;
  margin: 0px;
  text-align: left;
  border: 1px solid #dddddd;
  vertical-align: top;
  padding: 10px;
  display: table-cell;
  font-weight: 700;
}
code {
  font-family: Consolas, Monaco, 'Andale Mono', monospace;
  background: #f4f4f4;
}
</style>
<table style="border-spacing: 0; border: 1px solid #ddd; border-collapse: collapse; border-radius: 3px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); width: 100%; font-size: 14px; margin: 1em 0; color: #4d4e53; font-family: 'Helvetica Neue', Helvetica, sans-serif; line-height: 160%;">
  <tr>
    <th>key</th>
    <th>EN</th>
    <th>CHT</th>
    <th>CHS</th>
    <th>Others</th>
  </tr>
  <tr>
    <td><code>msg_btn_close_divLogine</code></td>
    <td>Close</td>
    <td>關閉</td>
    <td>关闭</td>
    <td>Others</td>
  </tr>
  <tr>
    <td><code>msg_btn_back</code></td>
    <td>Back</td>
    <td>回上一頁</td>
    <td>回上一页</td>
    <td>Others</td>
  </tr>
</table>
* ## Default params
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
const { makei18n } = require('makei18n');
makei18n({
  inputCSV:`${__dirname}/example.csv`,                  // your csv file path
  // inputDir: './_locales',                            // optional 
  // inputFileName = 'messages.json',                   // optional 
  // outputFileName = 'messages.json',                  // optional 
  // env: '',                                           // optional, it can be ChromeExtension
  // i18nLanguageTransfer: defaultI18nLanguageTransfer, // optional
});

 * @param {string} inputCSV - the path of your csv file
 * @param {string} [inputDir = './_locales'] - the path of your i18n folder
 * @param {string} [inputFileName = 'messages.json'] - the name of your i18n json file
 * @param {string} [outputFileName = 'messages.json'] - the name of the output file
 * @param {string} [env = ''] - default is without object with message key or you can pass `ChromeExtension` for object with message key
 * @param {function} [i18nLanguageTransfer = String -> String] you can customize your own logic function to prefix your language list
 */
exports.makei18n = async ({
    inputCSV,
    inputDir = './_locales',
    inputFileName = 'messages.json',
    outputFileName = 'messages.json',
    env = '',
    i18nLanguageTransfer = defaultI18nLanguageTransfer,
  }) =>
  {
    const makeLangJSONWithEnv = makeLangJSON(env == 'ChromeExtension' ? R.objOf('message') : R.identity);
    const migratedJSONWithConfig = migratedJSON(env, inputDir, inputFileName, makeLangJSONWithEnv);
    const dirLangList = await getDirLangList(inputCSV);

    return R.pipeP(
      generateDir,
      getCSVLangList(inputCSV),
      generateLangList(dirLangList, i18nLanguageTransfer, migratedJSONWithConfig),
      makeJSONfile(dirLangList, i18nLanguageTransfer, env, outputFileName),
    )(dirLangList, i18nLanguageTransfer)
  }
  