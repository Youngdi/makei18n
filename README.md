# makei18n [![npm](https://img.shields.io/npm/v/makei18n.svg)](https://npmjs.com/package/react-native-vector-icons) 
 
![N|Solid](https://i.imgur.com/QPlwHgC.png?1)

To make your `chrome extension i18n` so easy. Just input your csv file then it will automatic generate `_locales` for you. 
There is 23 countries language prefix in default and feel free to customize your own. 

## Installation
Run: `$ npm install makei18n --save`
## csv file format
`Note`: csv file must follows this pattern "key","EN","CHT","CHS","Czech","German","French","Others..." 

[just go check example.csv here](https://github.com/Youngdi/makei18n/blob/master/example.csv)

|         key         | EN | CHT | CHS | Others.. |
|---|---|---|---|---|
| msg_btn_close_divLogine  | close| 關閉|关闭|Others...|
| msg_btn_back | back | 回上一頁| 回上一页 | Others...|

### Example usage: 

```
const { makei18n } = require('makei18n');
makei18n({
  inputCSV:`${__dirname}/example.csv`, // your csv file path
  langList: defaultLangList,  // optional
  getLangPrefix: defaultGetLangPrefix, // optional
});
```
## Default params
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
### Parameters - [JSdoc api](http://htmlpreview.github.io/?https://github.com/Youngdi/makei18n/blob/master/docs/module-makei18n.html)

| Name | Type | Attributes | Description |
|---|---|---|---|
| `inputCSV`  | string | required |the path of your csv file|
| `langList` | array | optional| you can provide your own i18n list |
| `getLangPrefix` | function | optional| you can customize your own logic function to prefix your language list |

## License

This project is licenced under the [MIT License](http://opensource.org/licenses/mit-license.html).
Any bundled fonts are copyright to their respective authors and mostly under MIT or [SIL OFL](http://scripts.sil.org/OFL).
