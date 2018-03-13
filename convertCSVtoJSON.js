/** @module makei18n */
const R = require('ramda');
const { generateDir, getLangString, defaultGetLangPrefix, generateFile, generateLangList, defaultLangList} = require('./lib/utility');

/**
 * @description 
 *  To make your chrome extension i18n so easy. There is 23 countries language prefix in default and feel free to customize your own. <br>
 *  <b style="color:red">Note: </b><b>csv file must follows this pattern "key","EN","CHT","CHS","Czech","German","French","Others..."</b>
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
const defaultGetLangPrefix = R.cond([
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
```
const defaultLangList = [
'EN', 'CHT', 'CHS', 'Czech', 'German', 'French', 'Spanish (Spain)', 'Italian',
'Japanese', 'Korean', 'Polish', 'Russian', 'Turkish', 'Thai', 'Portuguese',
'Hungarian', 'Romanian', 'Danish', 'Dutch', 'Finnish', 'Greek', 'Norwegian', 'Swedish'
];
```
* @example <caption>Example usage: </caption>
makei18n({
  inputCSV:`${__dirname}/clipperMultiLanguage.csv`, // your csv file path
  langList: defaultLangList,  // optional
  getLangPrefix: defaultGetLangPrefix, // optional
});
 * @param {string} inputCSV - the path of your csv file
 * @param {array} [langList] you can provide your own i18n list
 * @param {function} [getLangPrefix] you can customize your own logic to prefix your language list
 */
exports.makei18n = ({inputCSV, langList = defaultLangList, getLangPrefix = defaultGetLangPrefix}) =>
  R.pipeP(
    generateDir,
    getLangString,
    generateLangList(langList),
    generateFile(langList, getLangPrefix),
  )(langList, getLangPrefix, inputCSV)