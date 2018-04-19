# makei18n [![npm](https://img.shields.io/npm/v/makei18n.svg)](https://www.npmjs.com/package/makei18n)
 
![N|Solid](https://i.imgur.com/QPlwHgC.png?1) Make i18n JSON file so easy. [Demo Online](http://htmlpreview.github.io/?https://github.com/Youngdi/makei18n/blob/master/dist/static.html)

Hi folks! Are you ever tired of copying i18n keys one by one into your JSON file? It’s kind of a buzz killer, isn’t it!?! Check out “makei18n” to help you out!

Simply input a standard CSV format file to generate a complete _locales folder with i18n JSON files. This module is really compatible for RD, PM or even translation companies. It supports all different kinds of i18n modules including the Chrome extension format, which has `{message:""}` in key value. All you need to do is just tell `makei18n` your CSV file path. Then it will automatically generate `_locales` and `translation.csv` for you. FYI, It only transfers 23 countries' language into i18 format with default set up and feels free to customize your own translation list.

If you like it, just give me a ⭐️! Also feel free to give me a PR or help to contribute your i18n language and cli version.

## Features
*  Automatic migration: it will write over value if i18n key is existed or add a new key.
*  Effectively cooperation: it provides the standard format to make a csv and easy to use for both of PM and RD.
*  Manageable tool: It helps you generate the i18n JSON file and the CSV sheet for translation company.

# Quick Start
* [As Library](#library)
    * [CSV file format](#csv-file-format)
    * [_locales folder structure](#_locales-folder-structure)
    * [makei18n](#makei18n)
        * [Usage](#makei18n-example-usage) 
        * [Parameters](#makei18n-parameters)
    * [makei18nCSV](#makei18ncsv) 
        * [Usage](#makei18ncsv-example-usage)
        * [Parameters](#makei18ncsv-parameters)
* [As Command Line Tool](#command-line-usage)
    * [Customize option](#customize-option)

## Library

###  Installation
1.  First you need have installed `node.js`. If not go [here](https://nodejs.org/en/) download it.
2.  `git clone https://github.com/Youngdi/makei18n`
3.  `cd example`
4.  `npm install makei18n --save`
5.  `npm run start`
6.  Check example folder it should have the `_locales` document with i18n JSON and a translation.csv in it.

## Command Line Usage

###  Installation
1.  First you need have installed `node.js`. If not go [here](https://nodejs.org/en/) download it.
2.  `git clone https://github.com/Youngdi/makei18n`
3.  `cd example`
4.  `npm install makei18n -g`
5.  `makei18n --type csv --file example.csv`
6.  `makei18n --type json --dir _locales`
7.  Check example folder it should have the `_locales` document with i18n JSON and a translation.csv in it.

### Customize option
* Usage 1: input your csv file: 
    *   `makei18n -t csv -f example.csv`
* Usage 2: input your locales folder: 
    *   `makei18n -t json -d locales`
* Usage 3: fully customize input file name,output file name,env and folder name:
    *   `makei18n -t csv -f ./example.csv -d ./_locales -i messages.json -o messages.json -e ChromeExtension`
* Usage 4: fully customize input locales folder name,input file name,output csv file name:
    *   `makei18n -t json -d ./locales -i messages.json -o translation.csv`
* Note:
    *   If you use ChromeExtension env it only generates messages.json, which is a standard name for chrome extension
    *   If you customize your own i18n adapter just go look at README.md on github


## CSV file format
`Note`: CSV file must follows this pattern "key","EN","CHT","CHS","Czech","German","French","Others..." 

[Check example.csv here](https://github.com/Youngdi/makei18n/blob/master/example.csv)

|         key         | EN | CHT | CHS | Others.. |
|---|---|---|---|---|
| msg_btn_close_divLogine  | close| 關閉|关闭|Others...|
| msg_btn_back | back | 回上一頁| 回上一页 | Others...|

## makei18n
### makei18n Example Usage:

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
### makei18n Parameters
#### [JSdoc API](http://htmlpreview.github.io/?https://github.com/Youngdi/makei18n/blob/master/docs/module-makei18n.html)
| Property | Type | Attributes | Default | Description |
|---|---|---|---|---|
| `inputCSV`  | string | required |   | the path of your CSV file |
| `inputDir` | string | optional| `'./_locales'`  | the path of your i18n folder |
| `inputFileName` | string | optional| `'messages.json'`  | the name of your i18n JSON file |
| `outputFileName` | string | optional| `'messages.json'`  | the name of the output file |
| `env` | string | optional| `''`  | the default is without object with message key or you can pass `ChromeExtension` for the object with the message key |
| `i18nLanguageTransfer` | function | optional| String -> String |you can customize your own logic function to transfer your language list |

### Default params
```
const i18nLanguageTransfer = R.cond([
  [R.equals('China'), R.always('zh-cn')],
  [R.equals('Taiwan'), R.always('zh-tw')],
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
  [R.equals('Czech(cz)'), R.always('cz')],
  [R.equals('Czech(cs)'), R.always('cs')],
  [R.equals('Dutch'), R.always('nl')],
  [R.equals('Finnish'), R.always('fi')],
  [R.equals('French'), R.always('fr')],
  [R.equals('German'), R.always('de')],
  [R.equals('Greek(el)'), R.always('el')],
  [R.equals('Greek(gr)'), R.always('gr')],
  [R.equals('Norwegian'), R.always('no')],
  [R.equals('Polish'), R.always('pl')],
  [R.equals('Spanish (Spain)'), R.always('es')],
  [R.equals('Turkish'), R.always('tr')],
  [R.equals('Thai'), R.always('th')],
  [R.equals('Romanian'), R.always('ro')],
  [R.equals('Portuguese(Brazil)'), R.always('pt-br')],
  [R.equals('Portuguese'), R.always('pt')],
  [R.T, R.identity]
]);
```


---
## makei18nCSV
`makei18nCSV` helps your to make a standard format of your i18n csv file
`Note: ` _locales folder structure must follows the pattern
### _locales folder structure
#### [Check `_locales` structure here](https://github.com/Youngdi/makei18n/tree/master/_locales)
```sh
_locales
  cs -> messages.json 
  de -> messages.json
  en -> messages.json
  fr -> messages.json
  ja -> messages.json
  zh_TW -> messages.json
  zh_CN -> messages.json
  ...others i18n -> messages.json
```
### makei18nCSV Example Usage:
```
const { makei18nCSV } = require('makei18n');
makei18nCSV({
  inputDir: './_locales',
  // inputFileName: 'messages.json',
  // outputFileName: 'translation.csv',
  // i18nKeyToCSV = defaultI18nKeyToCSV, // optional 
  // i18nLanguageTransfer = defaultI18nLanguageTransfer, // optional 
 });
```

### makei18nCSV Parameters
#### [JSdoc API](http://htmlpreview.github.io/?https://github.com/Youngdi/makei18n/blob/master/docs/module-makei18nCSV.html)

| Property | Type | Attributes | Default | Description |
|---|---|---|---|---|
| `inputDir`  | string | required |   | the path of your i18n folder |
| `inputFileName` | string | optional| `'messages.json'` | the name of your i18n json file |
| `outputFileName` | string | optional| `'translation.csv'`  | the name of your output csv file |
| `i18nKeyToCSV` | function | optional| String -> String  | you can customize your own logic function to transfer your i18n key. Note: it must be a symmetry with i18nLanguageTransfer |
| `i18nLanguageTransfer` | function | optional| String -> String |you can customize your own logic function to transfer your language list.  Note: it must be a symmetry with i18nKeyToCSV |


### Default params
```
const defaultI18nKeyToCSV = R.cond([
  [R.equals('zh-cn'), R.always('China')],
  [R.equals('zh-tw'), R.always('Taiwan')],
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
  [R.equals('cz'), R.always('Czech(cz)')],
  [R.equals('cs'), R.always('Czech(cs)')],
  [R.equals('nl'), R.always('Dutch')],
  [R.equals('fi'), R.always('Finnish')],
  [R.equals('fr'), R.always('French')],
  [R.equals('de'), R.always('German')],
  [R.equals('gr'), R.always('Greek(gr)')],
  [R.equals('el'), R.always('Greek(el)')],
  [R.equals('no'), R.always('Norwegian')],
  [R.equals('pl'), R.always('Polish')],
  [R.equals('es'), R.always('Spanish (Spain)')],
  [R.equals('tr'), R.always('Turkish')],
  [R.equals('th'), R.always('Thai')],
  [R.equals('ro'), R.always('Romanian')],
  [R.equals('pt'), R.always('Portuguese')],
  [R.equals('pt-br'), R.always('Portuguese(Brazil)')],
  [R.T, R.identity]
]);
```
```
const defaultI18nLanguageTransfer = R.cond([
  [R.equals('China'), R.always('zh-cn')],
  [R.equals('Taiwan'), R.always('zh-tw')],
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
  [R.equals('Czech(cz)'), R.always('cz')],
  [R.equals('Czech(cs)'), R.always('cs')],
  [R.equals('Dutch'), R.always('nl')],
  [R.equals('Finnish'), R.always('fi')],
  [R.equals('French'), R.always('fr')],
  [R.equals('German'), R.always('de')],
  [R.equals('Greek(el)'), R.always('el')],
  [R.equals('Greek(gr)'), R.always('gr')],
  [R.equals('Norwegian'), R.always('no')],
  [R.equals('Polish'), R.always('pl')],
  [R.equals('Spanish (Spain)'), R.always('es')],
  [R.equals('Turkish'), R.always('tr')],
  [R.equals('Thai'), R.always('th')],
  [R.equals('Romanian'), R.always('ro')],
  [R.equals('Portuguese(Brazil)'), R.always('pt-br')],
  [R.equals('Portuguese'), R.always('pt')],
  [R.T, R.identity]
]);
```
## What Next?
* Support more i18n locale adapter

## License

This project is licensed under the [MIT License](http://opensource.org/licenses/mit-license.html).