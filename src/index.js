import { analyseData } from './services/index.js';
// Lambda handler
export const handler = async (event) => {
  // TODO : implement handler
  return await analyseData();
};
