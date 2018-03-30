import { webMakei18n } from '../main.js';
import Dropzone from "dropzone";

async function makei18n(file, env = '') {
  webMakei18n({
    inputCSV:file,
    env,
  });
}
window.makei18n = makei18n;
window.Dropzone = Dropzone;
// window.makei18nCSV = makei18nCSV;