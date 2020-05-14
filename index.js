#!/usr/bin/env node
const { makei18n, makei18nCSV } = require('./main.js');
const program = require('commander');
const { version } = require('./package.json');

program
  .version(version, '-v, --version')
  .option('-t, --type <a>', 'Required -> process with csv or json file')
  .option('-f, --file <a>', 'Required -> file path')
  .option('-d, --dir <a>', 'Optional -> The migrate path Default is ./_locales')
  .option('-i, --inputName <a>', 'Optional -> A name of input file; Default is messages.json')
  .option('-o, --outputName <a>', 'Optional -> A name of output file; Default is messages.json')
  .option('-od, --outputDir <a>', 'Optional -> The path of output file; Default is ./_locales')
  .option('-e, --env <a>', 'Optional -> Handle with chrome extension format by passing ChromeExtension; Default is "" ');

program.on('--help', function(){
  console.log( '');
  console.log('  Examples Usage:');
  console.log('');
  console.log('Usage 1: input your csv file');
  console.log('    $ makei18n -t csv -f ./example.csv');
  console.log('');
  console.log('Usage 2: input your locales folder');
  console.log('    $ makei18n -t json -f ./_locales');
  console.log('');
  console.log('Usage 3: fully customize input file name,output file name,env and folder name');
  console.log('    $ makei18n -t csv -f ./example.csv -d ./_locales -od ../dist/_locales -i messages.json -o messages.json -e ChromeExtension');
  console.log('');
  console.log('Usage 4: fully customize input locales folder name,input file name,output csv file name');
  console.log('    $ makei18n -t json -d ./_locales -i messages.json -o translation.csv');
  console.log('');
  console.log('Notes 1: If you use ChromeExtension env it only generates messages.json, which is a standard name for chrome extension');
  console.log('Notes 2: If you customize your own i18n adapter just go look at README.md on github');
});

program.parse(process.argv);

if (program.file && program.type || program.type && program.dir) {

  if(program.type == 'csv') {
    makei18n({
      inputCSV: program.file,
      inputDir: program.dir,
      inputFileName: program.inputName,
      outputFileName: program.outputName,
      outputDir: program.outputDir,
      env: program.env,
    });
  }
  if(program.type == 'json'){
    makei18nCSV({
      inputDir: program.dir,
      inputFileName: program.inputName,
      outputFileName: program.outputName,
      outputDir: program.outputDir,
    });
  }
} else {
  program.outputHelp();  // 輸出說明
  process.exit();        // 關閉程式
}
