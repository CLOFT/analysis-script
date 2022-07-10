// load env
import { constants } from '../config/index.js';

// import services
import braceletsData from './bracelets-data.js';
import users from './users.js';
import { default as alarmsService } from './alarms.js';
import { generatePdf, deleteReport } from './pdf-generator.js';
import s3 from './s3.js';

// constants
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const tmpPath = path.join(__dirname, '../', 'tmp');

const calculateAvgSteps = async (steps, length) => {
  let sum = steps.reduce((pv, v) => pv + v, 0);
  return Math.round(sum / length);
};

const countIngestedData = async (data) => parseInt(data.length);

export const analyseData = async () => {
  console.log('Retrieving last day data ...');
  const lastDayData = await braceletsData.getLastDayData();

  const dataIngested = await countIngestedData(lastDayData);

  const stepsValues = lastDayData.map((d) => d.steps);

  const avgSteps = await calculateAvgSteps(stepsValues, ingestedData);

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
  };

  const fileDate = await generatePdf(data);

  // save report into S3 Bucket under reports/
  await s3.uploadToS3(path.join(tmpPath, constants.OUTPUT_FILE + fileDate));

  await deleteReport(fileDate);
};
