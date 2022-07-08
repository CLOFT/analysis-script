// import bracelets data service
import braceletsData from './bracelets-data.js';

const calculateAvgSteps = async (steps, length) => {
  let sum = steps.reduce((pv, v) => pv + v, 0);
  return Math.round(sum / length);
};

const countAlarms = async (alarms) => alarms.length;

const countIngestedData = async (data) => parseInt(data.length);

export const analyseData = async () => {
  console.log('Retrieving last day data ...');
  const data = await braceletsData.getLastDayData();

  const ingestedData = await countIngestedData(data);

  const stepsValues = data.map((d) => d.steps);

  const avgSteps = await calculateAvgSteps(stepsValues, ingestedData);

  const alarmsCount = await countAlarms(data.filter((d) => d.alarm != null));

  return {
    ingestedData,
    avgSteps,
    alarmsCount,
  };
};
