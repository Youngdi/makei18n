import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { webMakei18n } from '../main.js';
const zip = new JSZip();

function makei18n(file) {
  webMakei18n({
    inputCSV: file,
  });
  // zip.folder("_locales").file("_locales.csv", file);
  // zip.generateAsync({type:"blob"})
  // .then(function(content) {
  //     saveAs(content, "makei18n.zip");
  // });
}
// function makei18nCSV() {
//   zip.file("Hello.txt", "Hello World\n");
//   zip.generateAsync({type:"blob"})
//   .then(function(content) {
//       saveAs(content, "example.zip");
//   });
// }
window.makei18n = makei18n;
window.makei18nCSV = makei18nCSV;