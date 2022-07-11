// load env
import { constants } from '../config/index.js';

// node-core modules
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


// constants
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const tmpPath = '/tmp';

const getHtml = async (filePath) => {
  let data;

  try {
    data = fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    console.error(err);
  }
  return data;
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

const checkIfPathExists = (dir) => fs.existsSync(dir);

const _generatePdf = async (outputHtml) => {
  const date = new Date().toISOString().split('T')[0];

  // const file = {
  //   content: outputHtml,
  // };

  // // const options = {
  // //   format: 'A4',
  // //   path: path.join(tmpPath, constants.OUTPUT_FILE + date + '.pdf'),
  // // };

  // console.log('Generating pdf ...');
  // const buffer = await htmlPdf.generatePdf(file, options);
  // console.log('Buffer created', buffer);
  // return date;
};

const deleteReport = async (fileDate) => {
  const filePath = path.join(
    tmpPath,
    constants.OUTPUT_FILE + fileDate + '.html'
  );
  // first check if generated
  let checkExists = false;
  while (!checkExists) checkExists = checkIfPathExists(filePath);
  fs.unlinkSync(filePath);
};

const generatePdf = async (data) => {
  const templateContent = await getHtml(
    path.join(__dirname, '..', 'static', 'template.html')
  );
  const html = await replaceTemplatePlaceholders(templateContent, data);
  return html;
  // console.log('Generating pdf ...');
  // const fileDate = _generatePdf(html);
  // return fileDate;
};

export { generatePdf, deleteReport, replaceTemplatePlaceholders };
