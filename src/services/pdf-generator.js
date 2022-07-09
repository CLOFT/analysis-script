// load env
import { constants } from '../config/index.js';

// node-core modules
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// npm to generate pdf from html
import pdf from 'html-pdf';

// constants
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const tmpPath = path.join(__dirname, '../', 'tmp');

const getHtml = async () => {
  let data;

  try {
    data = fs.readFileSync(
      path.join(__dirname, '..', 'static', 'template.html'),
      'utf8'
    );
  } catch (err) {
    console.error(err);
  }
  return data;
};

const saveTmpFile = async (htmlContent) => {
  if (!checkIfDirAlreadyExists(tmpPath)) fs.mkdirSync(tmpPath);
  fs.writeFileSync(path.join(tmpPath, 'index.html'), htmlContent, {
    encoding: 'utf-8',
  });
};

const removeTmpFile = async (filePath) => {
  fs.unlinkSync(filePath);
};

const checkIfDirAlreadyExists = (dir) => fs.existsSync(dir);

const generatePdf = async (data) => {
  const templateContent = await getHtml();
  const html = await replaceTemplatePlaceholders(templateContent, data);
  await saveTmpFile(html);
  await removeTmpFile(path.join(tmpPath, 'index.html'));
};

const replaceTemplatePlaceholders = async (template, data) => {
  console.log('Replacing template placeholders ...');
  return template
    .replace('{{alarms}}', data.alarms)
    .replace('{{avgSteps}}', data.avgSteps)
    .replace('{{dataIngested}}', data.dataIngested)
    .replace('{{admins}}', data.admins)
    .replace('{{commonUsers}}', data.commonUsers)
    .replace('{{date}}', data.date);
};


export default {
  generatePdf,
};
