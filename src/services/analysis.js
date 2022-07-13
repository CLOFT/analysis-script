// load env
import { constants } from '../config/index.js';

// import services
import braceletsData from './bracelets-data.js';
import bracelets from './bracelets.js';
import users from './users.js';
import { default as alarmsService } from './alarms.js';
import {
  generatePdf,
  deleteReport,
  replaceTemplatePlaceholders,
} from './pdf-generator.js';
import s3 from './s3.js';
import { getHoroscopeBySign, lowerKeysObject } from '../bin/index.js';
import sentiment from './sentiment.js';

// node-core modules
import path from 'path';
import { fileURLToPath } from 'url';

// import zodiac sign npm
import zodiacModule from 'zodiac-signs';
const zodiac = zodiacModule();

// constants
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const tmpPath = '/tmp';

const calculateAvgSteps = async (steps, length) => {
  let sum = steps.reduce((pv, v) => pv + v, 0);
  return Math.round(sum / length);
};

const getSerendipity = (sentimentResponse) => {
  console.log('Retrieving serendipity ...');
  // Lowercase all sentiment types es. Positive -> positive
  // for fast elaboration
  sentimentResponse.sentimentScore = lowerKeysObject(
    sentimentResponse.sentimentScore
  );
  sentimentResponse.sentiment = sentimentResponse.sentiment.toLowerCase();
  let serendipity =
    sentimentResponse.sentimentScore[sentimentResponse.sentiment];

  return serendipity ?? null;
};

const countIngestedData = async (data) => parseInt(data.length);

const getUserZodiacSign = (user) => {
  let birthMonth = user.birth.split('-')[1];
  let birthDay = user.birth.split('-')[2];
  let sign = zodiac.getSignByDate({ day: birthDay, month: birthMonth });
  return sign;
};

export const analyseData = async () => {
  console.log('Retrieving last day data ...');
  const lastDayData = await braceletsData.getLastDayData();

  const dataIngested = await countIngestedData(lastDayData);

  const stepsValues = lastDayData.map((d) => d.steps);

  const avgSteps = await calculateAvgSteps(stepsValues, dataIngested);

  const alarms = await alarmsService.countAlarms();

  const commonUsers = await users.countCommonUsers();
  const admins = await users.countAdminUsers();

  // Generate PDF
  const data = {
    dataIngested,
    avgSteps,
    alarms,
    commonUsers,
    admins,
    date: new Date().toUTCString().split['T'](0),
  };

  // const fileDate = await generatePdf(data);
  const html = await generatePdf(data);
  // save report into S3 Bucket under reports/
  await s3.uploadToS3(html);

  // await deleteReport(fileDate);

  // TODO : calculate serendipity by user horoscope
  const associatedBracelets = await bracelets.getAssociatedBracelets();

  for (const b of associatedBracelets) {
    let user = await users.getUser(b.username);
    // retrieve zodiac sign by birth date
    let sign = getUserZodiacSign(user);

    // Call horoscope API
    let sentence = await getHoroscopeBySign(sign);

    // Retrieve sentiment value with AWS Commprehend
    let sentimentResponse = await sentiment.getSentiment(sentence);

    // Get and update serendipity of bracelet
    b.serendipity = getSerendipity(sentimentResponse);
    await bracelets.updateBraceletSerendipity(b);
  }
};
