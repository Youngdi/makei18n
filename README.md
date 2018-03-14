# makei18n [![npm](https://img.shields.io/npm/v/makei18n.svg)](https://www.npmjs.com/package/makei18n) 
 
![N|Solid](https://i.imgur.com/QPlwHgC.png?1)

Have you ever struggled with dealing with dumb copy and paste to your i18n JSON file?
`makei18n` will helps you to make your `I18n JSON file` so easy.
All you need to do is just tell `makei18n` your CSV file path then it will automatically generate `_locales` for you.
It does not only provide your simple format but also support chrome extension format. Check it out.
FYI, It transfers 23 countries' language into i18 format with default mode and feels free to customize your own.

## Installation
1.  First you need have installed `node.js`. If not go [here](https://nodejs.org/en/) download it.
2.  `git clone https://github.com/Youngdi/makei18n`
3.  `cd example`
4.  `npm install makei18n --save`
5.  `node index.js`
6.  Check your folder it should have the `_locales` document with i18n JSON
## CSV file format
`Note`: CSV file must follows this pattern "key","EN","CHT","CHS","Czech","German","French","Others..." 

[Check example.csv here](https://github.com/Youngdi/makei18n/blob/master/example.csv)

|         key         | EN | CHT | CHS | Others.. |
|---|---|---|---|---|
| msg_btn_close_divLogine  | close| 關閉|关闭|Others...|
| msg_btn_back | back | 回上一頁| 回上一页 | Others...|

### Example Usage: 

```
const { makei18n } = require('makei18n');
makei18n({
  inputCSV:`${__dirname}/example.csv`,                  // your csv file path
  // inputDir: './_locales',                            // optional 
  // inputFileName = 'messages.json',                   // optional 
  // outputFileName = 'messages.json',                  // optional 
  // env: '',                                           // optional, it can be ChromeExtension
  // i18nLanguageTransfer: defaultI18nLanguageTransfer, // optional
});
```
### Parameters - [JSdoc api](http://htmlpreview.github.io/?https://github.com/Youngdi/makei18n/blob/master/docs/module-makei18n.html)

| Property | Type | Attributes | Default | Description |
|---|---|---|---|---|
| `inputCSV`  | string | required |   | the path of your CSV file |
| `inputDir` | string | optional| `'./_locales'`  | the path of your i18n folder |
| `inputFileName` | string | optional| `'messages.json'`  | the name of your i18n JSON file |
| `outputFileName` | string | optional| `'messages.json'`  | the name of the output file |
| `env` | string | optional| `''`  | the default is without object with message key or you can pass `ChromeExtension` for the object with the message key |
| `i18nLanguageTransfer` | function | optional| String -> String |you can customize your own logic function to transfer your language list |

## Default params
```
const i18nLanguageTransfer = R.cond([
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

## License

This project is licensed under the [MIT License](http://opensource.org/licenses/mit-license.html).
Any bundled fonts are copyright to their respective authors and mostly under MIT or [SIL OFL](http://scripts.sil.org/OFL).