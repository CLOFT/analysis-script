import { analyseData } from './services/index.js';
// Lambda handler
export const handler = async (event) => {
  console.log('Analyzing data ... ')
  return await analyseData();
};
