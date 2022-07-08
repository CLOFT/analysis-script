// load env
import { constants } from '../config/index.js';

// node-core modules
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const htmlToPdf = async () => {
  // TODO : replace placeholders with value
};

const getHtml = async () => {
  fs.readFile(
    path.join(__dirname, '..', 'static', 'index.html'),
    { encoding: 'utf8' },
    (err, data) => {
      var template = data;
      console.log('Replacing template placeholders ...');
      // TODO : replace all values
    }
  );
};

export default {
  htmlToPdf,
};
