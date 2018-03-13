const { makei18n } = require('./convertCSVtoJSON');
// const defaultLangList = ['EN', 'CHT', 'CHS', 'Czech', 'German', 'French', 'Spanish (Spain)', 'Italian',
//                 'Japanese', 'Korean', 'Polish', 'Russian', 'Turkish', 'Thai', 'Portuguese',
//                 'Hungarian', 'Romanian', 'Danish', 'Dutch', 'Finnish', 'Greek', 'Norwegian', 'Swedish'];
// const defaultGetLangPrefix = R.cond([
//   [R.equals('CHS'), R.always('zh_CN')],
//   [R.equals('CHT'), R.always('zh_TW')],
//   [R.equals('EN'), R.always('en')],
//   [R.equals('Korean'), R.always('ko')],
//   [R.equals('Japanese'), R.always('ja')],
//   [R.equals('Italian'), R.always('it')],
//   [R.equals('Danish'), R.always('da')],
//   [R.equals('Hungarian'), R.always('hu')],
//   [R.equals('Swedish'), R.always('sv')],
//   [R.equals('Russian'), R.always('ru')],
//   [R.equals('Czech'), R.always('cs')],
//   [R.equals('Dutch'), R.always('nl')],
//   [R.equals('Finnish'), R.always('fi')],
//   [R.equals('French'), R.always('fr')],
//   [R.equals('German'), R.always('de')],
//   [R.equals('Greek'), R.always('el')],
//   [R.equals('Norwegian'), R.always('no')],
//   [R.equals('Polish'), R.always('pl')],
//   [R.equals('Spanish (Spain)'), R.always('es')],
//   [R.equals('Turkish'), R.always('tr')],
//   [R.equals('Thai'), R.always('th')],
//   [R.equals('Romanian'), R.always('ro')],
//   [R.equals('Portuguese'), R.always('pt')],
//   [R.T, R.identity]
// ]);

makei18n({
  inputCSV:`${__dirname}/clipperMultiLanguage.csv`,
});
