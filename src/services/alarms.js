// load env
import { constants } from '../config/index.js';

import axios from 'axios';

export const countAlarms = async () => {
  let count;
  try {
    let result = await axios.get(constants.API_GATEWAY + 'Alarms/LastDayCount');
    count = result.data;
  } catch (error) {
    console.log(error);
  } finally {
    return count ?? 0;
  }
};

export default {
  countAlarms,
};
